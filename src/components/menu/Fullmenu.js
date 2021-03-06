import Link from "next/link";
import CartIcon from "../cart/CartIcon";
import { useRef, useEffect, useContext, Fragment } from 'react';
import { MenuContext } from '../context/AppContext';
import ContactAndAccount from "./ContactAndAccount";
import { MobileDeviceContext } from "../context/AppContext";

const Fullmenu = ({ layoutRef }) => {    
    const [ isMenuVisible, setMenuVisibility ] = useContext( MenuContext );

	const isMobileDevice = useContext( MobileDeviceContext ) ;

    const handleCatClicked = () => {
        gsap.to( layoutRef.current, { 
            autoAlpha:0, ease:"power4", duration:0.8, 
            onComplete: () => setMenuVisibility(false)
        } ) 
    };

    const menuRef = useRef(null);

    useEffect(()=> {
		// if( isMobileDevice === false ) {
			menuRef.current.addEventListener('click', handleCatClicked );
        // } else {
        //     menuRef.current.addEventListener('touchend', handleCatClicked );
        // }

    },[]);


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
         if ( isMobileDevice === false && isMenuVisible ) {
            catsRefs.current.forEach( (category, i) => {
                gsap.from( category, {
                    y: "+=100",
                    duration:1,
                    ease:"power2",
                    stagger: () => `${i*0.2}`
    
                });
            });
         }
     }, [isMenuVisible]);

/**
 * SUBCATS REF
 */
    const CatText = [ 'Shop', 'Workshops', 'Journal', 'About' ];
    const CatLinkArr = [ '/category/shop', '/category/workshops', '/journal', '/about'];
    const CatArr = []
    for( let i = 0; i<4; i++ ) {
        CatArr.push(
            <Fragment key={i} >
                <div className="overflow-hidden w-screen ">
                    <li ref={addCatsToRefs} className="relative flex items-center font-culture font-bold px-2 md:px-20 m-2">
                        <Link href={CatLinkArr[i]}>
                            <a onClick={ handleCatClicked } className="menu-cat inline-block text-xl sm:text-5xl xl:text-6xl text-green-1000 group" >
                                {CatText[i]}
                                <span className="menu-num-stroke sm:group-hover:text-fill-red-300 absolute sm:text-3xl text-7xl text-transparent ">0{1+i}</span>
                            </a>
                        </Link>
                    </li>
                </div>
            </Fragment>
        )
    }
    return ( 
        
        <div ref={menuRef} >
            <div className={`${isMenuVisible ? " " : 'hidden'} w-screen h-screen absolute top-0 left-0 z-0 bg-indigo-100 opacity-60`}/>
            <div className={`${isMenuVisible ? " " : 'hidden'} w-screen h-screen absolute top-0 left-0`}>
                {/* <div className="vertical-slogan inline absolute right-1/2 top-0 w-full h-4 font-serif text-lg italic opacity-80 text-green-1000">
                    A place your spiritual mind resides.
                </div> */}
                <ul className=" grid grid-rows-6 h-full justify-start items-center content-center ">
                        <div></div>
                        {CatArr}
                        <div></div>
                </ul>
                <ul className="contact text-sm sm:pt-12 md:absolute md:right-0 md:top-4 px-20 xl:pl-5 md:pr-20 text-green-1000 ">
                    <ContactAndAccount/>
                </ul>
                <CartIcon/> 
            </div>
        </div>
    );
};

export default Fullmenu;
