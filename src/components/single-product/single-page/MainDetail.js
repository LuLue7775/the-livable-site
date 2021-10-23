
import { useState } from "react";
import Price from "../price";
import AddToCartButton from "../../cart/AddToCartButton";
import Detail from "./Detail";
import SeeWorkshop from "./SeeWorkshop";
import OpenTag from "../../svg-icons/OpenTag";
import HideTag from "../../svg-icons/HideTag";
import AddProduct from "../../svg-icons/AddProduct";
import DeductProduct from "../../svg-icons/DeductProduct";
import { isEmpty } from 'lodash';

const MainDetail = ({product}) => {

    const [ BtnQty, setBtnQty ] = useState(1);
    const [ variationPicked, setVariationPicked ] = useState(0);
    const [ showDetail, setShowDetail ] = useState(false);

    const handleShowDetailClick = async () => {
        await setShowDetail(!showDetail);
    };
    const handleDeductClicked = () => {
        if ( BtnQty > 1 ) {setBtnQty( prevState => prevState - 1)} 
    };
    const handleAddClicked = () => {
        setBtnQty( prevState => prevState + 1)
    };

    return (
        <div className="grid grid-cols-1 mx-6 px-4 md:mx-12 xl:px-20 pt-3 gap-4 ">
            <label className="font-serif-ch border-b border-single-product font-semibold"> Short Poetic Intro </label>
            <p className="font-serif-ch text-sm whitespace-pre-wrap">  {product?.shortDescription} </p>

            <label className="font-serif-ch border-b border-single-product font-semibold"> Dimension and material </label>
            {product?.attributes?.nodes?.[0]?.options?.map( (opt, i) => <p key={i} className="font-serif-ch text-sm"> { opt } </p> )}

            <label className="font-serif-ch border-b border-single-product font-semibold text-green-1000"> Variations </label>
            <select onChange={ () => setVariationPicked( () => document.getElementById('select').selectedIndex )} id="select" className="font-serif-ch w-40 border rounded-lg"> 
                {product?.attributes?.nodes?.[0]?.options?.map( (opt, i) => <option key={i}> { opt } </option> )}
            </select>
            
            <label className="font-serif-ch border-b border-single-product font-semibold"> Price </label>
            { "VariableProduct" === product.__typename 
            ? <Price salesPrice={product?.salePrice} regularPrice={product?.variations?.nodes?.[variationPicked]?.regularPrice}/>
            : <Price salesPrice={product?.salePrice} regularPrice={product?.regularPrice}/>
            }
            
            <label className="font-serif-ch border-b border-single-product font-semibold"> Quantity </label>
            <div className="font-serif-ch product-add-minus-btn grid grid-cols-input justify-items-center">
                <button onClick={ handleDeductClicked } className="col-span-1 cursor-pointer"> <DeductProduct/> </button>
                <input 
                    className="col-span-2 border rounded-lg w-24"
                    type="number"
                    id="qty-input"
                    min="1"
                    value={BtnQty}
                    onChange={e => e.currentTarget.value }
                /> 
                <button onClick={ handleAddClicked } className="col-span-1 cursor-pointer"> <AddProduct/> </button>

            </div>

            {"VariableProduct" === product.__typename 
            ? <AddToCartButton product={ product?.variations?.nodes?.[variationPicked] } qty={BtnQty} />
            : <AddToCartButton product={ product } qty={BtnQty} />
            }
            

            { !isEmpty( product?.upsell?.nodes )  && <SeeWorkshop product={product}/> }

            <a onClick={ handleShowDetailClick } className=" bg-transparent font-serif-ch border-b border-single-product font-semibold hover:text-orange-500 text-left focus:outline-none" type="button">
                Detail
                <div className="absolute left-1/2"> 
                {showDetail ?  <OpenTag/> : <HideTag/> }

                </div>

            </a>                           
            { showDetail &&  <Detail product={product} /> }

        </div>
    )
}
export default MainDetail; 