import Link from 'next/link';
import { useContext, useState } from 'react';
import { AppContext } from "../context/AppContext";

const CartIcon = () => {

	const [ cart ] = useContext( AppContext );
	const productsCount = ( null !== cart && Object.keys( cart ).length ) ? cart.totalProductsCount : '';
	const totalPrice = ( null !== cart && Object.keys( cart ).length ) ? cart.totalProductsPrice : '';
	const [ isCartVisible, setCartVisibility ] = useState(false);

	return (
		<div className=" w-screen h-screen ">
			<Link href="/cart">
				<a className="absolute block text-center top-9 right-24 sm:right-28 xl:top-cart xl:left-9 border border-green-900 text-base text-green-900 italic hover:border-red-400 hover:bg-red-300 delay-100 duration-150 h-8 w-8 rounded-full" onClick={() => setCartVisibility(!isCartVisible)}>
					{/* <div className="rounded-full h-6 w-6 flex items-center justify-center border border-black">   */}
						<label > { productsCount ? <span>{ productsCount }</span> : '0' } </label>

					{/* </div> */}
					{/*{ totalPrice ? <span>{ totalPrice }</span> : '' }*/}
					<label className="absolute top-1/6 left-0 right-0 font-light text-sm hover:underline text-green-1000 hover:text-red-400"> cart </label>
				</a>
			</Link>
		</div>	
	)
};

export default CartIcon;
