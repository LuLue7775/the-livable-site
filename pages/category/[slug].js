import client from "../../src/components/ApolloClient";
import Image from 'next/image';
import { SUBCATS_BY_SLUG } from "../../src/queries/subcats-by-slug";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, useContext } from 'react';
import Header from "../../src/components/Header";
import { MenuContext } from "../../src/components/context/AppContext";
import LoadProducts from "../../src/components/category/LoadProducts";

export default function CategorySingle( { items } ) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>
    };

/**
 *  BLURRY BG WHEN MENU CLICKED
 */    
 const background = useRef(null);
 const [ isMenuVisible, setMenuVisibility ] = useContext( MenuContext );
 useEffect(()=> {
     if (isMenuVisible) {
         background.current.className += (' blur-bg');
     } else {
         background.current.className = "product-categories grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mt-24"
     }
 }, [isMenuVisible]);

    return (
        <>  
            <div className="relative z-80 ">
                <Header/>
            </div>
            <div className="fixed top-0 w-reset-screen h-screen opacity-50 z-0"> 
                <Image src='/bg.jpg' alt="background" layout="fill" />
            </div>
            <div className="product-categories-container container relative m-auto z-10 pt-8 w-reset-screen sm:px-4">
                <div  ref={background} className="blur-bg product-categories grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mt-24 " >
                    { undefined !== items && items.products?.nodes?.length ? (

                        <LoadProducts items={items}/>

                    ) : ''}
                </div>
                <div className="h-300px" /> {/** space for load more */}
            </div>
        </>

    )
};

export async function getStaticProps(context) {

    const {params: { slug }} = context

    const {data} = await client.query(({
        query: SUBCATS_BY_SLUG,
        variables: { 
            slug,
            first: 10,
			after: null, 
        }
    }));

    return {
        props: {
            items: data.productCategory,
        },
        revalidate: 10
    }

}

export async function getStaticPaths () {

    const pathsData = [{ params: { slug: "shop" } } ,{ params: { slug: "workshops"} }]   
    
    return {
        paths: pathsData,
        fallback: false
    }
}
