import { useState, useEffect, useRef } from 'react';
import { v4 } from "uuid";
import { getUpdatedItems } from "../../../functions";
import SvgCross from "../../svg-icons/Cross";
import Link from 'next/link';
const CartItem = ( {
	                   item,
	                   products,
					   updateCartProcessing,
	                   handleRemoveProductClick,
	                   updateCart,
                   } ) => {

	const [productCount, setProductCount] = useState( item.qty );
    const [ BtnQty, setBtnQty ] = useState(productCount);
	const BtnQtyRef = useRef();

	/*
	 * When user changes the qty from product input update the cart in localStorage
	 * Also update the cart in global context
	 *
	 * @param {Object} event event
	 *
	 * @return {void}
	 */

	// just to prevent tasks below happen on first render
	const isMounted = useRef(false); 

	useEffect(()=>{
		if ( isMounted.current ) {
			if ( process.browser ) {

				// If the previous update cart mutation request is still processing, then return.
				if ( updateCartProcessing ) {
					return;
				}
				
				// Set the new qty in state.
				setProductCount( BtnQty );

				if ( products.length ) {

					const updatedItems = getUpdatedItems( products, BtnQty, item.cartKey );

					updateCart( {
						variables: {
							input: {
								clientMutationId: v4(),
								items: updatedItems
							}
						},
					} );
				}
			}
		} else {
            isMounted.current = true;
        }

	}, [BtnQty]);


	return (
				<div className="woo-next-cart-item" key={ item.id }>
					<div className="woo-next-cart-element woo-next-cart-el-close ">
						{/* Remove item */}
						<span className="woo-next-cart-close-icon cursor-pointer"
							onClick={ ( event ) => handleRemoveProductClick( event, item.cartKey, products ) }>
							<SvgCross/>
						</span>
					</div>
					<div className="grid grid-cols-2 border-b ml-3 ">
						<div className="grid grid-rows-4 items-center md:mr-3">
							<Link href={`/product/${item?.slug}`}>
								<div className="row-span-3 cursor-pointer"> 
									<img className="object-cover h-160px w-160px" src={ item.image.sourceUrl } srcSet={ item.image.srcSet } alt={ item.image.title }/>
								</div>
							</Link>
								<div className="text-base font-semibold ">
								{ item.name }
								</div>
							
						</div>
					
						<div className="grid grid-rows-3 border-l p-6 max-w-150px">
							<div className="grid-cols-2"> 
								<div className="border-b"> Price</div>
								<div className="font-bold"> { ( 'string' !== typeof item.price ) ? item.price.toFixed( 2 ) : item.price } </div>
							</div>
							<div className="grid-cols-2"> 
								<div className="border-b"> Quantity</div>
								<div> 
									<div className="product-add-minus-btn grid grid-cols-4 justify-items-center">
										<button onClick={ () => { if ( BtnQty > 1 ) {setBtnQty( prevState => prevState - 1)} }} className={`${ updateCartProcessing ? 'opacity-25 pointer-events-none' : '' } col-span-1 cursor-pointer`}>
											<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinecap="round" strokeWidth="1" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										</button>
										
										<input 
											ref={BtnQtyRef}
											className={`${ updateCartProcessing ? 'opacity-25 pointer-events-none' : '' } col-span-2 border rounded-lg w-12`}
											type="number"
											min="1"
											data-cart-key={ item.cartKey }
											value={BtnQty}
											onChange={e => e.currentTarget.value }
											// onChange={  ( event ) => handleQtyChange( event, BtnQty ,item.cartKey )   }
										/> 
										<button onClick={ () => setBtnQty( prevState => prevState + 1) } className={`${ updateCartProcessing ? 'opacity-25 pointer-events-none' : '' } col-span-1 cursor-pointer`}>
											<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinecap="round" strokeWidth="1" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										</button>


									</div>
								</div>
							</div>
							<div className="grid-cols-2"> 
								<div className="border-b"> Total</div>
								<div className="font-bold"> { ( 'string' !== typeof item.totalPrice ) ? item.totalPrice.toFixed( 2 ) : item.totalPrice } </div>
							</div>

						</div>
					</div>
				</div>

	)
};

export default CartItem;
