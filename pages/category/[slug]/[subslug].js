import client from "../../../src/components/ApolloClient";
import Product from "../../../src/components/Product";
import {GET_SUBCATEGORIES_ITEMS, PRODUCT_SUBCATEGORIES_SLUGS} from "../../../src/queries/get-subcategories-items";
import {useRouter} from "next/router";
import Image from 'next/image';
import Header from "../../../src/components/Header";
import { useRef, useEffect, useContext } from "react";
import { MenuContext } from "../../../src/components/context/AppContext";

export default function UnderCategorySingle( { categoryName, products, menu } ) {

    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }
// useEffect(()=> {
//     document.addEventListener('DOMContentLoaded', function(event) {
//         console.log('DOMContentLoaded');
//       });
 
//     return  document.removeEventListener('DOMContentLoaded', function(event) {
//         console.log({event});
//       });
// });

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
            <div className="relative z-50 ">
                <Header menu={ menu } />
            </div>
            
            <div className="fixed top-0 w-reset-screen h-screen opacity-50 z-0"> 
                <Image src='/bg.jpg' alt="background" layout="fill" />
            </div>

            <div className="product-categories-container container relative m-auto z-10 pt-8 w-reset-screen sm:px-4">
                <div ref={background} className="blur-bg product-categories grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mt-24" >
                    { undefined !== products && products?.length ? (
                        products.map( product => 
                        <Product key={ product?.id } product={ product } categoryName={categoryName} /> 
                        
                        )
                    ) : ''}
                </div>
                
            </div>
        </>

    )
};

export async function getStaticProps(context) {

    const {params: { slug, subslug }} = context
    
    const {data} = await client.query(({
        query: GET_SUBCATEGORIES_ITEMS,
        variables: { subslug }
    }));
    return {
        props: {
            categoryName: slug ?? '',
            products:data?.productCategory?.products?.nodes ?? [],
            menu: 
			[ 
				[ data?.shop ? data.shop : [] ] ,
				[ data?.workshop ? data.workshop : [] ] ,
				[ data?.journal ? data.journal : [] ] ,				
			]

        },
        revalidate: 10
    }

}

export async function getStaticPaths () {
    
    const { data } = await client.query({
        query: PRODUCT_SUBCATEGORIES_SLUGS,
    });

    const pathsData = [];

    data?.productCategories?.nodes && data?.productCategories?.nodes.map((productCategory) => {
        productCategory?.children?.nodes?.map( (subcat) => {
            pathsData.push({ 
                params: { 
                        slug: productCategory?.slug, 
                        subslug: subcat?.slug
                        } 
                });   
                
        } )
    });

    return {
        paths: pathsData,
        fallback: true
    }
}
