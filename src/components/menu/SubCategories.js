import { useEffect, useRef } from "react";
import Link from 'next/link';
import MenuDiagonal from "../svg-icons/MenuDiagonal";

const SubCategories = ( props )=> {
    
    const { menu, whichSubCatToggled } = props || {};

    const subcatRefs = useRef(null);

    useEffect( () => {
        if ( null !== whichSubCatToggled ) {
            gsap.fromTo( subcatRefs.current, {
                autoAlpha:0,

            },{
                autoAlpha:1,
                duration:1,
                delay:0.5,
                ease:"power2",
            });
        } 
     
    }, [whichSubCatToggled]);

    return (
        <div className="relative w-screen text-base lg:text-xl xl:text-2xl text-green-900 font-light font-serif">
            <div className="absolute top-sub-sm md:top-sub sm:right-1/7 lg:right-1/3 xl:right-1/2">
                <MenuDiagonal/>
            </div>

            <div ref={subcatRefs} className="opacity-0 relative top-0 left-3/5 sm:left-1/2 xl:left-1/3 text-xs md:text-base">
                { menu.length ? (     
                    whichSubCatToggled !== 2 ?    
                        menu[whichSubCatToggled]?.[0]?.children?.nodes?.map( ( title, index ) => <Link key={index} href={`/category/${menu[whichSubCatToggled]?.[0]?.slug}/${title?.slug}`} ><div  className="cursor-pointer "> {title.name} </div></Link> ) 
                        :
                        menu[2]?.[0]?.nodes?.map( ( title, index ) => 'Uncategorized' !== title.name &&  <Link key={index} href={`/journal/${title?.slug}`} ><div className="cursor-pointer"> {title.name} </div></Link>  )         
                ) : null } 
            </div>
        </div>
        

    )
};

export default SubCategories;