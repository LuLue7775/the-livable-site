import Link from 'next/link';
import React, { useRef, useContext } from 'react';
import Fullmenu from './menu/Fullmenu';
import { MenuContext } from './context/AppContext';
import Logo from './svg-icons/Logo';

const Header = ( ) => {

    const [ isMenuVisible, setMenuVisibility ] = useContext( MenuContext );
	
/**
 * PAGE REVEAL EFFECT
 */
	 const layoutRef = useRef(null);
	 
	 const handleMenuClicked = () => {
		 if( !isMenuVisible ) {
			 gsap.to( layoutRef.current, { autoAlpha:1, ease:"power4", duration:0.8, })
			setMenuVisibility(true)
		} 
		else {
			gsap.to( layoutRef.current, { 
				autoAlpha:0, ease:"power4", duration:0.8, 
				onComplete: () => setMenuVisibility(false)
			} )

		}
	}
 
	// const handlers = useSwipeable({ onTap: () =>  {setMenuVisibility(!isMenuVisible); handleMenuClicked()}  })

	return (
		<div className="fixed top-0 left-0 right-0 z-0">
			<div className="flex justify-between mx-auto "> 

				<div className="flex items-center flex-shrink-0 text-black mt-10 ml-10 z-10">
					<Link href="/">
						<a> <Logo/> </a>
					</Link>
				</div>
				
				<nav className={`p-4 mr-5 mt-5 xl:ml-5 xl:mb-5 xl:fixed xl:bottom-0 ${isMenuVisible ? "z-50" : "z-20"}`}>
				{/*Menu button*/}
						<a  onClick={ handleMenuClicked } className="nav__btn block relative items-center text-center group">
							<span className="nav__btn__dashes relative flex items-center ">
								<span className={`${isMenuVisible ? "transform translate-x-2 " : ""} menu-btn-color absolute top-1/3 w-full border-t group-hover:border-red-400 transition delay-100 duration-150`}></span>
								<span className={` menu-btn-color absolute top-1/2 w-full border-t group-hover:border-red-400 transition delay-100 duration-150`}></span>
								<span className={`${isMenuVisible ? "transform translate-x-2 " : ""} menu-btn-color absolute top-1/6 w-full border-t group-hover:border-red-400 transition delay-100 duration-150`}></span>
							</span>
							<span className={`menu-btn-color absolute top-1/6 left-0 right-0 text-sm font-light italic hover:underline group-hover:text-red-400`}>menu</span>
						</a>
				</nav>	

				{/*Menu UI shows when button clicked*/}
				<div ref={layoutRef} className="absolute z-40">
					{/* { isMenuVisible && <Fullmenu /> } */}
					<Fullmenu layoutRef={layoutRef}/>
				</div>

			</div>
		</div>
		
	)
};

export default Header;
