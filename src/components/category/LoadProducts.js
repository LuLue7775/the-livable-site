import Product from "./Product";
import { useState, useEffect, useContext } from "react";
import { SUBCATS_BY_SLUG } from "../../queries/subcats-by-slug";
import { useLazyQuery } from "@apollo/client";

import useInView from "react-cool-inview";

const LoadProducts = ({ items }) => {

    const [ productsData, setProductsData ] = useState( items?.products?.nodes ?? [] );
    const [ pageInfo, setPageInfo ] = useState( items?.products?.pageInfo );
    
/**
 * If value of 'items' passed to this component changes, set new post data and page info.
 */
    useEffect( () => {
        setProductsData( items?.products?.nodes );
        setPageInfo( items?.products?.pageInfo );
    }, [ items?.products?.nodes ] );


    const setProducts = ( items ) => { 
        
        if(!items || !items?.products?.nodes || !items?.products?.pageInfo) { return }; 

    /**
     * Concat the newly received post from client request to the existing posts, using setPostsData()
     * and also set the new pageInfo that contains the new endcursor, so that
     * when user clicks on loadmore again, next set of posts can be fetched again.
     * Same process if repeated to it gets concatenated everytime to the existing posts array.
     */

        const newProducts = productsData.concat( items?.products?.nodes );
        setProductsData( newProducts );
        setPageInfo(items?.products?.pageInfo );

    }; 


    const [ fetchPosts, { loading } ] = useLazyQuery( SUBCATS_BY_SLUG, {
        notifyOnNetworkStatusChange: true,
        onCompleted: ( data ) => {
            setProducts( data?.productCategory ?? '');
        },
        onError: (error) => {
            console.log(error)
          }
    }) ;


    const loadMoreItems = ( endCursor = null ) => {
        let queryVariables = {
            slug: items?.slug,
            first: 10,
            after: endCursor,
        };
        fetchPosts( {
            variables: queryVariables,
        } );
    };

/**
 * Pull the endcursor and hasNextPage values from pageInfo
 *
 * Please note that pageInfo gets updated with new endCursor and hasNextPage
 * values everytime a new client side request is made using setPageInfo()
 */
     const { endCursor, hasNextPage } = pageInfo || {};

 /**
  *  If loadmore is in view
  */
  const { observe, inView,  } = useInView({
    onEnter: ({ unobserve }) => {
        loadMoreItems( endCursor );
        unobserve();
    },

  });




    return (
    <>
        { productsData.map( product => <Product key={ product?.id } product={ product } categoryName={items.slug} />  ) }
        { hasNextPage ? (
            <div ref={observe} className="absolute bottom-0 w-reset-screen h-300px flex justify-center "> {inView ? "Load more" : ""} </div>

            ) :
        ''
    
        }
    </>
    );
};
export default LoadProducts;
