import BackBtn from "../svg-icons/BackBtn";
import TextHalfCirclePath from "../svg-icons/TextHalfCirclePath";
import JournalArrow from "../svg-icons/JournalArrow";
import { DEFAULT_MAINCAT_IMG_URL } from "../../constants/urls";
import Image from "../../image";
import Link from "next/link";
import { useRef, useEffect, useState } from 'react';

const JournalSingleElements = ({journalCategory, journal, isBackClicked, setBackClicked})=> {
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const circleRef = useRef(null);


    /*  When a post is clicked */
    useEffect(()=>{
            
        let tl1 = gsap.timeline();
        tl1.fromTo( titleRef.current, {
            y:0,
        },{                
            y:() => {return `-=${window.innerHeight/6}`},
            duration: 1,
            scale: 1.2, 
            ease: "expoScale(1, 1.2)"
        },0);

        tl1.fromTo( imageRef.current, {
            y:0,
        },{                
            y:() => {return `+=${window.innerHeight/10}`},
            duration: 1,
            scale: 1.5, 
            ease: "expoScale(1, 1.5)"
        },0);
        tl1.to( circleRef.current, {                
            backgroundColor:"#dd3c0b",
            // duration: 1,
            ease:"power2",
        },1);

    }, []);


    /*  For closing post  */  
    useEffect(()=>{

        if ( true === isBackClicked ) {

            let tl1 = gsap.timeline();

            tl1.to( titleRef.current, {
                y:() => {return `+=${window.innerHeight/6}`},
                duration: 1,
                scale: 1, ease: "expoScale(1.2, 1)"
            },0);
            tl1.to( imageRef.current, {                
                y:() => {return `-=${window.innerHeight/10}`},
                duration: 1,
                scale: 1, ease: "expoScale(1.5, 1)"
            },0);
            tl1.to( circleRef.current, {                
                backgroundColor:"#002c24",
                // duration: 1,
                ease:"power2",

            },1);

        }

    return () => setBackClicked(null);
    }, [isBackClicked]);



    return (
        <>
    {/* BACK BTN **/}
        <div className="z-50 w-64px top-16 right-0 p-4 mr-5 mt-5 xl:ml-5 xl:mb-5 fixed xl:left-0 xl:top-auto xl:bottom-12">
            <Link href={`/journal/${journalCategory}`}>
                <a onClick={ () => setBackClicked(true) } className="back-btn cursor-pointer group"> <BackBtn/> </a>
            </Link>
        </div>
        <div className={`relative grid grid-cols-4 max-w-reset-screen h-screen z-20 `}> 
            <div  className="vertical-journal-cat absolute top-1/5 right-1/4 uppercase text-gray-800 font-serif"/> 
            <div className="hidden md:grid"/> 
            <div className={`grid col-span-3 md:col-span-1 grid-rows-4`} >
    {/* THE GREEN BG CIRCLE **/}
                <section>
                    <div ref={circleRef} className="title-bg absolute right-1/5 md:left-1/3 bottom-1/5 md:top-1/3 z-0 h-300px md:h-1/4 w-1/3 bg-green-1000 opacity-50 rounded-full "> </div>
                </section>
                <section ref={imageRef} className="grid row-span-2 right-0">
                <Image   
                        className={`rounded-none object-cover `}
                        priority="true"
                        sourceUrl={ journal?.featuredImage?.node?.sourceUrl ?? '' }
                        defaultImgUrl={DEFAULT_MAINCAT_IMG_URL}
                        altText={ journal?.featuredImage?.node?.altText ?? journal?.slug}
                />
                </section>
    {/* TITLE **/}
                <section>
                <div className="journal-title grid absolute z-20 ">
                    <h1 ref={ titleRef } className={`expand-title text-center font-serif text-white text-2xl sm:text-3xl md:text-6.5xl`}> {journal.title} </h1> 
                </div> 
                </section> 
            </div>
    {/* EXCERPT **/}
            <section>
            <div className={`grid absolute left-1/3 bottom-1/7 w-1/2 md:w-1/3 `}> 
                    <div dangerouslySetInnerHTML={ { __html: journal.excerpt } } className="text-sm text-white font-serif-ch font-light z-30 h-160px overflow-hidden"/>   
            </div>
            </section>

        </div>


        {/* CONTENT **/}
        <div dangerouslySetInnerHTML={ { __html: journal.content } } 
        className="relative text-base font-serif-ch font-light text-black z-30 m-10 md:m-auto max-w-reset-screen md:max-w-1/2"/>   

        {/* SCROLL DOWN ARROW **/}          
        <div className="absolute right-0 md:right-1/4 bottom-1/7 z-40">
            <JournalArrow/>
        </div> 

        <div className=" relative w-full h-300px z-20 flex items-center justify-center font-serif ">
            <TextHalfCirclePath/>
            <button className="custom-btn custom-btn-brown flex z-30 border-gray-200 rounded-lg px-10 py-4"> see workshop </button>
        </div>
        </>
    )
};
export default JournalSingleElements;