import useScreenSize from '../../utils/useScreenSize';
import { useEffect, useState, useRef } from 'react';

export default function VertTop1 () {
	const screenSize = useScreenSize();

	const vertTopRef1 = useRef(null);
	const vertTopRef2 = useRef(null);
    const withusRef = useRef(null);

    const vertTop1 = useRef([]);
    const addToVertTop1 = (el) => {
        if( el && !vertTop1.current.includes(el) ) {
            vertTop1.current.push(el);
        }
    }
	const vertTop2 = useRef([]);
    const addToVertTop2 = (el) => {
        if( el && !vertTop2.current.includes(el) ) {
            vertTop2.current.push(el);
        }
    }
	const vertTop2Cut = useRef([]);
    const addToVertTop2Cut = (el) => {
        if( el && !vertTop2Cut.current.includes(el) ) {
            vertTop2Cut.current.push(el);
        }
    }

    const VScroll1 = () => {
        let vertTopTl = gsap.timeline({ 
			paused:true 
		});
		vertTop1.current.forEach( (el, i) => {
			vertTopTl.from(el,{
				y: `+=${screenSize.height}`,          
			})
			vertTopTl.to(el, {
				y:`-=${screenSize.height/2}`, 
				opacity:1, 
				ease: "power1",
				scrollTrigger: {
					trigger: ".vertTop1",
					pin: true,
					scrub: 1,
					start: `top+=${50*(i)} top`,
					end: "+=100%",
					immediateRender: false,
					id:`${i}`,
					// autoRefreshEvents: "DOMContentLoaded,load,resize",
				}
			});
		});

		let vertTopTl2 = gsap.timeline({ 
			// paused:true,
			scrollTrigger: {
				trigger:  vertTopRef2.current,
				pin: true,
				scrub: 1,
				start: `top top`,
				end: "+=200%",
				immediateRender: false,
				id:`vertTop2`,
				// autoRefreshEvents: "DOMContentLoaded,load,resize",
			} 
		});
		vertTop2.current.forEach( (el) => {
				vertTopTl2.set( [...el.children], {
					y:"200%",
					autoAlpha:0
				}, 0);
				vertTopTl2.to( [...el.children],  {
					y:"0%",
					autoAlpha:1,
					ease:'power3',
					stagger: { each: 0.02, ease: "power2.inOut", }
				}, 0.01 );

		});
		vertTopTl2.to(vertTop2Cut.current[0], {
			duration:1.5,
			ease: "expo.inOut",
			transformOrigin: "top",
			// height:0
			scaleY:0
		},2)
		vertTopTl2.to(vertTop2Cut.current[1], {
			duration:1.5,
			ease: "expo.inOut",
			transformOrigin: "bottom",
			// height:0
			scaleY:0
		},2)
		vertTopTl2.to([...withusRef.current.children], {
			y:"-200%",
			autoAlpha:0,
			stagger: { each: 0.01, ease: "power2.inOut", from:"random"}

		},3.5)
    };

    useEffect(()=> {
		gsap.registerPlugin(ScrollTrigger);

        VScroll1();

    },[]);



    return (
    <div className="vert-sects-t">
        <section ref={vertTopRef1} className="vertTop1 relative h-screen font-body italic text-lg ">
            <div ref={addToVertTop1} className="absolute left-6 md:right-1/2 top-4 whitespace-nowrap "> In the beginning, there was nothing. </div>
            <div ref={addToVertTop1} className="absolute left-6 md:right-1/2 top-12 whitespace-nowrap"> An ore with endless possibilities inside. </div>
            <div ref={addToVertTop1} className="absolute left-6 md:right-1/2 top-20 whitespace-nowrap"> Your feeling - the eagerness.<br/>Your being - the force.<br/> </div>
            <div ref={addToVertTop1} className="absolute left-6 md:right-1/2 top-36 whitespace-nowrap"> Would you grab the tools with your hands? </div> 
        </section>
        <section ref={vertTopRef2} className="vertTop2 grid grid-rows-2 gap-0 h-screen font-serif text-5xl md:text-8xl relative justify-items-center text-white">
            <div ref={addToVertTop2Cut} className="bg-cut grid grid-rows-3 h-1/2 w-screen z-10">
                <div></div>
                <div ref={addToVertTop2} className="flex overflow-hidden relative justify-center text-center"> <p>T</p> <p>O</p> </div>
                <div ref={addToVertTop2} className="flex overflow-hidden relative justify-center text-center"> <p>B</p><p>U</p><p>I</p><p>L</p><p>D</p> </div>
            </div>
            <div ref={addToVertTop2Cut} className="bg-cut grid grid-rows-3 h-1/2 w-screen z-10">
                <div ref={addToVertTop2} className="flex overflow-hidden relative justify-center text-center"> <p>Y</p><p>O</p><p>U</p><p>R</p> </div>
                <div ref={addToVertTop2} className="flex overflow-hidden relative justify-center text-center"> <p>L</p><p>A</p><p>N</p><p>D</p><p>S</p><p>C</p><p>A</p><p>P</p><p>E</p> </div>
                <div></div>
            </div>
            <div ref={withusRef} className="absolute w-screen h-screen flex items-center justify-center font-body text-2xl md:text-6xl z-0"> <p>w</p><p>i</p><p>t</p><p>h</p><p>u</p><p>s</p> </div>
        </section>
        <section className="vertTop3 relative h-screen">3</section>
    </div>

    )
}