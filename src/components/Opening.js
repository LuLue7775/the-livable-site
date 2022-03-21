import { useContext, useState, useEffect, useRef } from "react";
import { HomeOpeningContext } from "./context/AppContext";
import NProgress, { set } from "nprogress";
NProgress.configure({ 
	showSpinner: false,

});

const Opening = () => {
    /**
	 *  Nprogress and Opening background transition
	 */

	const [ isHomeLoaded, setHomeLoaded ] = useContext( HomeOpeningContext );
	const [progress, setProgress] = useState(0);
	
	const [isDelayDone, setDelayDone] = useState(false);
	const delayLoad = () => {
		setTimeout(() => { setDelayDone(true); } , 5000);
	}

	// prevent scrolling
	useEffect(() => {
		delayLoad(); 
		document.body.style.overflow = "hidden";
	  }, []);

    useEffect(()=>{ 
				
        if(!isHomeLoaded || !isDelayDone){
			NProgress.start();

			var timer = setInterval(() => {
				if( NProgress.status ){
					setProgress( Math.round( NProgress.status*100 ));
					NProgress.inc();
				} else {
					clearInterval(timer)
				}
			}, 1000);
		} else if (isDelayDone && isHomeLoaded) {
			NProgress.done(); //force NProgress finishes up
			openingAnim();
			setTimeout(() => { document.body.style.overflow = "scroll"; } , 2000);			
		}
    },[isHomeLoaded, isDelayDone])
		

	const opening = useRef(null);
	function openingAnim(){
		gsap.to( opening.current, {
			duration:1.5,
			ease: "expo.inOut",
			y:"-100%",
		} )
	};

    return(

        <div ref={opening} className='openingBG absolute w-reset-screen h-screen z-60'> 
			<div className='absolute top-1/2 right-12 text-9xl text-gray-300 font-culture'> { isHomeLoaded ? '' : (progress + `%`) } </div>
		</div>
    )


};
export default Opening;