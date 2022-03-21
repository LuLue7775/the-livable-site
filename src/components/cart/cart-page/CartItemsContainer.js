import Link from 'next/link';
import { useContext, useState } from 'react';
import { AppContext } from "../../context/AppContext";
import { getFormattedCart, getUpdatedItems } from '../../../functions';
import CartItem from "./CartItem";
import { v4 } from 'uuid';
import { useMutation, useQuery } from '@apollo/client';
import UPDATE_CART from "../../../mutations/update-cart";
import GET_CART from "../../../queries/get-cart";
import CLEAR_CART_MUTATION from "../../../mutations/clear-cart";
import {isEmpty} from 'lodash'


const CartItemsContainer = () => {


	// @TODO wil use it in future variations of the project.
	const [ cart, setCart ] = useContext( AppContext );
	const [requestError, setRequestError] = useState( null );

	// Get Cart Data.
	const { loading, error, data, refetch } = useQuery( GET_CART, {
		notifyOnNetworkStatusChange: true,
		onCompleted: () => {

			// Update cart in the localStorage.
			const updatedCart = getFormattedCart( data );
			localStorage.setItem( 'woo-next-cart', JSON.stringify( updatedCart ) );

			// Update cart data in React Context.
			setCart( updatedCart );
		}
	} );

	// Update Cart Mutation.
	const [updateCart, { data: updateCartResponse, loading: updateCartProcessing, error: updateCartError }] = useMutation( UPDATE_CART, {
		onCompleted: () => {
			refetch();
		},
		onError: ( error ) => {
			if ( error ) {
				const errorMessage = error?.graphQLErrors?.[ 0 ]?.message ? error.graphQLErrors[ 0 ].message : '';
				setRequestError( errorMessage );
			}
		}
	} );

	// Update Cart Mutation.
	const [clearCart, { data: clearCartRes, loading: clearCartProcessing, error: clearCartError }] = useMutation( CLEAR_CART_MUTATION, {
		onCompleted: () => {
			refetch();
		},
		onError: ( error ) => {
			if ( error ) {
				const errorMessage = ! isEmpty(error?.graphQLErrors?.[ 0 ]) ? error.graphQLErrors[ 0 ]?.message : '';
				setRequestError( errorMessage );
			}
		}
	} );

	/*
	 * Handle remove product click.
	 *
	 * @param {Object} event event
	 * @param {Integer} Product Id.
	 *
	 * @return {void}
	 */
	const handleRemoveProductClick = ( event, cartKey, products ) => {

		event.stopPropagation();
		if ( products.length ) {

			// By passing the newQty to 0 in updateCart Mutation, it will remove the item.
			const newQty = 0;
			const updatedItems = getUpdatedItems( products, newQty, cartKey );

			updateCart( {
				variables: {
					input: {
						clientMutationId: v4(),
						items: updatedItems
					}
				},
			} );
		}
	};

	// Clear the entire cart.
	const handleClearCart = ( event ) => {

		event.stopPropagation();

		if ( clearCartProcessing ) {
			return;
		}

		clearCart( {
			variables: {
				input: {
					clientMutationId: v4(),
					all: true
				}
			},
		} );
	}

	return (
		<div className="cart product-cart-container container mx-auto my-32 px-4 xl:px-40 font-serif-ch">
			{ cart ? (
				<div className="woo-next-cart-wrapper container mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-5">
						<div className="md:col-span-2 ">
							{ cart.products.length && (
								cart.products.map( item => (
									<CartItem
										key={ item.productId }
										item={ item }
										updateCartProcessing={ updateCartProcessing }
										products={ cart.products }
										handleRemoveProductClick={ handleRemoveProductClick }
										updateCart={ updateCart }
									/>
								) )
							) }

							{/*Clear entire cart*/}
							<div className="p-4">
								<button className="px-4 py-1 bg-transparent border border-white text-white rounded-sm w-auto" onClick={ ( event ) => handleClearCart( event ) } disabled={ clearCartProcessing }>
									<span className="woo-next-cart">Clear Cart</span>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="square" strokeLinecap="square" strokeWidth="1" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
									</svg>
								</button>
								{ clearCartProcessing ? <p>Clearing...</p> : '' }
								{ updateCartProcessing ? <p>Updating...</p> : null }
							</div>
						</div>


						{/*Cart Total*/ }
						<div className="row cart-total-container border border-green-light rounded-sm p-5 text-right">
								<table className="table table-hover mb-5">
									<tbody>
									<tr className="table-light flex flex-col text-white">
										<td className="text-2xl font-normal">Subtotal</td>
										<td className="text-xl font-bold font-body">{ ( 'string' !== typeof cart.totalProductsPrice ) ? cart.totalProductsPrice.toFixed(2) : cart.totalProductsPrice }</td>
									</tr>
									</tbody>
								</table>
								
								<Link href="/checkout">
									<button className="border custom-btn custom-btn-hover text-white px-5 py-3 my-1 rounded-lg w-full ">
										<span >Checkout</span>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-3" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
										</svg>
									</button>
								</Link>
						</div>
					</div>

					{/* Display Errors if any */}
					{ requestError ? <div className="row cart-total-container mt-5"> { requestError } </div> : '' }
				</div>
			) : (
				<div className="container mx-auto my-32 px-4 xl:px-0">
					<h2 className="text-2xl mb-5">No items in the cart</h2>
					<Link href="/">
						<button className="bg-yellow-400 text-white px-5 py-3 rounded-sm hover:border-red-400">
							<span className="woo-next-cart-checkout-txt">Add New Products</span>
							<i className="fas fa-long-arrow-alt-right"/>
						</button>
					</Link>
				</div>
			) }
		</div>

	);
};

export default CartItemsContainer;
