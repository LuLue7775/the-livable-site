import client from "../../src/components/ApolloClient";
import Image from 'next/image';
import { SUBCATS_BY_SLUG } from "../../src/queries/subcats-by-slug";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, useContext } from 'react';
import Header from "../../src/components/Header";
import { MenuContext } from "../../src/components/context/AppContext";
import { MobileDeviceContext } from "../../src/components/context/AppContext";
import LoadProducts from "../../src/components/category/LoadProducts";

export default function CategorySingle( { items } ) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>
    };

    /**
     *  Page transform.
     */
    const pageWrap = useRef(null);
    useEffect(() => {
        gsap.to(pageWrap.current, {opacity:1, duration:2, delay:1 })
    }, []);

    /**
     *  Fake smooth scroll
     */
    const isMobileDevice = useContext( MobileDeviceContext ) ;

    const scrollRef = useRef(null);
    useEffect(()=>{
        if( isMobileDevice ===false ){
            gsap.registerPlugin(ScrollTrigger);

            const height = scrollRef.current.clientHeight;
            document.body.style.height = `${height}px`;
    
            gsap.to( scrollRef.current , {
                y: -(height - document.documentElement.clientHeight),
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                    immediateRender: true
                },
            });
        }
    },[]);

    /**
     *  BLURRY BG WHEN MENU CLICKED
     */    
    const background = useRef(null);
    const [ isMenuVisible, setMenuVisibility ] = useContext( MenuContext );
    useEffect(()=> {
        if (isMenuVisible) {
            background.current.className += (' blur-bg');
        } else {
            background.current.className = "product-categories grid justify-items-end gap-6 grid-cols-2 xl:grid-cols-3 mt-24"
        }
    }, [isMenuVisible]);


    return (
        <div ref={pageWrap} className="pageWrap">
            <div className="relative z-80 ">
                <Header/>
            </div>
            <div className="fixed top-0 w-reset-screen h-screen opacity-90 z-0"> 
                <Image className="object-cover" src='/lobby.png' alt="background" layout="fill" />
            </div>
            <div ref={scrollRef}>

                <div className="product-categories-container container relative m-auto z-10 pt-8 w-reset-screen ">
                    <div  ref={background} className="blur-bg product-categories grid justify-items-end gap-4 grid-cols-2 xl:grid-cols-3 mt-24 " >
                        { undefined !== items && items.products?.nodes?.length ? (
                                <LoadProducts items={items}/>
                        ) : ''}
                    </div>
                    <div className="h-300px" /> {/** space for load more */}
                </div>
            </div>
        </div>
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
