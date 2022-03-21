import CheckoutForm from "../src/components/checkout/CheckoutForm";
import GET_COUNTRIES_AND_MENUSUBCATS from "../src/queries/get-countries";
import client from "../src/components/ApolloClient";
import Image from 'next/image';
import Header from "../src/components/Header";
import { useRouter } from "next/router";
import { useEffect, useContext, useRef } from 'react';
import { MenuContext } from "../src/components/context/AppContext";


const Checkout = ( { countriesData } ) => {

	const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }



/**
 *  BLURRY BG WHEN MENU CLICKED
 */    
	 const background = useRef(null);

	 const [ isMenuVisible, setMenuVisibility ] = useContext( MenuContext );
 
	 useEffect(()=> {
		 if (isMenuVisible) {
			 background.current.className += (' blur-bg');
		 } else {
			 background.current.className = "absolute z-30 left-0 right-0 checkout container mx-auto my-32 px-4 xl:px-0"
		 }
	 }, [isMenuVisible]);    
 
	return(
		 <>
            <div className="fixed top-0 w-reset-screen h-screen opacity-90 z-0"> 
                <Image className="object-cover" src='/lobby.png' alt="background" layout="fill" />
            </div>
			<div className="relative z-50 ">
				<Header />
			</div>	
			<div ref={background} className="absolute z-30 left-0 right-0 checkout container mx-auto my-32 px-4 xl:px-0">
				<CheckoutForm countriesData={ countriesData ?? {} }/>
			</div>
		 </> 	
	)

};

export default Checkout;

export async function getStaticProps() {

	const { data } = await client.query({
		query: GET_COUNTRIES_AND_MENUSUBCATS
	});

	return {
		props: {
			countriesData: data?.wooCountries || {},
		},
		revalidate: 1
	};

}
