import { useState, useEffect, useRef } from 'react';
import { v4 } from "uuid";
import { getUpdatedItems } from "../../../functions";
import SvgCross from "../../svg-icons/Cross";
import Link from 'next/link';
import AddProduct from "../../svg-icons/AddProduct";
import DeductProduct from "../../svg-icons/DeductProduct";

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
				<div className="woo-next-cart-item text-white font-serif-ch font-light text-base " key={ item.id }>
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
								<div className="font-semibold ">
								{ item.name }
								</div>
							
						</div>
					
						<div className="grid grid-rows-3 border-l pr-6 pl-2 max-w-150px">
							<div className="grid-cols-2"> 
								<div className="border-b"> Price</div>
								<div className=""> { ( 'string' !== typeof item.price ) ? item.price.toFixed( 2 ) : item.price } </div>
							</div>
							<div className="grid-cols-2"> 
								<div className="border-b"> Quantity</div>

								<div className="font-serif-ch pb-4 flex justify-center">
									<button onClick={ () => { if ( BtnQty > 1 ) {setBtnQty( prevState => prevState - 1)} }} className="px-4 cursor-pointer"> <DeductProduct mode={'light'}/> </button>
										<div ref={BtnQtyRef} className="px-6 text-white text-center"> {BtnQty} pcs </div>
									<button onClick={ () => { if ( BtnQty > 1 ) {setBtnQty( prevState => prevState + 1)} }} className="px-4 cursor-pointer"> <AddProduct mode={'light'}/> </button>
								</div>

							</div>
							<div className="grid-cols-2"> 
								<div className="border-b"> Item Total</div>
								<div className=""> { ( 'string' !== typeof item.totalPrice ) ? item.totalPrice.toFixed( 2 ) : item.totalPrice } </div>
							</div>

						</div>
					</div>
				</div>

	)
};

export default CartItem;
