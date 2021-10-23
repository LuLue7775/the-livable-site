import {useState, useContext} from "react";
import {useQuery, useMutation} from '@apollo/client';
import Link from "next/link";
import {v4} from 'uuid';
import cx from 'classnames';

import {AppContext} from "../context/AppContext";
import {getFormattedCart} from "../../functions";
import GET_CART from "../../queries/get-cart";
import ADD_TO_CART from "../../mutations/add-to-cart";

const AddToCart = (props) => {

    const {product, qty} = props || {};

    const productQryInput = {
        clientMutationId: v4(), // Generate a unique id.
        productId: product.productId,
        quantity: qty
    };

    const [cart, setCart] = useContext(AppContext);
    const [showViewCart, setShowViewCart] = useState(false);
    const [requestError, setRequestError] = useState(null);

    // Get old Cart Data. then update cart data
    const {data, refetch} = useQuery(GET_CART, {
            notifyOnNetworkStatusChange: true,
            onCompleted: () => {
                // Update cart in the localStorage.
                const updatedCart = getFormattedCart(data);
                localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));

                // Update cart data in React Context.
                setCart(updatedCart);
            }
        });

    // Do this first once addToCart pressed. Add to Cart Mutation. 
    const [addToCart, {
        data: addToCartRes,
        loading: addToCartLoading,
        error: addToCartError
    }] = useMutation(ADD_TO_CART, {
        variables: {
            input: productQryInput,
        },
        onCompleted: () => {
            // On Success:
            // 1. Make the GET_CART query to update the cart with new values in React context.
            refetch();

            // 2. Show View Cart Button
            setShowViewCart(true)
        },
        onError: (error) => {
            if (error) {
                setRequestError(error?.graphQLErrors?.[0]?.message ?? '');
            }
        }
    });

    const handleAddToCartClick = async () => {
        setRequestError(null);
        await addToCart();
    };

    return (
        <div>
            {/*	Check if its an external product then put its external buy link */}
            {"ExternalProduct" === product.__typename ? (
                    <a href={product?.externalUrl ?? '/'} target="_blank"
                       className="font-serif-ch px-3 py-1 rounded-sm mr-3 text-sm border-solid border inline-block hover:bg-blue-800 hover:text-white hover:border-blue-800">
						Buy now
                    </a>
                ) :
                <button
					disabled={addToCartLoading}
                    onClick={handleAddToCartClick}
                    className={cx(
                        'font-serif-ch px-3 py-1 rounded-sm mr-3 text-sm border-solid border ',
                        {'custom-btn custom-btn-brown ': !addToCartLoading},
                        {'opacity-50 cursor-not-allowed': addToCartLoading}
                    )}
                >
					{ addToCartLoading ? 'Adding to cart...' : 'Add to cart' }
                </button>
            }
            {showViewCart ? (
                <Link href="/cart">
                    <button
                        className="font-serif-ch px-3 py-1 rounded-sm text-sm border-solid border inline-block custom-btn custom-btn-brown hover:text-green-1000">
                        View Cart
                    </button>
                </Link>
            ) : ''}

            {/* { requestError ? <div className="row woo-next-cart-total-container mt-5"> { requestError } </div> : '' } */}
        </div>
    );
};

export default AddToCart;
