import GalleryCarousel from "../gallery-carousel";
import { isEmpty } from 'lodash';
const ImageSection = ({product}) => {
    return (
    <div className="product-images z-10">         
        { !isEmpty( product?.galleryImages?.nodes ) ? (
            <GalleryCarousel gallery={product?.galleryImages?.nodes}/>
        ) : !isEmpty( product.image ) ? (
            <img 
                className="mobile-screen-100vh absolute object-cover md:w-1/2 lg:fixed "
                src={ product?.image?.sourceUrl }
                alt="Product Image"
                srcSet={ product?.image?.srcSet }
            /> 

        ) : null }
        <div className="absolute md:fixed md:w-1/2 bottom-12 left-10 md:bottom-24 md:left-10 border-l p-5 opacity-85">
            <p className="font-body text-base italic p-1 text-white" > short description or name in en</p>
            <h1 className="font-serif-ch text-lg md:text-xl lg:text-xl uppercase break-normal p-1 text-white">{ product.name }</h1>
        </div>
    </div>

    )
}
export default ImageSection;