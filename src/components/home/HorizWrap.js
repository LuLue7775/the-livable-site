
import useScreenSize from '../../utils/useScreenSize';
import { useEffect, useState, useRef, useContext } from 'react';
import LangingPageArrowDown from '../svg-icons/LandingpageArrowDown';
import LandingpageTitleLine from '../svg-icons/LandingpageTitleLine';
import { MobileDeviceContext } from '../context/AppContext';
import { useRouter } from "next/router";
import Image from 'next/image';
import GridLines from '../GridLines';
import Link from 'next/link';

export default function HorizWrap () {

    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

	const screenSize = useScreenSize();
    const isMobileDevice = useContext( MobileDeviceContext ) ;

	
    const horizScroller = useRef();

    useEffect(()=>{
        if (screenSize.width < 768) {
            horizScroller.current = screenSize.width*8;
        } else {
            horizScroller.current = screenSize.width*4;
        }
        
        return () => { if( isMobileDevice === false ){ router.reload(); } } // only reload when resizing on desktop
    }, [screenSize]);


    const horizPanel1Ref = useRef(null);
	const horizWrapperRef = useRef(null);
	const titleRef = useRef([]);
    const addToTitleRef = (el) => {
        if( el && !titleRef.current.includes(el) ) {
            titleRef.current.push(el);
        }
    }

    const HScroll = () => {
        gsap.fromTo( horizPanel1Ref.current ,{
			backgroundColor:'#473c08',
		}, {
			ease: 'none',
			backgroundColor:'#c77036',
			scrollTrigger: {
				start:"top-=300 top",
				end: () => `+=${screenSize.height}`,
				trigger: horizPanel1Ref.current,
				scrub: 1,
				immediateRender: false,
			}
		},0);
        // ScrollTrigger.refresh();
        // ScrollTrigger.config({ limitCallbacks: true });

		let horizScrollTl1 = gsap.timeline();
        horizScrollTl1.to(horizWrapperRef.current, {
            x: ()=> { return`-=${horizScroller.current}` },           
            ease: "none",
            scrollTrigger: {
                trigger: horizWrapperRef.current,
                pin: true,
                scrub: 1,
                end: () =>  "+=" + horizWrapperRef.current.offsetWidth,  
                immediateRender: false,
            }
        });
        if( isMobileDevice === false ) {
            titleRef.current.forEach((el, i)=>{
                gsap.from( el, {
                    opacity:0,
                    xPercent: ()=>{ return 10*(6-i) } ,
                    ease:"power1.inOut",
                    scrollTrigger:{
                        trigger: ".horiz-panel1",
                        start: "top top",
                        scrub:1,
                    }
                })
            })

            let horizTl1 = gsap.timeline();
            horizTl1.to("#line", { attr:{x2: 400}, scale:3,
                ease: "none",
                scrollTrigger:{
                    trigger: horizWrapperRef.current,
                    scrub:1,
                }			
            });
        }
    };


    useEffect(()=> {
		gsap.registerPlugin(ScrollTrigger);

        HScroll();
    },[]);


    return (
        <div ref={horizWrapperRef} className="horiz-wrapper w-900vw md:w-500vw h-screen flex overflow-x-auto overflow-y-hidden overflow-hidden">
            <section ref={horizPanel1Ref} className="horiz-panel horiz-panel1 w-200vw md:w-screen h-screen flex items-center justify-end">
                <div className="absolute left-0 h-screen font-minor ">
                    <LangingPageArrowDown/>
                </div>
                <div className="relative text-right w-screen text-green-100">
                    <div className="absolute left:1/3 md:left-1/2">
                        {/* <LandingpageTitleLine/> */}
                    </div>
                    <div ref={addToTitleRef} className="title font-minor text-xl pr-4 pt-8"> WE </div>   
                    <div ref={addToTitleRef} className="title font-minor text-xl"> ARE </div>
                    <div ref={addToTitleRef} className="title font-culture text-xl  sm:text-8xl md:text-9xl pr-12"> THE </div>
                    <div ref={addToTitleRef} className="title font-culture text-7xl sm:text-8xl md:text-9xl"> LIVABLE </div>
                    <div ref={addToTitleRef} className="title font-culture text-7xl sm:text-8xl md:text-9xl pr-4 pb-8"> STUDIO </div>
                    <div className="absolute left:1/3 md:left-1/2">
                        {/* <LandingpageTitleLine/> */}
                    </div>

                </div>
            </section>
            <section className="horiz-panels flex">
                <div className="fixed top-0 w-reset-screen h-screen opacity-90 z-0"> 
                    <div className='noisy-homeH'> </div>
                    <Image className="object-cover h-screen mix-blend-multiply" src='/horiz_land.png' alt="background" layout="fill" unoptimized="true" />
                    <GridLines/>
                </div>

                <section className="horiz-panel relative w-200vw md:w-screen h-screen grid grid-rows-8 items-center justify-items-end px-4 font-minor text-base md:text-xl text-white z-10">
                    <div></div>
                    <div className="w-2/3 flex justify-between"> <p>If your mind craves</p> <p>for elsewhere to go</p> </div>
                    <div className="w-2/3 flex justify-between"> <p>If you are looking to be </p> <p> in the stream of </p></div>
                    <div className="w-2/3 flex justify-between"> <div className="flex w-1/4 justify-between"><p>c</p><p>r</p><p>e</p><p>a</p><p>t</p><p>o</p><p>r</p><p>'s</p></div>  <div className="flex w-1/4 justify-between"><p>m</p><p>i</p><p>n</p><p>d</p> </div> </div>
                    <div className="w-2/3 flex justify-between">If you have always been slowly drifting in the  
                        <div className="w-1/4 flex justify-between font-culture text-4xl text-red-1000 z-20"> 
                            <p>p</p> <p>l</p> <p>a</p> <p>c</p> <p>e</p> <p>l</p> <p>e</p> <p>s</p> <p>s</p>  <p>place</p>
                        </div>
                    </div>
                    <div className="w-2/3 flex justify-between">it’s a process of moving to a space unknown</div>
                    <div className="w-2/3 flex justify-between">moment not worrying losing </div>
                    <div></div>

                    <Link href="/about">
                    <div className="absolute right-0 bg-green-100 opacity-10 w-500px h-4/5 cursor-pointer z-10">
                    ====    to about page    (photo coming soon) ====
                    </div>
                    </Link>
                </section>

                <section className="horiz-panel w-200vw md:w-screen h-screen
                            font-minor text-lg text-white z-10">
                    <div className="relative w-4/5 h-1/4 grid grid-rows-6 items-center justify-items-end">
                        <div></div>
                        <div></div>
                        <div >A landscape of the endlessness  </div>
                        <div>that contact to the origin of senses.</div>
                        <div >A placeless place  </div>
                        <div> where your spiritual mind resides.</div>
                    </div>

                    <div className="relative w-4/5 h-1/2 grid grid-rows-3 font-serif text-xl">
                        <div className="absolute bottom-0 left-1/3">
                            <Link href="/journal"> 
                                <div className="text-12xl border-b py-4 font-culture text-red-1000 cursor-pointer"> Here </div>
                            </Link>
                            <div></div>
                            <div className="flex justify-between"> all we do is</div>
                        </div>
                    </div>


                </section>

                <section className="horiz-panel w-200vw md:w-screen h-screen flex items-center justify-center z-10 ">
                    <div className="relative w-4/5 h-screen grid grid-cols-3 font-culture text-2xl">
                        <div></div>
                        <div></div>
                        <div></div>

                        <div className="">
                            FEELING BEING
                        </div>
                        <div></div>
                        <div></div>

                        <div></div>
                        <Link href="/category/shop">
                            <div className="col-span-2 bg-green-100 opacity-10 w-1/2 h-1/2 cursor-pointer">
                                to shop page
                            </div>
                        </Link>
                        

                    </div>

                </section>

                <section className="horiz-panel w-100vw md:w-screen h-screen grid grid-cols-4">

                    <div></div>
                    <Link href="/journal">
                        <div className="col-span-2 h-full w-full bg-green-100 opacity-10 cursor-pointer">
                            to shop journal
                        </div>
                    </Link>

                    <div></div>
                </section>

            </section>
            <section className="horiz-panel horiz-panel5 w-screen h-screen flex">5</section>
            
        </div>


    )
}