import CartItemsContainer from "../src/components/cart/cart-page/CartItemsContainer";
import Image from 'next/image';
import Header from "../src/components/Header";
import client from '../src/components/ApolloClient';
import SUBCATEGORIES from "../src/queries/subcategories";
import { useRef, useContext, useEffect } from 'react';
import { useRouter } from "next/router";
import { MenuContext } from "../src/components/context/AppContext";

const Cart = ( ) => {

	const router = useRouter();


/**
 *  BLURRY BG WHEN MENU CLICKED
 */    
	 const background = useRef(null);

	 const [ isMenuVisible, setMenuVisibility ] = useContext( MenuContext );
 
	 useEffect(()=> {
		 if (isMenuVisible) {
			 background.current.className += (' blur-bg');
		 } else {
			 background.current.className = "absolute z-30 left-0 right-0"
		 }
	 }, [isMenuVisible]);    

	 
	return (
        <>
            <div className="fixed top-0 w-reset-screen h-screen opacity-90 z-0"> 
                <Image className="object-cover" src='/lobby.png' alt="background" layout="fill" />
            </div>
            <div className="relative z-50 ">
                <Header/>
            </div>		
			<div ref={background} className="absolute z-30 left-0 right-0">
				<CartItemsContainer/>
			</div>	
			
		</>
	)
};

export default Cart;
