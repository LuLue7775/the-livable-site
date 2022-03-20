import useScreenSize from '../../utils/useScreenSize';
import { useEffect, useState, useRef, useContext } from 'react';
import Image from 'next/image';

import { HomeOpeningContext } from '../context/AppContext';


export default function VertTop1 () {
	
	const screenSize = useScreenSize();

	const vertTopRef1 = useRef(null);
	const vertTopRef2 = useRef(null);
    const withusRef = useRef(null);

	const vertTop2 = useRef([]);
    const addToVertTop2 = (el) => {
        if( el && !vertTop2.current.includes(el) ) {
            vertTop2.current.push(el);
        }
    }

	const vertBG = useRef(null);

	function VScroll(){

		let vertTopTl = gsap.timeline({ 
			paused:true 
		});
		vertTopTl.to(vertTopRef1.current, {
			y:`-=${screenSize.height}`, 
			opacity:0, 
			scrollTrigger: { trigger: ".vertTop1", scrub: 1, start: `center-=200 top`, immediateRender: false }
		});

		let vertTopTl2 = gsap.timeline({ 
			scrollTrigger: {
				trigger:  vertTopRef1.current, scrub: 1, 
				start: `top-=300 top`, end: "+=200%", immediateRender: false, id:`vertTop2`,
			} 
		});
		vertTop2.current.forEach( (el) => {
				vertTopTl2.set( [...el.children], { y:"200%", autoAlpha:0 }, 0);
				vertTopTl2.to( [...el.children],  {
					y:"0%", autoAlpha:1, ease:'power3', stagger: { each: 0.02, ease: "power2.inOut", }
				}, 0.01 );
		});


		gsap.to(withusRef.current, {
			y:"-=100",
			autoAlpha:0,
			scrollTrigger: {
				trigger:  withusRef.current, scrub: 1, 
				start: `top-=300 top`, end: "+=200%", immediateRender: false,
			} 
		},3.5)
		
	// brightness effect background under title. 
		let vertTl = gsap.timeline({ 
			paused:true,
			scrollTrigger: { trigger:  vertBG.current, start: `top bottom`, immediateRender: false, scrub: 1, } 
		});

		vertTl.fromTo( vertBG.current ,{ background:' #ecb886', filter:'brightness(100%)'
			}, { ease: 'none', backgroundColor:'#473c08', filter:'brightness(30%)',
		}, 0);

	};



    useEffect(()=> {
		gsap.registerPlugin(ScrollTrigger);
		
		VScroll();
    },[]);


	const [ isHomeLoaded, setHomeLoaded ] = useContext( HomeOpeningContext );

    return (
    <div className={`vert-sects-t relative`}>
		
		<div ref={vertBG}  className="absolute top-0 w-reset-screen h-300vh opacity-100 z-0 ">  
			<Image className="object-cover" src='/vert_land.png' alt="background" layout="fill"  
				onLoad={() => setHomeLoaded(true)}
			/>
		</div>
		

        <section ref={vertTopRef1} className="vertTop1 relative top-1/2 h-screen font-body italic text-lg text-center flex flex-col place-content-center items-center z-10">
			<div className="flex flex-col whitespace-nowrap"> In the beginning, there was nothing. </div>
			<div className="flex flex-col whitespace-nowrap"> An ore with endless possibilities inside. </div>
			<div className="flex flex-col whitespace-nowrap"> Your feeling - the eagerness.<br/>Your being - the force.<br/> </div>
			<div className="flex flex-col whitespace-nowrap"> Would you grab the tools with your hands? </div> 
        </section>

        <section ref={vertTopRef2} className="vertTop2 grid grid-rows-2 gap-0 h-screen font-culture text-5xl md:text-8xl relative justify-items-center text-white ">
            <div className=" grid grid-rows-3 h-1/2 w-screen">
                <div></div>
                <div ref={addToVertTop2} className="flex overflow-hidden relative justify-center text-center justify-between"> <p>T</p> <p>O</p> </div>
                <div ref={addToVertTop2} className="flex overflow-hidden relative justify-center text-center justify-between"> <p>B</p><p>U</p><p>I</p><p>L</p><p>D</p> </div>
            </div>
            <div className=" grid grid-rows-3 h-1/2 w-screen">
                <div ref={addToVertTop2} className="flex overflow-hidden relative justify-center text-center justify-between"> <p>Y</p><p>O</p><p>U</p><p>R</p> </div>
                <div ref={addToVertTop2} className="flex overflow-hidden relative justify-center text-center justify-between"> <p>L</p><p>A</p><p>N</p><p>D</p><p>S</p><p>C</p><p>A</p><p>P</p><p>E</p> </div>
                <div></div>
            </div>
        </section>
        <section className="vertTop3 relative h-screen">
            <div ref={withusRef} className="absolute w-screen h-screen flex items-center justify-center font-body text-2xl md:text-6xl text-white z-0"> with us</div>
		</section>
	</div>

    )
}