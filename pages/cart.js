import CartItemsContainer from "../src/components/cart/cart-page/CartItemsContainer";
import Image from 'next/image';
import Header from "../src/components/Header";
import client from '../src/components/ApolloClient';
import SUBCATEGORIES from "../src/queries/subcategories";
import { useRef, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { MenuContext } from "../src/components/context/AppContext";

const Cart = ( props ) => {

	const { menu } = props || {};
	const router = useRouter()


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
            <div className="fixed w-screen h-screen opacity-50 z-0"> 
            	<Image src='/bg.jpg' alt="background" layout="fill" />
            </div>
            <div className="relative z-50 ">
                <Header menu={ menu } />
            </div>		
			<div ref={background} className="absolute z-30 left-0 right-0">
				<CartItemsContainer/>
			</div>	
			
		</>
	)
};

export default Cart;

export async function getStaticProps () {

	const { data } = await client.query( {
		query: SUBCATEGORIES,
	} );

	return {
		props: {
			menu: 
			[ 
				[ data?.shop ? data.shop : [] ] ,
				[ data?.workshop ? data.workshop : [] ] ,
				[ data?.journal ? data.journal : [] ] ,				
			] ?? []
		},
		revalidate: 1
	}

};
