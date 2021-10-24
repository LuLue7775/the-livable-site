import Link from "next/link";
import Image from "../../image";
import { DEFAULT_MAINCAT_IMG_URL } from "../../constants/urls";
import TextRoundPath from "../svg-icons/TextRoundPath";
import ReadMore from "../svg-icons/ReadMore";
import LineIndex from "../svg-icons/Line-index";

const JournalSubcat = ({journal, i, journalCategory, journalCategorySlug}) => {
    return (
        <>
            { journalCategory 
            ? 
                <TextRoundPath text={journalCategory}/>
            : '' }
            <LineIndex i={i}/>

            <Link href={`/journal/${journalCategorySlug}/${journal?.slug}`}>
                <a className="readmoreBtn cursor-pointer absolute left-1/2 right-1/4 mx-auto bottom-1/10 md:bottom-1/7 text-base font-minor font-semibold capitalize"> 
                    <ReadMore/> 
                </a>
            </Link>  
            
            <div className="hidden md:grid"> </div>
            <div className={`journal-elements grid col-span-2 md:col-span-1 grid-rows-4`} >
    {/* THE GREEN BG CIRCLE **/}
                <div>
                    <div className="title-bg absolute right-1/5 md:left-1/3 top-1/3 md:top-1/3 z-0 h-400px w-1/2 md:h-1/4 md:w-1/3 bg-green-1000 opacity-50 rounded-full "> </div>
                </div> 
                <div className=" grid row-span-2 right-0 ">
                    <Image   
                            className={`rounded-tl-full`}
                            layout={`fill`}
                            loading={ i === 0 ? "eager" : "lazy" }                                                        
                            sourceUrl={ journal?.featuredImage?.node?.sourceUrl ?? '' }
                            // placeholder="blur"
                            defaultImgUrl={DEFAULT_MAINCAT_IMG_URL}
                            altText={ journal?.featuredImage?.node?.altText ?? journal?.slug}
                    />
                </div>  
    {/* TITLE **/}
                <div className="journal-title grid absolute z-20 ">
                    <h1 className={`text-center font-serif text-white text-2xl sm:text-3xl md:text-6.5xl`}> {journal.title} </h1> 
                </div>  
            </div>

    {/* EXCERPT **/}
            <div className={`journal-excerpt absolute left-1/3 bottom-1/7 w-1/2 md:w-1/3 `}> 
                <div dangerouslySetInnerHTML={ { __html: journal.excerpt } } className="text-sm text-white font-serif-ch font-light z-30 h-160px overflow-hidden"/>   
            </div>
        </>
    )
};
export default JournalSubcat;