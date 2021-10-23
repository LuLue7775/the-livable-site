import { useEffect, useRef  } from "react";

const Loading = ( props ) => {
	
    const { isLoading } = props;

    const bgRef = useRef(null);

    useEffect(()=>{

        if ( true === isLoading) {
            gsap.fromTo( bgRef.current,{
                y: ()=>`${-window.innerHeight}`,
                duration: 2,
                ease:"power2", 
                autoAlpha:0.2
            }, {
                y:0,
                autoAlpha:1
            });

        } else {
            // gsap.to( bgRef.current, {
            //     y: ()=>`${-window.innerHeight}`,
            //     duration: 2,
            //     ease:"power2", 
            // });
            gsap.to( bgRef.current, {
                autoAlpha:0,
                ease:"power2", 
                duration: 2,
            });
        } 
        
    }, [isLoading]);

	return (
        <div ref={bgRef} className="fixed w-reset-screen h-reset-screen bg-green-1000 z-50"/>

	)
};

export default Loading;
