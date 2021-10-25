import Link from "next/link";
import { useEffect, useRef, useState, useContext } from 'react';
import JournalCatsImage from "./JorunalCatsImage";
import JournalCatsImageBorder from "./JorunalCatsImageBorder";
import ArrowSm from "../svg-icons/ArrowSm";
import { useSwipeable } from "react-swipeable";
import { MenuContext } from "../context/AppContext";

/** url: /journal */
const JournalCatsContainer = ({ data, screenSize, imageHeight, imageBottom, imageMovement }) => {

    const subcatsData = data?.categories?.nodes;

    const [ scrollState, setScrollState ] = useState(null); 
    const [ scrollPage, setscrollPage ] = useState(0); 



/*------------------------------------------------------------------*/ 
/* useScrollDirection */    
const handleScroll = (e) => {
    var delta = ((e.deltaY || -e.wheelDelta || e.detail) >> 10) || 1;
    setScrollState(delta);
    //delta > 1 when scroll up. =-1 when scroll down
}
useEffect(() => {

    window.addEventListener("wheel", _.debounce(handleScroll, 450) );
    
    return () => {
        window.removeEventListener("wheel", handleScroll);
    }
  }, []) 

/**
 *  @TODO Solve scroll and mouse together issue. preventdefault?
 */    

 const handlers = useSwipeable({
    onSwipedUp: () => setScrollState(1),
    onSwipedDown: () => setScrollState(-1),
});


/*------------------------------------------------------------------*/ 

/**
 *  PAGE SCROLL AND REFs
 */    
    const subcatContainersRef = useRef([]);
    const addsubcatContainersToRefs = (el) => {
        if ( el && !subcatContainersRef.current.includes(el) ) {
            subcatContainersRef.current.push(el);
        }
    };

    const subcatTitleRefs = useRef([]);
    const addSubcatTitleToRefs = (el) => {
        if ( el && !subcatTitleRefs.current.includes(el) ) {
            subcatTitleRefs.current.push(el);
        }
    };

     useEffect(() => { 
             if ( 1 === scrollState ) {
                 if ( subcatsData.length-1 > scrollPage ) {
                     if ( scrollPage < subcatsData.length-1 ) {
                         gsap.to(subcatTitleRefs.current[scrollPage], {
                             y: "-=300",
                             autoAlpha: 0
                         });
                         gsap.fromTo( subcatContainersRef.current[scrollPage], {
                             autoAlpha:1
                         },{
                             y: () => `-=  ${screenSize.height}`,
                             ease: "expo",
                             delay: 0.4,
                             duration:1,
                             autoAlpha:0
 
                         });
                         setscrollPage( ( prev ) => ( prev + 1) );
                     }
 
                 }
 
             } else if (0 > scrollState) {
                 if ( 0 < scrollPage ) {
                     if ( scrollPage > 0 ) {
                         gsap.to(subcatTitleRefs.current[scrollPage-1], {
                             y: "+=300",
                         });
                         gsap.to(subcatTitleRefs.current[scrollPage-1], {
                             delay: 0.6,
                             autoAlpha: 1,
                         });
                         gsap.to( subcatContainersRef.current[scrollPage-1], {
                             y: () => `+=  ${screenSize.height}`,
                             ease: "expo",
                             delay: 0.4,
                             duration:1,
                             autoAlpha:1
                         });
                         setscrollPage( ( prev ) => ( prev - 1) );
                     }
                 }
             }
 
         return () => setScrollState(null);
       }, [scrollState]);


/**
 *  BLURRY BG WHEN MENU CLICKED
 */    
 const subcatBGRef = useRef([]);
 const addsubcatBGToRefs = (el) => {
     if ( el && !subcatBGRef.current.includes(el) ) {
        subcatBGRef.current.push(el);
     }
 };
 const [ isMenuVisible, setMenuVisibility ] = useContext( MenuContext );

 useEffect(()=> {
    
    subcatBGRef.current.forEach( (page, i ) => {
        if (isMenuVisible) {
            page.className += (' blur-bg');
         } else {
            page.className = `bg-subcat-bg${i%3} subcat `
         }
    });

 }, [isMenuVisible]);

    
    return (
        <div  className="screen-container" {...handlers} >
        {    
        subcatsData ? subcatsData.map( (item, i) => 
            <div key={i} ref={addsubcatContainersToRefs} className={` subcat-container${i} z-${6-i}0 subcat-containers absolute`} > 
                <div ref={addsubcatBGToRefs} className={`bg-subcat-bg${i%3} subcat `}>
                    <JournalCatsImageBorder/>
                    <div className="subcat-wrapper-slide w-5/4 ">
                        <JournalCatsImage item={item} i={i} scrollState={scrollState} scrollPage={scrollPage} subcatsData={subcatsData} imageHeight={imageHeight} imageBottom={imageBottom} imageMovement={imageMovement}/>
                    </div>
                    <Link href={`/journal/${item?.slug}`} >
                        <a className="cursor-pointer ">
                            <div ref={addSubcatTitleToRefs} className="subcat-title absolute w-full h-1/2 md:h-1/4 top-1/4 md:top-1/3 flex items-center justify-center text-center text-2.5xl sm:text-5xl md:text-7xl xl:text-9xl font-serif text-white uppercase transition transform delay-100 duration-500 ease-in-out hover:scale-110"> 
                                {item.name}
                            </div>
                        </a>
                    </Link>

                    <div className="subcat-desc absolute left-1/7 md:left-1/4 bottom-12 opacity-75 text-gray-900 w-200px md:w-300px break-words text-sm md:text-base font-bold font-body">
                        <p dangerouslySetInnerHTML={ { __html: item.description, } }/>  
                    </div>
                    <Link href={`/journal/${item?.slug}`} >
                        <a className=" visible md:invisible absolute left-1/4 bottom-12 cursor-pointer opacity-75 text-gray-900 text-xl font-body">
                             <span >(tap to discover)</span>
                        </a>
                    </Link>
                    <div className="absolute right-12 md:right-32 top-32 text-white font-serif "> Nr. {i+1}</div>
                    <div className="absolute right-16 md:right-32 bottom-32 ">
                        <ArrowSm/>
                    </div>
                    <p className="vertical-text-scroll absolute right-12 md:right-32 bottom-2 opacity-75 text-gray-900 text-sm md:text-base font-bold font-body"><span>Scroll</span></p>
                </div>
            </div>            
            
        ) : ''}
        </div>
        )
    }
    
    export default JournalCatsContainer;