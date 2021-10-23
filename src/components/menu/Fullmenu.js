import Link from "next/link";
import CartIcon from "../cart/CartIcon";
import { useState, useRef, useEffect, useContext, Fragment } from "react";
import SubCategories from "./SubCategories";
import { MenuContext } from '../context/AppContext';
import ContactAndAccount from "./ContactAndAccount";

const Fullmenu = ( props ) => {
    const { menu } = props || {};
    
    const [ whichSubCatToggled, setSubCatToggled]  = useState(null);
    const [ isMenuVisible, setMenuVisibility ] = useContext( MenuContext );

    const handleCatClicked = () => {
        setMenuVisibility(!isMenuVisible);   
    };

/**
 * PAGE REVEAL EFFECT
 */
     const catsRefs = useRef([]);
     const addCatsToRefs = (el) => {
         if ( el && !catsRefs.current.includes(el) ) {
            catsRefs.current.push(el);
         }
     };

     useEffect( () => {
        catsRefs.current.forEach( (category, i) => {
            gsap.from( category, {
                y: () => `${-window.innerHeight}`,
                duration:1,
                ease:"power2",
                stagger: () => `${i*0.2}`

            });
        });
     }, []);

/**
 * SUBCATS REF
 */
     const subcatRefs = useRef([]);
     const addSubcatsToRefs = (el) => {
         if ( el && !subcatRefs.current.includes(el) ) {
             subcatRefs.current.push(el);
         }
     };

    const CatText = [ 'Shop', 'Workshops', 'Journal', 'About' ];
    const CatLinkArr = [ '/category/shop', '/category/workshops', '/journal', '/about'];
    const CatArr = []
    for( let i = 0; i<4; i++ ) {
        CatArr.push(
            <Fragment key={i} >
                <div className="overflow-hidden">
                    <li ref={addCatsToRefs} className="relative flex items-center font-serif font-bold px-2 md:px-20 md:py-4 m-2">
                        <Link href={CatLinkArr[i]}>
                            <a onClick={ handleCatClicked } className="menu-cat inline-block text-xl sm:text-5xl xl:text-6xl text-green-1000" >
                                {CatText[i]}
                            </a>
                        </Link>
                        <a onClick={ ()  => { i === whichSubCatToggled ? setSubCatToggled(null) : setSubCatToggled(i) } } 
                            className="menu-num-btn absolute z-50 left-3/5 sm:left-1/2 xl:left-1/3 cursor-pointer block max-h-160px group">
                            <span className="menu-num-stroke text-7xl sm:text-8xl xl:text-9xl text-transparent sm:group-hover:text-fill-red-300">0{1+i}</span>
                        </a>
                    </li>
                </div>

                { i!==3 && <div ref={addSubcatsToRefs} className="hidden sm:block menu-subcats"> 
                    { i === whichSubCatToggled ? <SubCategories menu={menu} whichSubCatToggled={whichSubCatToggled}/> : ''}
                </div>}
            </Fragment>
        )
    }
    return (
        <>
            <div className={`${isMenuVisible ? " " : 'hidden'} w-screen h-screen absolute top-0 left-0 z-0 bg-indigo-100 opacity-60`}/>
            <div className="w-screen absolute top-0 left-0 ">
                <div className="vertical-slogan inline absolute right-1/2 top-0 w-full h-4 font-serif text-lg italic opacity-80 text-green-1000">
                    A place your spiritual mind resides.
                </div>
                <ul className=" flex flex-col pl-8 pt-20 sm:pt-32 pb-2 md:py-32 md:mt-10 md:mr-16 justify-center ">
                    {CatArr}
                </ul>
                <ul className="contact text-sm sm:pt-12 md:absolute md:right-0 md:top-4 px-20 xl:pl-5 md:pr-20">
                    <ContactAndAccount/>
                </ul>
                <CartIcon/> 
            </div>
        </>
    );
};

export default Fullmenu;
