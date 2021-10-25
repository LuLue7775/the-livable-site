import ImageBG from "next/image";
import Header from "../../../src/components/Header";
import client from "../../../src/components/ApolloClient"
import { useRouter } from "next/router"
import { GET_JOURNAL, GET_JOURNAL_SLUGS  } from "../../../src/queries/get-journal-items"
import { useEffect, useRef, useState, useContext } from 'react';
import { MenuContext } from '../../../src/components/context/AppContext';
import JournalSingleElements from "../../../src/components/journal/JournalSingleElements";

export default function JournalSingle( { journalCategory, journal } ) {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>
    };

    const [ isBackClicked, setBackClicked ] = useState(null);

    const BGRef = useRef(null);

    /*  When a post is clicked */
    useEffect(()=>{
        
        let tl1 = gsap.timeline();

        tl1.to( BGRef.current, {
            // duration:1, 
            backgroundColor: '#d3beab', 
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
            <div className="fixed w-reset-screen h-reset-screen opacity-50 z-0 "> 
                <ImageBG src='/bg.jpg' alt="background" layout="fill" />
            </div>
            <div className="relative z-60 ">
                <Header/> 
            </div>

            
            <div ref={BGRef} className="max-w-reset-screen h-reset-screen z-10 pb-16 overflow-hidden"> 
                <div ref={background} className="max-w-reset-screen h-reset-screen z-10 "> 

                    <JournalSingleElements journalCategory={journalCategory} journal={journal} isBackClicked={isBackClicked} setBackClicked={setBackClicked} />
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
