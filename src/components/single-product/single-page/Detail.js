const Detail = ( {product} ) => {
    return (
    <div className="font-serif-ch font-semibold "> 
        <div className="product-info "> 
            Short desc and detail
            <div
                dangerouslySetInnerHTML={ {
                    __html: product.description,
                } }
                className="product-description text-sm font-light"
            />
        </div> 
        <label className="border-b border-single-product"> Care Instruction </label>
        <p className="text-sm font-light"> {product?.attributes?.nodes?.[2]?.options?.[0]} </p>      
        <label className="border-b border-single-product"> Warranty </label>
        <p className="text-sm font-light"> {product?.attributes?.nodes?.[3]?.options?.[0]} </p>      
        <label className="border-b border-single-product"> Packaging </label>
        <p className="text-sm font-light"> {product?.attributes?.nodes?.[4]?.options?.[0]} </p>         
        <label className="border-b border-single-product"> Shipping Detail </label>
        <p className="text-sm font-light"> {product?.attributes?.nodes?.[5]?.options?.[0]} </p>           
        <label className="border-b border-single-product"> Note </label>
        <p className="text-sm font-light"> {product?.attributes?.nodes?.[6]?.options?.[0]} </p>      
    </div>
    )
}
export default Detail;