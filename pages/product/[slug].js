import { useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import client from '../../src/components/ApolloClient';
import {PRODUCT_BY_SLUG_QUERY, PRODUCT_SLUGS} from '../../src/queries/product-by-slug';
import { isEmpty } from 'lodash';
import Header from '../../src/components/Header';
import { MenuContext } from '../../src/components/context/AppContext';
import { MobileDeviceContext } from '../../src/components/context/AppContext';
import MainDetail from "../../src/components/single-product/single-page/MainDetail";
import ImageSection from "../../src/components/single-product/single-page/ImageSection";

export default function Product({ product }) {
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
            background.current.className = "mobile-screen-100vh relative grid grid-cols-1 md:grid-cols-2 gap-0 md:overflow-x-hidden"
        }
    }, [isMenuVisible]);


    const isMobileDevice = useContext( MobileDeviceContext ) ;
    const ImgSectionRef = useRef(null);
    useEffect(()=> {
		if( isMobileDevice ) {
			ImgSectionRef.current.addEventListener('touchend',function(event){
				if (event.cancelable) event.preventDefault();
			}, false );
            document.body.addEventListener('touchmove',function(event){
				if (event.cancelable) event.preventDefault();
			}, false );
            // document.body.style.overflow = 'scroll';
            // document.body.style.position = 'static';

		}
        return () => {
            ImgSectionRef.current.removeEventListener('touchend',function(event){ if (event.cancelable) event.preventDefault(); }, false );
            document.body.removeEventListener('touchmove',function(event){ if (event.cancelable) event.preventDefault();}, false );
        }
    }, [isMobileDevice]);



	return (
		<div className="relative">
            <div className="relative z-40 ">
                <Header/>
            </div>

			{ product ? (
                <div ref={background} className=" absolute product-grid md:overflow-x-hidden">
                    <div ref={ImgSectionRef} className=" mobile-screen-100vh overflow-hidden bg-green-1000"> 
                        <ImageSection product={product} />
                    </div>
                    <div className=" relative bg-orange md:overflow-x-hidden"> 
                        {/* <Image src='/curvedBG-lg2.jpg' alt="background" layout="fill" objectFit="cover" />
                        <div className=" overflow-hidden opacity-10"> 
                            <Image src='/noise_lg.png' alt="background" layout="fill" objectFit="cover" />
                        </div> */}

                        <div className="relative w-screen md:w-1/2 bg-orange pt-12 pb-16 text-green-1000">
                                <MainDetail product={product}/>
                        </div>
                    </div>
                </div>
			) : (
				''
			) }
		</div>
	);
};


export async function getStaticProps(context) {

    const {params: { slug }} = context

    const {data} = await client.query({
        query: PRODUCT_BY_SLUG_QUERY,
        variables: { slug }
    })
   
    return {
        props: {
            product: data?.product || {},
        },
        revalidate: 1
    };
}

export async function getStaticPaths () {
    const { data } = await client.query({
        query: PRODUCT_SLUGS
    })

    const pathsData = []

    data?.products?.nodes && data?.products?.nodes.map((product) => {
        if (!isEmpty(product?.slug)) {
            pathsData.push({ params: { slug: product?.slug } })
        }
    })

    return {
        paths: pathsData,
        fallback: false
    }
}
