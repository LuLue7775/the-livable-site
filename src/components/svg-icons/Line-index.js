import { useEffect, useRef } from "react";


function LineIndex({ i }) {

    const numRef = useRef(null);

    useEffect(()=>{
        gsap.fromTo(numRef.current,{
            x:"+=50",
            ease: "expo",
            delay: 0.4,
            duration:1,
            opacity:0
        },{
            x:0,
            opacity:1
        })


    },[i]);

    return (
    <svg viewBox="0 0 200 600" height="100%" preserveAspectRatio="xMinYMin meet" 
        className="invisible md:visible absolute top-24 right-0 text-base font-minor capitalize">
        <path stroke="#c3f33f" fill="transparent" strokeWidth="1" opacity="0.3" d="M 100 300 V 200 L 100 300"/>
        <text ref={numRef} x="100" y="350" fill="#c3f33f" writingMode="tb">No.{i+1}</text>  
    </svg>
    );
  }
  
  export default LineIndex;
  