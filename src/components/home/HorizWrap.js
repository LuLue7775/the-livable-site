
import useScreenSize from '../../utils/useScreenSize';
import { useEffect, useState, useRef } from 'react';
import LangingPageArrowDown from '../svg-icons/LandingpageArrowDown';
import LandingpageTitleLine from '../svg-icons/LandingpageTitleLine';

export default function HorizWrap () {
	const screenSize = useScreenSize();
	const [isMobile, setMobile] = useState(null) ;
    useEffect(()=>{
        if (screenSize.width < 768) {
            setMobile(true);
        } else {
            setMobile(false);
        }
        // return ( ()=> setMobile(null) ) 
    }, [screenSize]);
    if (isMobile) {
        var horizScroller = screenSize.width*8;
    } else {
        var horizScroller = screenSize.width*4;
    }

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
			backgroundColor:' #ecb886',
		}, {
			ease: 'none',
			backgroundColor:'#473c08',
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
            x: ()=> { return`-=${horizScroller}` },           
            ease: "none",
            scrollTrigger: {
                trigger: horizWrapperRef.current,
                pin: true,
                scrub: 1,
                end: () =>  "+=" + horizWrapperRef.current.offsetWidth,  
                immediateRender: false,
            }
        });

		titleRef.current.forEach((el, i)=>{
			gsap.from( el, {
				opacity:0,
                xPercent: ()=>{ 
                    if(isMobile){ return 40*(6-i)}  
                    else {return 10*(6-i)}
                } ,
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
                <div className="relative text-right w-screen text-green-100 font-serif text-7xl sm:text-8xl md:text-9xl">
                    <div className="absolute left:1/3 md:left-1/2">
                        <LandingpageTitleLine/>
                    </div>
                    <div ref={addToTitleRef} className="title opacity-1 pr-4 pt-8"> WE </div>   
                    <div ref={addToTitleRef} className="title opacity-1"> ARE </div>
                    <div ref={addToTitleRef} className="title opacity-1 pr-12"> THE </div>
                    <div ref={addToTitleRef} className="title opacity-1"> LIVABLE </div>
                    <div ref={addToTitleRef} className="title opacity-1 pr-4 pb-8"> STUDIO </div>
                    <div className="absolute left:1/3 md:left-1/2">
                        <LandingpageTitleLine/>
                    </div>

                </div>
            </section>
            <section className="horiz-panels flex">
                <section className="horiz-panel w-200vw md:w-screen h-screen grid grid-rows-8 items-center justify-items-end px-4 font-minor text-xl text-white  ">
                    <div></div>
                    <div className="w-2/3 flex justify-between"> <p>If your mind craves</p> <p>for elsewhere to go</p> </div>
                    <div className="w-2/3 flex justify-between"> <p>If you are looking to be </p> <p> in the stream of </p></div>
                    <div className="w-2/3 flex justify-between"> <div className="flex w-1/4 justify-between"><p>c</p><p>r</p><p>e</p><p>a</p><p>t</p><p>o</p><p>r</p><p>'s</p></div>  <div className="flex w-1/4 justify-between"><p>m</p><p>i</p><p>n</p><p>d</p> </div> </div>
                    <div className="w-2/3 flex justify-between">If you have always been slowly drifting in the placeless place </div>
                    <div className="w-2/3 flex justify-between">it’s a process of moving to a space unknown</div>
                    <div className="w-2/3 flex justify-between">moment not worrying losing </div>
                    <div></div>
                </section>
                <section className="horiz-panel w-200vw md:w-screen h-screen grid grid-rows-4 items-center justify-items-center font-body text-2xl text-white ">
                    <div></div>
                    <div className="">A landscape of endless that contact to the origin of _ </div>
                    <div className="">A placeless place where your spiritual mind resides </div>
                    <div></div>
                </section>
                <section className="horiz-panel w-200vw md:w-screen h-screen flex items-center justify-center ">
                    <div className="relative w-4/5 h-screen font-serif text-2xl">
                        <div className="absolute top-1/2 left-0">
                            <div className="text-7xl border-b py-4 overflow-hidden"> Here </div>
                            <div className="overflow-hidden"> All we do is</div>
                        </div>
                        <div className="absolute top-1/4 right-0">
                            <div> FEELING BEING</div>
                        </div>
                    </div>
                </section>
            </section>
            <section className="horiz-panel horiz-panel5 w-screen h-screen flex">5</section>
            
        </div>


    )
}