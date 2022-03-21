import Image from "next/image";
import Header from "../../../src/components/Header";
import client from "../../../src/components/ApolloClient"
import { useRouter } from "next/router"
import { GET_JOURNAL, GET_JOURNAL_SLUGS  } from "../../../src/queries/get-journal-items"
import { useEffect, useRef, useState, useContext } from 'react';
import { MenuContext } from '../../../src/components/context/AppContext';
import { MobileDeviceContext } from "../../../src/components/context/AppContext";
import JournalSingleElements from "../../../src/components/journal/JournalSingleElements";
import Link from 'next/link';
import BackBtn from "../../../src/components/svg-icons/BackBtn";
import JournalArrow from "../../../src/components/svg-icons/JournalArrow";

export default function JournalSingle( { journalCategory, journal } ) {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>
    };

    const [ isBackClicked, setBackClicked ] = useState(null);

    const BGRef = useRef(null);

    /**
     *  Fake smooth scroll
     */
     const isMobileDevice = useContext( MobileDeviceContext ) ;

     const scrollRef = useRef(null);
     useEffect(()=>{

         if( isMobileDevice ===false ){
            gsap.registerPlugin(ScrollTrigger);
             const height = scrollRef.current.clientHeight;
             document.body.style.height = `${height}px`;
     
             gsap.to( scrollRef.current , {
                 y: -(height - document.documentElement.clientHeight),
                 ease: 'none',
                //  pause:true,
                 scrollTrigger: {
                     trigger: document.body,
                     start: 'top top',
                     end: 'bottom bottom',
                     scrub: 1,
                    //  immediateRender: false
                 },
             });
         }
     },[]);

    /*  When a post is clicked */
    useEffect(()=>{
        
        let tl1 = gsap.timeline();

        tl1.to( BGRef.current, {
            // duration:1, 
            backgroundColor: '#000', 
            ease:"power2",

        },1)
 
    }, []);

    /*  For closing post  */  
    useEffect(()=>{

        if ( true === isBackClicked ) {
            let tl1 = gsap.timeline();

            tl1.to( BGRef.current, {
                // duration:1, 
                backgroundColor: '#fff', 
                ease:"power2",
            },1)
        }
    
        return () => setBackClicked(null);
    }, [isBackClicked]);


/**
 *  BLURRY BG WHEN MENU CLICKED
 */    
    const background = useRef(null);
    const [ isMenuVisible, setMenuVisibility ] = useContext( MenuContext );

    useEffect(()=> {
        if (isMenuVisible) {
            background.current.className += (' blur-bg');
        } else {
            background.current.className = "max-w-reset-screen h-reset-screen z-10 pb-10"
        }
    }, [isMenuVisible]);

    return (
        <>  
            <div className="fixed top-0 w-reset-screen h-screen opacity-90 z-0"> 
                <Image className="object-cover" src='/lobby.png' alt="background" layout="fill" />
            </div>
            <div className="relative z-60 ">
                <Header/> 
            </div>

            
            <div ref={BGRef} className="max-w-reset-screen h-reset-screen z-10 pb-16 overflow-hidden"> 
                <div ref={background} className="max-w-reset-screen h-reset-screen z-10 "> 
                    <div ref={scrollRef}>
                        <JournalSingleElements journalCategory={journalCategory} journal={journal} isBackClicked={isBackClicked} setBackClicked={setBackClicked} />
                    </div>

                    {/* BACK BTN **/}
                    <div className="z-50 w-64px top-16 right-0 p-4 mr-5 mt-5 xl:ml-5 xl:mb-5 fixed xl:left-0 xl:top-auto xl:bottom-12">
                        <Link href={`/journal`}>
                            <a onClick={ () => setBackClicked(true) } className="back-btn cursor-pointer group"> <BackBtn/> </a>
                        </Link>
                    </div>
                    {/* SCROLL DOWN ARROW **/}          
                    <div className="absolute right-0 md:right-1/4 bottom-1/7 z-40">
                        <JournalArrow/>
                    </div> 

                </div>
            </div>                
        </>
    )
}


export async function getStaticProps(context) {


    const { params:{ slug, subslug } } = context
    
    const { data } = await client.query(({
        query: GET_JOURNAL,
        variables: { subslug }
    }))
    
    return {
        props: {
            journalCategory: slug ?? '',
            journal: data?.post ?? '',
        },
        revalidate: 30
    }
}

export async function getStaticPaths () {
    const { data } = await client.query({
        query: GET_JOURNAL_SLUGS
    })
    const pathsData = []
    
    data?.categories?.nodes && data?.categories?.nodes.map((journal) => {
        journal?.posts?.nodes.map( (journalData) => {
            pathsData.push({ params: {
                                    slug: journal?.slug,
                                    subslug: journalData?.slug 
                                } })
        })

    })

    return {
        paths: pathsData,
        fallback: false
    }
}
