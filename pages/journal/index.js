import Header from "../../src/components/Header";
import client from "../../src/components/ApolloClient";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { GET_JOURNAL_CATS } from "../../src/queries/get-journal-items";
import useScreenSize from "../../src/utils/useScreenSize";
import SubcatContainer from "../../src/components/category_journal/SubcatContainer";

export default function Journal( { data, slug, menu } ) {
    const router = useRouter()

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <div>Loading...</div>
    }

/** 
 *   AFTER PAGE LOADED, CALCULATE MOVEMENT VALUE FOR GSAP TO USE, WHICH DOES'T REQUIRE PRE-RENDERED 
 *   BUT RELOAD THE PAGE IF RESIZED AGAIN. 
 */
    const screenSize = useScreenSize();

    const [imageHeight, setImageHeight ] = useState(null);
    const [imageBottom, setImageBottom ] = useState(null);
    const [imageMovement, setImageMovement ] = useState(null);
    useEffect(() => {

        const imgHeightRef = document.getElementById("img");
        setImageHeight(imgHeightRef.offsetHeight*0.8);
        setImageBottom(screenSize.height) ;
        setImageMovement(screenSize.height*0.8);

        return () => router.reload();
    }, [screenSize]);


    return (
        <>  
            <div className="relative z-80 ">
                <Header menu={ menu }/>
            </div>

            <SubcatContainer data={data} slug={slug} menu={menu} 
                    screenSize={screenSize} imageHeight={imageHeight} imageBottom={imageBottom} imageMovement={imageMovement} />

        </>

    )
};

export async function getStaticProps() {

    const { data } = await client.query(({
        query: GET_JOURNAL_CATS,
    }));
    return {
        props: {
            journalCategories: data?.categories?.nodes ?? [],
            data: data ?? [],
            slug: "journal",
            menu: 
			[ 
				[ data?.shop ? data.shop : [] ] ,
				[ data?.workshop ? data.workshop : [] ] ,
				[ data?.journal ? data.journal : [] ] ,				
			] ?? []
        },
        revalidate: 10
    }

}
