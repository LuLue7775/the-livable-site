import client from "../../src/components/ApolloClient";
import {isEmpty} from "lodash";
import {useRouter} from "next/router";
import Image from "next/image";
import Header from "../../src/components/Header";
import { GET_JOURNAL_ITEMS, GET_JOURNAL_SLUGS } from "../../src/queries/get-journal-items";
import { useEffect, useRef, useContext, useState } from 'react';
import JournalSubcat from "../../src/components/journal";
import { useSwipeable } from "react-swipeable";
import TextRoundPath from "../../src/components/svg-icons/TextRoundPath";
import LineIndex from "../../src/components/svg-icons/Line-index";
import useScreenSize from "../../src/utils/useScreenSize";
import { MobileDeviceContext } from "../../src/components/context/AppContext";

/** url: /journal/materials/ */
export default function JournalSubcats( { journalCategory, journalCategorySlug, journals } ) {

    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

	const isMobileDevice = useContext( MobileDeviceContext ) ;


    const pageWrap = useRef(null);
    useEffect(() => {
        gsap.to(pageWrap.current, {opacity:1, duration:2, delay:1 })  // opening fade
    }, []);

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



    const handlers = useSwipeable({
        onSwipedUp: () => setScrollState(1),
        onSwipedDown: () => setScrollState(-1),
        preventDefaultTouchmoveEvent: false,  // call e.preventDefault *See Details*
        trackTouch: true,                     // track touch input
        trackMouse: false,                    // track mouse input
    });
    /*------------------------------------------------------------------*/ 

    const [ scrollState, setScrollState ] = useState(null); 
    const [ activeJournal, setJournal ] = useState(0);
    const screenSize = useScreenSize();

    const journalContainersRef = useRef([]);
    const addjournalContainersToRefs = (el) => {
        if ( el && !journalContainersRef.current.includes(el) ) {
            journalContainersRef.current.push(el);
        }
    };
    const rotateRef = useRef(null)

    useEffect(()=>{
        if ( isMobileDevice === false ) {
            if ( 1 === scrollState ) {
                if ( activeJournal < journals.length-1 ) {
                    let tl1 = gsap.timeline();
                    tl1.to( journalContainersRef.current[activeJournal], {y: () => `-=  ${screenSize.height}`, },0);
    
                    tl1.to( journalContainersRef.current[activeJournal+1], {
                        y: () => `-=  ${screenSize.height}`, ease: "expo", duration:1, },0);
                    
                    tl1.to(rotateRef.current, { rotation: "+=720" ,  duration: 1.5, ease: 'back.out' },0);
    
                    setJournal(( prev ) => ( prev + 1) )
                }
            } else if (scrollState < 0) {
                if ( activeJournal > 0 ) {
                    let tl2 = gsap.timeline();
                    tl2.to( journalContainersRef.current[activeJournal-1], { 
                        y: () => `+=  ${screenSize.height}`, ease: "expo", duration:1,},0);
    
                    tl2.to( journalContainersRef.current[activeJournal], { y: () => `+=  ${screenSize.height}`},0);
    
                    tl2.to(rotateRef.current, {  rotation: "-=720" , duration: 1.5,  ease: 'back.out' },0);
    
                    setJournal(( prev ) => ( prev - 1) )
                }
            }
        }
        return () => setScrollState(null);        
    },[scrollState])

    return (
		<div ref={pageWrap} className="pageWrap">
            <div className="fixed top-0 w-reset-screen h-screen opacity-90 z-0"> 
                <Image className="object-cover" src='/lobby.png' alt="background" layout="fill" />
            </div>
            <div className="relative z-60 ">
                <Header/>
            </div>
            
            <div className="max-w-reset-screen h-reset-screen z-10 pb-10"> 
                { isMobileDevice===false 
                ?                 
                    <div className="absolute w-reset-screen h-reset-screen overflow-hidden">
                    { journalCategory 
                    ? 
                        <TextRoundPath text={journalCategory} ref={rotateRef} />
                    : '' }
                    <LineIndex i={activeJournal}/>
                    </div>
                : ''}
                {/* <div className="relative w-reset-screen h-reset-screen overflow-hidden bg-blue-800 z-20"> first </div> */}

                 <div {...handlers} className={`${isMobileDevice===false ? 'absolute' : ''} w-reset-screen h-reset-screen overflow-hidden`}>
                    { undefined !== journals && journals?.length ? (
                        journals.map( (journal, i) => 
                            <div key={i} ref={addjournalContainersToRefs} 
                            className={`${isMobileDevice===false 
                                        ? i===0 
                                            ? 'first-journal absolute' :'journals-containers absolute'  
                                        : 'relative journals-containers-mobile'} 
                                        grid grid-cols-4 z-20 `}> 

                                <JournalSubcat journal={journal} i={i} journalCategorySlug={journalCategorySlug}  />
                                
                            </div>
                        )
                    ) : ''} 
                </div>

            </div>
        </div>

    )
};

export async function getStaticProps(context) {

    const {params: { slug }} = context;

    const {data} = await client.query(({
        query: GET_JOURNAL_ITEMS,
        variables: { slug }
    }));

    return {
        props: {
            journalCategory: data?.category?.name ?? '',
            journalCategorySlug: data?.category?.slug ?? '',
            journals: data?.category?.posts?.nodes ?? [],
        },
        revalidate: 10
    }

}

export async function getStaticPaths () {
    const { data } = await client.query({
        query: GET_JOURNAL_SLUGS
    })

    const pathsData = []
    
    data?.categories?.nodes && data?.categories?.nodes.map((journalCategory) => {
        if (!isEmpty(journalCategory?.slug) & ('uncategorized' !== journalCategory?.slug)) {
            pathsData.push({ params: { slug: journalCategory?.slug } })
        }
    })

    return {
        paths: pathsData,
        fallback: false
    }
}
