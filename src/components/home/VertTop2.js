
import useScreenSize from '../../utils/useScreenSize';
import { useEffect, useState, useRef } from 'react';

export default function VertTop2 () {

	const vertBotRef1 = useRef(null);
	const vertBotRef2 = useRef(null);
	const vertBotRef3 = useRef(null);
    const curveTxtRef1 = useRef(null);
	const curveTxtRef2 = useRef(null);
	const curveTxtRef3 = useRef(null);
	const sectorRef1 = useRef(null);
	const sectorRef2 = useRef(null);
	const sectorRef3 = useRef(null);

	const verBotTxt1 = useRef([]);
	const addToVerBotTxt1 = (el) => {
        if( el && !verBotTxt1.current.includes(el) ) {
            verBotTxt1.current.push(el);
        }
    }
	const verBotTxt2 = useRef([]);
	const addToVerBotTxt2 = (el) => {
        if( el && !verBotTxt2.current.includes(el) ) {
            verBotTxt2.current.push(el);
        }
    }
	const verBotTxt3 = useRef([]);
	const addToVerBotTxt3 = (el) => {
        if( el && !verBotTxt3.current.includes(el) ) {
            verBotTxt3.current.push(el);
        }
    }

    const VScroll2 = () => {
        let curveTl1 = gsap.timeline({ 
			scrollTrigger:{
				trigger: vertBotRef1.current,
				start:"top-=250 top",
				end:"bottom top",
				once: true,
				onUpdate: ({progress}) => curveTl1.progress() < progress ? curveTl1.progress(progress) : gsap.killTweensOf(curveTl1)
			}
		});
		curveTl1.fromTo(curveTxtRef1.current, {
			attr: { startOffset: "0%" },
			duration:0.8,
			autoAlpha:0
		  }, {
			  autoAlpha:1,
			attr: { startOffset: "5%", textLength: "100%" },
		  }, 0 );
		curveTl1.to(sectorRef1.current, {
			ease:'power4.inOut',
			duration:0.9,
			scrub:1.3, 
			attr: { cx: 0, cy: 0, r: 250 }

		}, 0);
		verBotTxt1.current.forEach( (el) => {
			curveTl1.from( el, {
				y : '200%',
				duration:0.5,
				ease:'power4.inOut',
				scrub:1, 
			}, 0)
		});

		let curveTl2 = gsap.timeline({ 
			scrollTrigger:{
				trigger:  vertBotRef2.current,
				start:"top-=250 top",
				end:"bottom top",
				once: true,
				onUpdate: ({progress}) => curveTl2.progress() < progress ? curveTl2.progress(progress) : gsap.killTweensOf(curveTl2)
			}
		});
		curveTl2.fromTo(curveTxtRef2.current, {
			attr: { startOffset: "0%" },
			duration:0.8,
			autoAlpha:0
		  }, {
			  autoAlpha:1,
			attr: { startOffset: "5%", textLength: "100%" },
		}, 0);
		curveTl2.to(sectorRef2.current,{
			ease:'power4.inOut',
			duration:0.9,
			scrub:1.3, 
			attr: { cx: 0, cy: 0, r: 250 }

		},0);
		verBotTxt2.current.forEach( (el) => {
			curveTl2.from( el, {
				y : '200%',
				duration:0.5,
				ease:'power4.inOut',
				scrub:1, 
			}, 0)
		});



		let curveTl3 = gsap.timeline({ 
			scrollTrigger:{
				trigger:  vertBotRef3.current,
				start:"top-=250 top",
				end:"bottom top",
				once: true,
				onUpdate: ({progress}) => curveTl3.progress() < progress ? curveTl3.progress(progress) : gsap.killTweensOf(curveTl3)
			}
		});
		curveTl3.fromTo(curveTxtRef3.current, {
			attr: { startOffset: "0%" },
			duration:0.8,
			autoAlpha:0
		  }, {
			  autoAlpha:1,
			attr: { startOffset: "2%", textLength: "130%" },
		}, 0);
		curveTl3.to(sectorRef3.current,{
			ease:'power4.inOut',
			duration:0.9,
			scrub:1.3, 
			attr: { cx: 0, cy: 0, r: 250 }
		}, 0);
		verBotTxt3.current.forEach( (el) => {
			curveTl3.from( el, {
				y : '200%',
				duration:0.5,
				ease:'power4.inOut',
				scrub:1, 
			}, 0)
		});

    };


    useEffect(()=> {
		gsap.registerPlugin(ScrollTrigger);

        VScroll2();

    },[]);



    return (
            <div className="vert-sects-b overflow-hidden z-20"> 
                <section ref={vertBotRef1} className="vertBottom1 relative h-screen flex flex-col items-center justify-center "> 
                    <div className="font-body text-lg font-thin">
                        <button className="opacity-90 hover:opacity-60 overflow-hidden flex items-center justify-center"> 
                            <div ref={addToVerBotTxt1} className="absolute w-300px h-300px flex flex-col justify-end pb-6 pr-6 z-10 overflow-hidden">
                                <p className="flex self-end text-right text-xl font-semibold font-serif ">MATERIAL </p>
                                <p className="flex self-end text-right font-minor text-lg italic opacity-60"> click to discover</p>
                            </div>
                            <svg width="350" height="350" viewBox="0 0 350 350" >
                                <g transform="translate(410,410)" stroke="#fff" strokeWidth="1" >
                                    <circle ref={sectorRef1} id="circle1" cx="0" cy="0" r="0" fill="#fff" />
                                </g>
                                <g transform="translate(360,360)" stroke="#fff" strokeWidth="1">
                                    <path id="curve-l" d="M0 0 m-320 0 A320-320 0 0 1 0-320" fill="transparent" stroke="transparent"/>             
                                    <text width="100"  > 
                                        <textPath ref={curveTxtRef1} href="#curve-l" textLength="0%" startOffset="0%">
                                            WE UNLIMITEN 
                                        </textPath>     
                                    </text>               
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div ref={addToVerBotTxt1} className="border-double border-t border-b-4 mt-4 py-4 font-serif text-base md:text-xl text-white overflow-hidden">
                        Material is all about the origin
                    </div>
                </section>
                <section ref={vertBotRef2} className="vertBottom2 relative h-screen flex flex-col items-center justify-center"> 
                    <div className="font-body text-lg font-thin">
                        <button className="opacity-90 hover:opacity-60 overflow-hidden flex items-center justify-center"> 
                            <div ref={addToVerBotTxt2} className="absolute w-300px h-300px flex flex-col justify-end pb-6 pr-6 z-10 overflow-hidden">
                                <p className="flex self-end text-right text-xl font-semibold font-serif ">PROCESS </p>
                                <p className="flex self-end text-right font-minor text-lg italic opacity-60"> click to discover</p>
                            </div>

                            <svg width="350" height="350" viewBox="0 0 350 350" >
                                <g transform="translate(410,410)" stroke="#fff" strokeWidth="1" >
                                    <circle ref={sectorRef2} id="circle2" cx="0" cy="0" r="0" fill="#fff" />
                                </g>
                                <g transform="translate(360,360)" stroke="#fff" strokeWidth="1">
                                    <path id="curve-l" d="M0 0 m-320 0 A320-320 0 0 1 0-320" fill="transparent" stroke="transparent"/>             
                                    <text width="100"  > 
                                        <textPath ref={curveTxtRef2} href="#curve-l" textLength="0%" startOffset="0%">
                                            WE FORAGE
                                        </textPath>     
                                    </text>               
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div ref={addToVerBotTxt2} className="border-double border-t border-b-4 mt-4 py-4 font-serif text-base md:text-xl text-white overflow-hidden">
                        Process is the equation of materiality
                    </div>
                </section>
                <section ref={vertBotRef3} className="vertBottom3 relative h-screen flex flex-col items-center justify-center"> 
                    <div className="font-body text-lg font-thin">
                        <button className="opacity-90 hover:opacity-60 overflow-hidden flex items-center justify-center"> 
                            <div ref={addToVerBotTxt3} className="absolute w-300px h-300px flex flex-col justify-end pb-6 pr-6 z-10 overflow-hidden">
                                <p className="flex self-end text-right text-xl font-semibold font-serif ">TECHNIQUE </p>
                                <p className="flex self-end text-right font-minor text-lg italic opacity-60"> click to discover</p>
                            </div>
                            <svg width="350" height="350" viewBox="0 0 350 350" >
                                <g transform="translate(410,410)" stroke="#fff" strokeWidth="1" >
                                    <circle ref={sectorRef3} id="circle3" cx="0" cy="0" r="0" fill="#fff" />
                                </g>
                                <g transform="translate(360,360)" stroke="#fff" strokeWidth="1">
                                    <path id="curve-l" d="M0 0 m-320 0 A320-320 0 0 1 0-320" fill="transparent" stroke="transparent"/>             
                                    <text width="100"  > 
                                        <textPath ref={curveTxtRef3} href="#curve-l" textLength="0%" startOffset="0%">
                                            WE MAKE ANYWHERE THE LIVABLE PLACE 
                                        </textPath>     
                                    </text>               
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div ref={addToVerBotTxt3} className="border-double border-t border-b-4 mt-4 py-4 font-serif text-base md:text-xl text-white overflow-hidden">
                        Techniques provides different ways of seeing
                    </div>
                </section>
            </div>


    )
}