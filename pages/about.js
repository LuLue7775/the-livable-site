import Image from 'next/image';

import Header from '../src/components/Header';
import React, { useEffect, useRef } from 'react';
import GridLines from '../src/components/GridLines';

export default function Home ( ) {

    const pageWrap = useRef(null);
    useEffect(() => {
        gsap.to(pageWrap.current, {opacity:1, duration:2, delay:1 })
    }, [])
  

	return (

        <div ref={pageWrap} className="pageWrap">
            <div className="relative z-50">{}
                <Header/>
            </div>
            <div className="fixed top-0 w-reset-screen h-screen opacity-90 z-0"> 
                <Image className="object-cover" src='/lobby.png' alt="background" layout="fill" />
            </div>

            <GridLines></GridLines>
            <div className="about-container h-screen relative sm:grid sm:grid-cols-5 content-center items-center " >
                <div className="transform translate-x-24 translate-y-24 sm:translate-x-0 -rotate-90 sm:rotate-180 h-1/3 font-culture text-2xl md:text-7xl 
                            whitespace-nowrap p-8 sm:p-24 text-green-100 md:h-screen text-white z-20"
                        style={{ writingMode: 'vertical-rl' }}>
                        The Livable Studio
                </div>
                <div className="h-1/5 md:h-screen font-serif text-green-100 text-sm md:text-xl z-20 p-2 py-8"> 
                    <div className="py-3"> The Livable Studio is cofounded by Chen Yi Rong and Lu Wei Chen in 2019.</div>
                    <div className="py-3"> Rong is a mixed media artist who has a a highly specialized skill in metal art and ceramics. </div>
                    <div className="py-3"> Lu is passionate about utilizing technology as a tool to create art. 
                            Looking to compose peotry in digital world that makes the world a better place.  
                    </div>

                </div>
                <div className=" h-1/5 md:h-screen flex items-end font-serif text-green-100 text-sm md:text-xl z-20 p-2 py-6">
                    Inspired by modern sculptures, eclectic design and a natural curiosity about the second lives of objects.
                    A global audience finds its way to the digital collection of carefully selected vintage home-objects.
                </div>
                <div className="bg-green-100 h-1/2 md:h-screen z-10 opacity-20"> image </div>
                <div className="text-green-100 md:h-screen font-minor grid grid-rows-6 text-sm md:text-base z-20 p-2 py-8">
                    <div></div>
                    <div className="">
                        <div>Email</div>
                        <div>info@thelivablestudio.com</div>
                    </div>
                    <div className="">
                        <div>Address</div>
                        <div>4F., No. 5, Aly. 29, Ln. 205, Sec. 4, Zhongxiao E. Rd., Da’an Dist., Taipei City, Taiwan </div>
                    </div>
                    <div></div>
                    <div>
                        <div>Cofunder</div>
                        <div>235374wu</div>
                    </div>
                </div>

            </div>

    </div>

	)
};