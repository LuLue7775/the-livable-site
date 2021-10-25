import { useRef, useEffect } from 'react';
import Image from "../../image";
import { DEFAULT_MAINCAT_IMG_URL } from "../../constants/urls";

const JournalCatsImage = ({ item, i, scrollState, scrollPage, subcatsData, imageHeight, imageBottom, imageMovement }) => {

/**
 *  PAGE SCROLL EFFECT FOR IMAGES CHANGE AND REFs
 */    
     const upImageRefs = useRef([]);
     const addUpImageToRefs = (el) => {
         if ( el && !upImageRefs.current.includes(el) ) {
             upImageRefs.current.push(el);
         }
     };
 
     const downImageRefs = useRef([]);
     const addDownImageToRefs = (el) => {
         if ( el && !downImageRefs.current.includes(el) ) {
             downImageRefs.current.push(el);
         }
     };

     useEffect(() => {
             const windowWrap = gsap.utils.wrap(-imageHeight, imageBottom );
 
             if ( 1 === scrollState ) {
                 if ( subcatsData.length-1 > scrollPage ) {
                     gsap.to(upImageRefs.current, {
                         y: () => {return `-=${imageMovement}`},
                         duration: 3,
                         ease:"power3",
                         modifiers: {
                             y: y =>windowWrap(parseFloat(y))  + "px",
                         },
                     });
                     gsap.to(downImageRefs.current, {
                         y: () => {return `+=${imageMovement}`},
                         duration: 3,
                         ease:"power3",
                         modifiers: {
                             y: y => windowWrap(parseFloat(y)) + "px",
                         },
                     });
                 }

             } else if (0 > scrollState) {
                 if ( 0 < scrollPage ) {
                     gsap.to(upImageRefs.current, {
                         y: () => {return `+=${imageMovement}`},
                         duration: 3,
                         ease:"power3",
                         modifiers: {
                             y: y => windowWrap(parseFloat(y)) + "px",
                         },
                     });
                     gsap.to(downImageRefs.current, {
                         y: () => {return `-=${imageMovement}`},
                         duration: 3,
                         ease:"power3",
                         modifiers: {
                             y: y => windowWrap(parseFloat(y)) + "px",
                         },
                     });
                 }
             }
 
       }, [scrollState]);

    return (
        <div className="subcat-images w-full md:grid md:grid-cols-4 gap-0 md:justify-items-center">
            <div className=" subcat-image1 " ref={addUpImageToRefs}>
                <div className="image-wrapper px-12 md:px-8">
                    <Image 
                        id="img"
                        className="w-full "
                        width="564"
                        height="846"
                        priority={ 0 === i ? 'true' : 'false'}
                        sourceUrl={ item?.products?.nodes?.[0]?.image?.sourceUrl ?? '' }
                        defaultImgUrl={DEFAULT_MAINCAT_IMG_URL}
                        altText={ item?.products?.nodes?.[0]?.image?.altText ?? item?.slug}
                    />
                </div>
            </div>
            <div className=" subcat-image2 " ref={addDownImageToRefs} >
                <div className="image-wrapper px-12 md:px-8">   
                    <Image
                        className="w-full"
                        width="564"
                        height="846"
                        priority={ 0 === i ? 'true' : 'false'}
                        sourceUrl={ item?.products?.nodes?.[1]?.image?.sourceUrl ?? '' }
                        defaultImgUrl={DEFAULT_MAINCAT_IMG_URL}
                        altText={ item?.products?.nodes?.[1]?.image?.altText ?? item?.slug}
                    />
                </div>
            </div>
            <div className="subcat-image3 hidden md:block" ref={addUpImageToRefs} >
                <div className="image-wrapper px-8">   
                    <Image
                        className="w-full"
                        width="564"
                        height="846"
                        priority={ 0 === i ? 'true' : 'false'}
                        sourceUrl={ item?.products?.nodes?.[2]?.image?.sourceUrl ?? '' }
                        defaultImgUrl={DEFAULT_MAINCAT_IMG_URL}
                        altText={ item?.products?.nodes?.[2]?.image?.altText ?? item?.slug}
                    />
                </div>
            </div>
            <div className="subcat-image4 hidden md:block" ref={addDownImageToRefs}>
            <div className="image-wrapper px-8">   
                <Image
                    className="w-full"
                    width="564"
                    height="846"
                    priority={ 0 === i ? 'true' : 'false'}
                    sourceUrl={ item?.products?.nodes?.[3]?.image?.sourceUrl ?? '' }
                    defaultImgUrl={DEFAULT_MAINCAT_IMG_URL}
                    altText={ item?.products?.nodes?.[3]?.image?.altText ?? item?.slug}
                />
            </div>
        </div>
        </div>

    )
}

export default JournalCatsImage;