import { isEmpty, isArray } from 'lodash';
import { useState, useRef, useContext, useEffect } from 'react';
import { MobileDeviceContext } from '../../context/AppContext';
import NextSlide from '../../svg-icons/NextSlide';

import Slider from 'react-touch-drag-slider';
import React from "react" 
React.useLayoutEffect = React.useEffect 

const GalleryCarousel = ({gallery}) => {
    if ( isEmpty(gallery) || ! isArray( gallery ) ) {
        return null;
    }
    
    const isMobileDevice = useContext( MobileDeviceContext ) ;

    const [index, setIndex] = useState(0)

    const setFinishedIndex = (i) => {setIndex(i)}
    const nextSlide = () => {
        if (index < gallery.length - 1) setIndex(index + 1)
    }

    return (
            <div className="relative mobile-screen-100vh md:w-1/2 bg-placeholder overflow-hidden">
                <div  className={`md:w-1/2 md:fixed h-screen`}>
                    <Slider
                        onSlideComplete={setFinishedIndex}
                            activeIndex={index}
                            threshHold={30}
                            transition={0.5}
                    >
                        {gallery.map((item,i) => (
                                <img 
                                    className="object-cover h-screen w-full md:w-1/2 absolute"
                                    src={item?.mediaItemUrl} 
                                    key={i} 
                                    alt={item?.altText ? item?.altText : item?.title} />
                        ))}
                    </Slider>
                </div>
                {/* { isMobileDevice !== false ? ''
                :
                <div className="absolute md:fixed top-1/2 w-full md:w-1/2 z-30 opacity-85 font-minor font-semibold text-base text-white italic">  
                    <button className="icon-nav-btn h-100px w-100px absolute  right-0 focus:outline-none flex justify-end items-center" onClick={nextSlide}>
                        <span className="icon-click absolute top-9 right-4 "> next </span>
                        <span className="icon-nav-right absolute">
                            <NextSlide />
                        </span>
                    </button>
                </div>
                
                } */}


               
            </div>
    )
}

export default GalleryCarousel

