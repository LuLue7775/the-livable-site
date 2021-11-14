
import { useState } from 'react';
import Price from "../price";
import AddToCartButton from "../../cart/AddToCartButton";
import Detail from "./Detail";
import SeeWorkshop from "./SeeWorkshop";
import OpenTag from "../../svg-icons/OpenTag";
import HideTag from "../../svg-icons/HideTag";
import VariationSelector from '../../svg-icons/VariationSelector';
import AddProduct from "../../svg-icons/AddProduct";
import DeductProduct from "../../svg-icons/DeductProduct";
import { isEmpty } from 'lodash';

const MainDetail = ({product}) => {

    const [ ProductQty, setProductQty ] = useState(1);
    const [ variationPicked, setVariationPicked ] = useState(0);
    const [ showDetail, setShowDetail ] = useState(false);

    const handleShowDetailClick = async () => {
        await setShowDetail(!showDetail);
    };
    const handleDeductClicked = () => {
        if ( ProductQty > 1 ) {setProductQty( prevState => prevState - 1)} 
    };
    const handleAddClicked = () => {
        setProductQty( prevState => prevState + 1)
    };

    return (
        <div className="grid grid-cols-1 mx-6 px-4 md:mx-12 xl:px-20 pt-3 gap-4 text-center">
            <label className="font-serif-ch border p-2  border-orange font-semibold"> Short Poetic Intro </label>
            <p className="font-serif-ch text-sm whitespace-pre-wrap">  {product?.shortDescription} </p>

            <label className="font-serif-ch border p-2 border-orange font-semibold"> Dimension and material </label>
            {product?.attributes?.nodes?.[0]?.options?.map( (opt, i) => <p key={i} className="font-serif-ch text-sm"> { opt } - and some words </p> )}

            <label className="font-serif-ch border p-2 border-orange font-semibold text-green-1000"> Variations </label>
            <div className="flex flex-wrap justify-center items-baseline">
                {product?.attributes?.nodes?.[0]?.options?.map( (opt, i) => 
                    <button id={i} key={i} name={opt} onClick={ () => setVariationPicked(i)} className={`${ i !== variationPicked && 'text-gray-500'} font-serif-ch text-sm m-4 ` }>  
                        {opt} 
                        { i === variationPicked &&　<VariationSelector/>} 
                    </button> )} 
            </div>

            
            <label className="font-serif-ch border p-2 border-orange font-semibold"> Price </label>
            <div className="text-green-1000">
            { "VariableProduct" === product.__typename 
            ? <Price salesPrice={product?.salePrice} regularPrice={product?.variations?.nodes?.[variationPicked]?.regularPrice}/>
            : <Price salesPrice={product?.salePrice} regularPrice={product?.regularPrice}/>
            } 
            </div>
            
            <label className="font-serif-ch border p-2 border-orange font-semibold"> Quantity </label>
            <div className="font-serif-ch pb-4 flex justify-center">
                <button onClick={ handleDeductClicked } className="px-4 cursor-pointer"> <DeductProduct mode={'dark'}/> </button>
                    <div className="px-6 text-green-1000"> {ProductQty} pcs </div>
                <button onClick={ handleAddClicked } className="px-4 cursor-pointer"> <AddProduct mode={'dark'}/> </button>
            </div>

            <label className="font-serif-ch border p-2 border-orange font-semibold"> Get one or Make one </label>
            {"VariableProduct" === product.__typename 
            ? <AddToCartButton product={ product?.variations?.nodes?.[variationPicked] } qty={ProductQty} />
            : <AddToCartButton product={ product } qty={ProductQty} />
            }
            

            { !isEmpty( product?.upsell?.nodes )  && <SeeWorkshop product={product}/> }

            <button onClick={ handleShowDetailClick } className=" bg-transparent font-serif-ch border p-2 border-orange 
                    font-semibold hover:text-orange-500 focus:outline-none text-center cursor-pointer flex justify-center" >
                Detail
                <div className="px-4"> {showDetail ?  <OpenTag/> : <HideTag/> } </div>

            </button>                           
            { showDetail &&  <Detail product={product} /> }

        </div>
    )
}
export default MainDetail; 

  

  