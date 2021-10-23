import { isEmpty, isArray } from 'lodash';
import { useState, useRef, useContext } from 'react';
import { useSwipeable } from 'react-swipeable';
import { MobileDeviceContext } from '../../context/AppContext';
import NextSlide from '../../svg-icons/NextSlide';

const GalleryCarousel = ({gallery}) => {
    if ( isEmpty(gallery) || ! isArray( gallery ) ) {
        return null;
    }
    
    const isMobileDevice = useContext( MobileDeviceContext ) ;

    const activeIndexRef = useRef( { activeIndex: 0 } );
    const slideRef = useRef( 0 );
    const [ slide, setSlide ] = useState( 0 );
    const [ restartSlide, setRestartSlide ] = useState( 0 );
    const { activeIndex } = activeIndexRef.current;

    /**
     * Change to next slide.
     */
    const nextSlide = () => {

        if ( 1 === gallery.length ) {
            return null;
        }

        /**
         * If if autoplay is set to true
         * and all slides are finished playing,
         * set the activeIndex to one and restart the slide from start.
         */
        if ( activeIndexRef.current.activeIndex === gallery.length - 1 ) {

            activeIndexRef.current.activeIndex = 0;
            setRestartSlide( restartSlide + 1 );

        } else {

            // If its not the last slide increment active index by one.
            activeIndexRef.current.activeIndex =
                activeIndexRef.current.activeIndex + 1;

        }

        slideRef.current = slideRef.current + 1;
        setSlide( slideRef.current );

    };

 /**
 *  HORIZONTAL SCROLL FOR PRODUCT IMAGE
 *  ONLY ON MOBILE
 */

    const handlers = useSwipeable({
        onSwipedLeft: nextSlide,
        preventDefaultTouchmoveEvent: true
    });

    
    return (
            <div {...handlers} className="relative h-screen md:w-1/2 ">
                {
                    gallery.map( ( item, i ) => {
                        const opacity = ( activeIndex === i || 1 === gallery.length ) ? 'opacity-100' : 'opacity-0';
                        return (
                            <div key={item?.id} className={`${opacity} banner-img-container md:w-1/2 md:fixed `}>
                                <img
                                    className="object-cover h-screen w-full md:w-1/2 absolute"
                                    src={item?.mediaItemUrl} 
                                    loading={ i === 0 ? "eager" : "lazy" } 
                                    // placeholder="blur"
                                    alt={ item?.altText ? item?.altText : item?.title }
                                />
                            </div>
                        )
                    })
                }
                <div className="absolute md:fixed top-1/2 w-full md:w-1/2 z-30 opacity-85 font-minor font-semibold text-base text-white italic">  
                    <button className="icon-nav-btn h-100px w-100px absolute top-1/2 right-0 focus:outline-none flex justify-end" onClick={nextSlide}>
                        <span className="icon-click absolute top-3 right-8 "> {isMobileDevice ? 'swipe' : 'click'} </span>
                        <span className="icon-nav-right absolute ">
                            <NextSlide/>
                        </span>
                    </button>
                </div>

               
            </div>
    )
}

export default GalleryCarousel
