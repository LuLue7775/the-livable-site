import Link from 'next/link';
import Price from '../single-product/price';
import Image from "../../image";
import {DEFAULT_PRODUCT_HOME_IMG_URL} from "../../constants/urls";
import { isEmpty } from 'lodash';
import { useEffect, useRef } from 'react';

const Product = ( props ) => {
	const { categoryName, product } = props;

    const productsRefs = useRef([]);
    const addProductsToRef = (el) => {
        if ( el && !productsRefs.current.includes(el) ) {
            productsRefs.current.push(el);
        }
    };


	useEffect(()=> {
		gsap.registerPlugin(ScrollTrigger);

		productsRefs.current.forEach( ( product ) => {
			gsap.to( product,  {
				opacity:1,
				duration:0.1,
                ease:"power2",
				scrollTrigger: {
					trigger: product,
					start: "top center",
					end:"bottom+=200 bottom",
					scrub:1,
				}
			});
		});
	}, [productsRefs.current]);


	return (
		undefined !== product && 'GroupProduct' !== product.__typename ? (
			<div ref={addProductsToRef} className="product mb-10 m-auto ">
				<div className="relative h-700px w-screen md:w-450px">
				<Link href={ `/product/${ product?.slug }`} >
					<a className="group ">
						<div className="vertical-text transition duration-150 delay-200 group-hover:text-red-500 inline absolute w-full z-20 text-base italic text-green-1000 font-body">
						{categoryName}-{isEmpty(product?.productCategories?.nodes?.[0]?.children?.nodes) 
										? product?.productCategories?.nodes?.[0]?.name 
										: product?.productCategories?.nodes?.[1]?.name}
						</div>

						<Image
							className="object-cover bg-gray-100 sm:rounded-lg z-10 "
							width="420"
							height="420"
							loading="lazy"
							// placeholder="blur"
							sourceUrl={ product?.image?.sourceUrl ?? '' }
							defaultImgUrl={DEFAULT_PRODUCT_HOME_IMG_URL}
							altText={product?.image?.altText ?? product?.slug}
						/>

						<div className="product-info absolute top-0 right-0 h-600px w-400px flex flex-col justify-end border border-green-1000 rounded-br-full bg-green-100 group-hover:opacity-50 group-hover:bg-opacity-50 transition duration-150 delay-200 bg-opacity-25 ">
							<div className="transition duration-150 delay-200 group-hover:text-red-500 product-en-title mt-3 pl-2 Georgia font-extralight italic text-base text-green-1000 font-minor"> another title </div>
							<div className=" border-gray-100 p-2 "> 
								<h2 className="transition delay-200 group-hover:text-red-500 product-title font-medium text-green-1000 font-serif-ch">
									{ product.name ? product.name : '' }
								</h2>
							</div>
							<div className=" p-2 font-serif-ch">
								<Price salesPrice={product?.salePrice} regularPrice={product?.regularPrice}/>
							</div>

							<div className="transition duration-150 delay-200 group-hover:text-red-500 self-end mx-4 view-item-btn text-green-1000 text-base font-minor font-semibold capitalize underline">
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
