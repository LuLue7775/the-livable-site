import Image from 'next/image';

import Header from '../src/components/Header';
import React, { useEffect, useRef } from 'react';
import { DEFAULT_HOME_IMG_URL, DEFAULT_HOME_IMG2_URL, DEFAULT_HOME_IMG3_URL } from '../src/constants/urls';

export default function Home ( ) {

    const pageWrap = useRef(null);
    useEffect(() => {
        gsap.to(pageWrap.current, {opacity:1, duration:2, delay:1 })
    }, [])
  
    const image1Ref = useRef(null);
    const image2Ref = useRef(null);
    const image3Ref = useRef(null);
	return (

        <div ref={pageWrap} className="pageWrap">
            <div className="relative z-50">
                <Header/>
            </div>
            <div className="fixed top-0 w-reset-screen h-screen opacity-90 z-0"> 
                <Image className="object-cover" src='/lobby.png' alt="background" layout="fill" />
            </div>
            <div className="overflow-x-hidden">  {/** fake scroll */}
                <div className="about-container grid grid-rows-4 overflow-x-hidden" >

                    <div className="row-span-1 relative"> 
                        <div className="absolute ml-8 top-1/4 w-300px md:w-700px text-lg md:text-xl font-serif text-green-200 z-20">
                        Inspired by modern sculptures, eclectic design and a natural curiosity about the second lives of objects. A global audience finds its way to the digital collection of carefully selected vintage home-objects.
                        Inspired by modern sculptures, eclectic design and a natural curiosity about the second lives of objects. A global audience finds its way to the digital collection of carefully selected vintage home-objects.

                        </div>
                        <div ref={image1Ref} className="absolute top-1/5 left-1/3 w-full sm:w-4/5 h-4/5"> 
                            <Image 
                                className="object-contain"
                                src={DEFAULT_HOME_IMG_URL}
                                alt="image1"
                                layout="fill"
                            >
                            </Image>
                        </div>
                    </div>

                    <div className="row-span-2"> 
                        <div className="relative left-12 m-4">
                            <Image 
                                    src={DEFAULT_HOME_IMG2_URL}
                                    alt="image2"
                                    layout="fixed"
                                    width="250px"
                                    height="350px"
                            >
                            </Image>
                            <div className="absolute bottom-0 left-32 mr-12 mb-2 w-200px md:w-400px text-base md:text-lg font-serif text-green-1000 z-20"> 
                            Inspired by modern sculptures, eclectic design and a natural curiosity about the second lives of objects. A global audience finds its way to the digital collection of carefully selected vintage home-objects.
                            </div>
                        </div>
                        <div className="relative left-12 m-4">
                            <Image 
                                    src={DEFAULT_HOME_IMG2_URL}
                                    alt="image2"
                                    layout="fixed"
                                    width="250px"
                                    height="350px"
                            >
                            </Image>
                            <div className="absolute bottom-0 left-32 mr-12 mb-2 w-200px md:w-400px text-base md:text-lg font-serif text-green-1000 z-20"> 
                            Inspired by modern sculptures, eclectic design and a natural curiosity about the second lives of objects. A global audience finds its way to the digital collection of carefully selected vintage home-objects.
                            </div>
                        </div>
                        <div className="relative left-12 m-4">
                            <Image 
                                    src={DEFAULT_HOME_IMG2_URL}
                                    alt="image2"
                                    layout="fixed"
                                    width="250px"
                                    height="350px"
                            >
                            </Image>
                            <div className="absolute bottom-0 left-32 mr-12 mb-2 w-200px md:w-400px text-base md:text-lg font-serif text-green-1000 z-20"> 
                            Inspired by modern sculptures, eclectic design and a natural curiosity about the second lives of objects. A global audience finds its way to the digital collection of carefully selected vintage home-objects.
                            </div>
                        </div>
                    </div>

                    <div className="row-span-1 relative">
                        <div className="absolute bottom-0 w-full h-1/2"> 
                            <p> us </p>
                            <Image 
                                className="object-contain"
                                src={DEFAULT_HOME_IMG3_URL}
                                alt="image3"
                                layout="fill"
                            >
                            </Image>
                        </div>

                    </div>

                </div>
            </div>

        </div>

	)
};
