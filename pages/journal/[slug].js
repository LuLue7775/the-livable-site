import client from "../../src/components/ApolloClient";
import {isEmpty} from "lodash";
import {useRouter} from "next/router";
import ImageBG from "next/image";
import Header from "../../src/components/Header";
import { GET_JOURNAL_ITEMS, GET_JOURNAL_SLUGS } from "../../src/queries/get-journal-items";
import { useEffect, useRef, useContext } from "react";

import { MenuContext } from "../../src/components/context/AppContext";

import JournalSubcat from "../../src/components/journal";

/** url: /journal/materials/ */
export default function JournalSubcats( { journalCategory, journalCategorySlug, journals } ) {

    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    const postRef = useRef([]);
    const addToPostsRef = (el) => {
        if ( el && !postRef.current.includes(el) ) {
            postRef.current.push(el);
        }
    };
    useEffect(()=> {
        gsap.registerPlugin(ScrollTrigger);
    },[]);

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


            <div ref={background} className="max-w-reset-screen h-reset-screen z-10 pb-10"> 


                    { undefined !== journals && journals?.length ? (
                        journals.map( (journal, i) => 
                            <div key={i}> 
                                <div ref={addToPostsRef} className={` relative grid grid-cols-4 max-w-reset-screen h-screen z-20 `}> 

                                    <JournalSubcat journal={journal} i={i} journalCategory={journalCategory} journalCategorySlug={journalCategorySlug} />

                                </div>
                            </div> 
                        )
                    ) : ''}
            </div>
        </>

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
        fallback: true
    }
}
