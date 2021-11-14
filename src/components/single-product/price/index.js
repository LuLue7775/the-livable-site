import {isEmpty} from "lodash";

const Price = ({ regularPrice = 0, salesPrice }) => {
    

    // if ( isEmpty( salesPrice ) ) {
    // 	return null;
    // }
    

    /**
     * Get discount percent.
     *
     * @param {String} regularPrice
     * @param {String} salesPrice
     */
    const discountPercent = ( regularPrice, salesPrice ) => {

        if( isEmpty( regularPrice ) || isEmpty(salesPrice) ) {
            return null;
        }

        const formattedRegularPrice = parseInt( regularPrice?.substring(3) );
        const formattedSalesPrice = parseInt( salesPrice?.substring(3) );
        const discountPercent = ( ( formattedRegularPrice - formattedSalesPrice ) / formattedRegularPrice ) * 100;

        return {
            discountPercent: formattedSalesPrice !== formattedRegularPrice ? `(${discountPercent.toFixed(2)}%) OFF` : null,
            strikeThroughClass: formattedSalesPrice < formattedRegularPrice ? 'product-regular-price mr-2 line-through text-sm text-gray-600 font-normal' : ''
        }
    }

    const productMeta = discountPercent( regularPrice, salesPrice );
    

    return (
        <h6 className="product-price font-serif text-sm md:text-base font-semibold mr-3 mb-5 ">
            {/* Regular price */}
            <span className={productMeta?.strikeThroughClass}>{ regularPrice }</span>
            
            {/* Discounted price */}
            { productMeta?.discountPercent ? <span className="product-price mr-2">{ salesPrice }</span> : null }

            {/* Discount percent */}
            <span className="product-discount text-green-600 fontBold text-sm fontNormal">{productMeta?.discountPercent}</span>
        </h6>
    )
}

export default Price
