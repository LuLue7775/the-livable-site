import React, { useEffect, useRef } from 'react'

export default function GridLines() {

  const hRef = useRef(null);
  const vRef = useRef(null);

  useEffect(() => {
      
  },[])
  return (
    <div className="lines-wrapper ">
        <div className="lines isLoaded" data-v-2028c619="">
            <div ref={hRef} className="lines-h "></div> 
            <div ref={vRef} className="lines-v ">
                <span></span>
            </div> 
            <div className="lines-crosses">
                <div className="lines-crosses-x"></div> 
                <div className="lines-crosses-x"></div> 
                <div className="lines-crosses-x"></div> 
                <div className="lines-crosses-x"></div> 
            </div>
        </div>
    </div>
  )
}
