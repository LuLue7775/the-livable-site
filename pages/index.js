import Image from 'next/image';
import client from '../src/components/ApolloClient';
import PRODUCTS_AND_CATEGORIES_QUERY from "../src/queries/product-and-categories";
import Header from '../src/components/Header';
import React, { useEffect, useRef, useContext } from 'react';
import { MobileDeviceContext } from '../src/components/context/AppContext';

import LandingPage from '../src/components/home/Landingpage';


export default function Home ( props ) {

	const { menu } = props || {};
	const isMobileDevice = useContext( MobileDeviceContext ) ;

/**
 * Determine either click or touch. Only checking this on landing page at the moment.
 */
    const LandingRef = useRef(null);
    useEffect(()=> {
		if( isMobileDevice ) {
			LandingRef.current.addEventListener('touchend',function(event){
				if (event.cancelable) event.preventDefault();
			}, false );
			return LandingRef.current.removeEventListener('touchend',function(event){ if (event.cancelable) event.preventDefault(); }, false );
		}
    }, [isMobileDevice]);


	
	return (
		<>
			<div className="relative z-50">
				<Header menu={ menu }/>
			</div>
			<div className="fixed right-0 w-screen h-screen opacity-10 z-10"> 
            	<Image src='/noise_lg.png' alt="background" layout="fill" />
            </div>
            <div ref={LandingRef} className="front-wrapper overflow-hidden">
				<LandingPage/>  
			</div>
		</>
	)
};

export async function getStaticProps () {

	const { data } = await client.query( {
		query: PRODUCTS_AND_CATEGORIES_QUERY,
	} );

	return {
		props: {
			productCategories: data?.productCategories?.nodes ? data.productCategories.nodes : [],
			products: data?.products?.nodes ? data.products.nodes : [],
			menu: 
			[ 
				[ data?.shop ? data.shop : [] ] ,
				[ data?.workshop ? data.workshop : [] ] ,
				[ data?.journal ? data.journal : [] ] ,				
			] ?? []
		},
		revalidate: 30
	}

};
