import Link from 'next/link';
import Price from '../single-product/price';
import Image from "../../image";
import Img from 'next/image';
import {DEFAULT_PRODUCT_HOME_IMG_URL} from "../../constants/urls";
import { isEmpty } from 'lodash';
import { useEffect, useRef, useContext } from 'react';
import { MobileDeviceContext } from '../context/AppContext';

const Product = ( { categoryName, product } ) => {

	const isMobileDevice = useContext( MobileDeviceContext ) ;
	
    const productsRefs = useRef([]);
    const addProductsToRef = (el) => {
        if ( el && !productsRefs.current.includes(el) ) {
            productsRefs.current.push(el);
        }
    };


	// useEffect(()=> {
	// 	if ( isMobileDevice === false ) { // isMobileDevice will be null for a moment at the begining
	// 		gsap.registerPlugin(ScrollTrigger);

	// 		productsRefs.current.forEach( ( product ) => {
	// 			gsap.from( product,  {
	// 				opacity:0,
	// 				duration:0.1,
	// 				ease:"power2",
	// 				scrollTrigger: {
	// 					trigger: product,
	// 					start: "top center",
	// 					end:"bottom+=200 bottom",
	// 					scrub:1,
	// 				}
	// 			});
	// 		});
	// 	}

	// }, [productsRefs.current]);


	return (
		undefined !== product && 'GroupProduct' !== product.__typename ? (
			<div ref={addProductsToRef} className="product mb-10 m-4">
				<div className="relative h-600px  md:w-400px "> {/**w-screen md:w-450px */}
				<Link href={ `/product/${ product?.slug }`} >
					<a className="group ">

						<div className="w-1/3 xl:w-1/5 h-auto absolute right-4">
							<div className="vertical-text transition duration-150 delay-200 group-hover:text-yellow-300 inline absolute w-full 
											z-20 text-base italic text-orange font-body">
							{isEmpty(product?.productCategories?.nodes?.[0]?.children?.nodes) 
											? product?.productCategories?.nodes?.[0]?.name 
											: product?.productCategories?.nodes?.[1]?.name}
							</div>
							
							<Img
								className="object-cover bg-gray-100 sm:rounded-lg z-10 "
								layout="responsive"
								width='300'
								height='300'
								loading="lazy"
								placeholder="blur"
								blurDataURL={'/placeholder.jpg'}
								src={ product?.image?.sourceUrl ?? '' }
								alt={product?.image?.altText ?? product?.slug}
							
							/>
						</div>
						
						{/* <div className="product-info absolute bottom-52 sm:bottom-40 md:bottom-10  right-0  */}
						<div className="product-info absolute bottom-52 sm:top-40 md:top-52 lg:top-72 xl:top-48 2xl:top-64 right-0 
										h-300px w-1/3 xl:w-1/5 flex flex-col justify-end 
										border border-green-1000 rounded-br-full 
										bg-orange group-hover:opacity-50 group-hover:bg-opacity-50 transition duration-150 delay-200 
										text-sm sm:text-base
										">
							<div className="transition duration-150 delay-200 group-hover:text-yellow-300 product-en-title mt-3 pl-2 Georgia font-extralight italic text-base 
											text-orange font-minor"> another title </div>

							<div className=" border-gray-100 p-2 "> 
								<h2 className="transition delay-200 group-hover:text-yellow-300 product-title font-medium text-orange font-serif-ch">
									{ product.name ? product.name : '' }
								</h2>
							</div>
							<div className="p-2 font-serif-ch text-orange group-hover:text-yellow-300">
								<Price salesPrice={product?.salePrice} regularPrice={product?.regularPrice}/>
							</div>

							<div className="visible md:invisible transition duration-150 delay-200 group-hover:text-yellow-300 self-end mx-4 view-item-btn text-orange text-base font-minor font-semibold capitalize underline">
								View Item
							</div> 
						</div>
					</a>
					</Link>

				</div>


			</div>
		) : (
			''
		)
	);
};

export default Product;
