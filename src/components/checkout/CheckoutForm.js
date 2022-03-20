import {useState, useContext, useEffect} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import cx from 'classnames'

import YourOrder from "./YourOrder";
import PaymentModes from "./PaymentModes";
import {AppContext} from "../context/AppContext";
import validateAndSanitizeCheckoutForm from '../../validator/checkout';
import {getFormattedCart, createCheckoutData,} from "../../functions";
import GET_CART from "../../queries/get-cart";
import Address from "./Address";
import {
    handleBillingDifferentThanShipping, handleCreateAccount, 
    // handleStripeCheckout,
    handleECpayCheckout, setStatesForCountry
} from "../../utils/checkout";
import CheckboxField from "./form-elements/CheckboxField";
import CLEAR_CART_MUTATION from "../../mutations/clear-cart";
import { useRouter } from 'next/router';
import axios from 'axios';

// Use this for testing purposes, so you dont have to fill the checkout form over an over again.
const defaultCustomerInfo = {
	firstName: 'Jane',
	lastName: 'Sayed',
	address1: '123 Abc farm',
	address2: 'Hill Road',
	city: 'NYBAGEL',
	country: 'TW',
	state: 'CA',
	postcode: '221029',
	email: 'piece7775@gmail.com',
	phone: '9883778278',
	company: 'The Company',
	errors: null
}


const CheckoutForm = ({countriesData}) => {

    const router = useRouter()

    const {billingCountries, shippingCountries} = countriesData || {}

    const initialState = {
        billing: {
            ...defaultCustomerInfo,
        },
        shipping: {
            ...defaultCustomerInfo
        },
        createAccount: false,
        orderNotes: '',
        billingDifferentThanShipping: false,
        paymentMethod: 'cod',
    };

    const [cart, setCart] = useContext(AppContext);
    const [input, setInput] = useState(initialState);
    const [orderData, setOrderData] = useState(null);
    const [requestError, setRequestError] = useState(null);
    const [theShippingStates, setTheShippingStates] = useState([]);
    const [isFetchingShippingStates, setIsFetchingShippingStates] = useState(false);
    const [theBillingStates, setTheBillingStates] = useState([]);
    const [isFetchingBillingStates, setIsFetchingBillingStates] = useState(false);
    const [isECPayOrderProcessing, setIsECPayOrderProcessing] = useState(false);
    const [createdOrderData, setCreatedOrderData] = useState({});


    // Get Cart Data.
    const {data} = useQuery(GET_CART, {
        notifyOnNetworkStatusChange: true,
        onCompleted: () => {
            // Update cart in the localStorage.
            const updatedCart = getFormattedCart(data);
            localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
            // Update cart data in React Context.
            setCart(updatedCart);
        }
    });

    const [ clearCartMutation ] = useMutation( CLEAR_CART_MUTATION );


    /*
     * Handle form submit.
     *
     * @param {Object} event Event Object.
     *
     * @return {void}
     */
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        /**
         * Validate Billing and Shipping Details
         *
         * Note:
         * 1. If billing is different than shipping address, only then validate billing.
         * 2. We are passing theBillingStates?.length and theShippingStates?.length, so that
         * the respective states should only be mandatory, if a country has states.
         */
        const billingValidationResult = input?.billingDifferentThanShipping ? validateAndSanitizeCheckoutForm(input?.billing, theBillingStates?.length) : {errors: null, isValid: true};
        const shippingValidationResult = validateAndSanitizeCheckoutForm(input?.shipping, theShippingStates?.length);

        if (!shippingValidationResult.isValid || !billingValidationResult.isValid) {
            setInput({
                ...input,
                billing: {...input.billing, errors: billingValidationResult.errors},
                shipping: {...input.shipping, errors: shippingValidationResult.errors},
            });
            return;
        }

        /**
         *  Process Ecpay. 
         *  1. format input, create wc-rest-api /orders  then clear cart. 
         *  ONLY do this when session not in cookie: store ecpayCheckoutData for /api/ecpay-order-session to set cookie. 
         *      means order was created in wc but failed in ecpay. 
         *      and it's fine to re-gen a ecpay checkout but not for wc /orders and graphql checkout mutation.
         *  ** SO, if got a fail msg from returnURL, gen a new page on frontend-returnURL to pay again. don't need to come back to this form.
         *  THAT'S THE REASON NOT GEN ECPAYTradeNo at this point. should be right before directed to /ecpay page                      
         */
        const ecpayCheckoutData = await handleECpayCheckout(input, cart?.products, setRequestError, clearCartMutation, setIsECPayOrderProcessing, setCreatedOrderData);
// console.log('ecpayCheckoutData: ', ecpayCheckoutData);

        axios( {
            data: { ecpayCheckoutData },
            method:'post',
            url:'/api/create-ecpay-session'
        }).catch ( (err)=> {
            console.log('create-ecpay-session err',err)
        });

        router.push('/ecpay');
    };


    /*
     * Handle onchange input.
     *
     * @param {Object} event Event Object.
     * @param {bool} isShipping If this is false it means it is billing.
     * @param {bool} isBillingOrShipping If this is false means its standard input and not billing or shipping.
     *
     * @return {void}
     */
    const handleOnChange = async (event, isShipping = false, isBillingOrShipping = false) => {

        const {target} = event || {};

        if ('createAccount' === target.name) {
            handleCreateAccount(input, setInput, target)
        } else if ('billingDifferentThanShipping' === target.name) {
            handleBillingDifferentThanShipping(input, setInput, target);
        } else if (isBillingOrShipping) {
            if (isShipping) {
                await handleShippingChange(target)
            } else {
                await handleBillingChange(target)
            }
        } else {
            const newState = {...input, [target.name]: target.value};
            setInput(newState);
        }
    };

    const handleShippingChange = async (target) => {
        const newState = {...input, shipping: {...input?.shipping, [target.name]: target.value}};
        setInput(newState);
        await setStatesForCountry(target, setTheShippingStates, setIsFetchingShippingStates);
    }

    const handleBillingChange = async (target) => {
        const newState = {...input, billing: {...input?.billing, [target.name]: target.value}};
        setInput(newState);
        await setStatesForCountry(target, setTheBillingStates, setIsFetchingBillingStates);
    }


    // Loading state
    const isOrderProcessing = isECPayOrderProcessing;

    return (
        <>
            {cart ? (
                <form onSubmit={handleFormSubmit} className="woo-next-checkout-form font-serif-ch text-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        <div>
                            {/*Shipping Details*/}
                            <div className="billing-details ">
                                <h2 className="text-xl font-medium mb-4 ">Shipping Details</h2>
                                <Address
                                    states={theShippingStates}
                                    countries={shippingCountries}
                                    input={input?.shipping}
                                    handleOnChange={(event) => handleOnChange(event, true, true)}
                                    isFetchingStates={isFetchingShippingStates}
                                    isShipping
                                    isBillingOrShipping
                                />
                            </div>
                            <div>
                                <CheckboxField
                                    name="billingDifferentThanShipping"
                                    type="checkbox"
                                    checked={input?.billingDifferentThanShipping}
                                    handleOnChange={handleOnChange}
                                    label="Billing different than shipping"
                                    containerClassNames="mb-4 pt-4 "
                                />
                            </div>
                            {/*Billing Details*/}
                            {input?.billingDifferentThanShipping ? (
                                <div className="billing-details">
                                    <h2 className="text-xl font-medium mb-4">Billing Details</h2>
                                    <Address
                                        states={theBillingStates}
                                        countries={billingCountries}
                                        input={input?.billing}
                                        handleOnChange={(event) => handleOnChange(event, false, true)}
                                        isFetchingStates={isFetchingBillingStates}
                                        isShipping={false}
                                        isBillingOrShipping
                                    />
                                </div>
                            ) : null}

                        </div>
                        {/* Order & Payments*/}
                        <div className="your-orders">
                            {/*	Order*/}
                            <h2 className="text-xl font-medium mb-4">Your Order</h2>
                            <YourOrder cart={cart}/>

                            {/*Payment*/}
                            {/* <PaymentModes input={input} handleOnChange={handleOnChange}/> */}

                            <div className="woo-next-place-order-btn-wrap mt-5">
                                <button
                                    disabled={isOrderProcessing}
                                    className={cx(
                                        'border custom-btn custom-btn-hover font-semibold px-5 py-3 rounded-sm w-full',
                                        {'opacity-50': isOrderProcessing}
                                    )}
                                    type="submit"
                                >
                                    Place Order
                                </button>
                            </div>

                            {/* Checkout Loading*/}
                            {isOrderProcessing && <p>Processing Order...</p>}
                            {requestError && <p>Error : {requestError} :( Please try again</p>}
                        </div>
                    </div>
                </form>
            ) : null}
            {/*	Show message if Order Success*/}
            {/* <OrderSuccess response={checkoutResponse}/> */}
        </>
    );
};

export default CheckoutForm;
