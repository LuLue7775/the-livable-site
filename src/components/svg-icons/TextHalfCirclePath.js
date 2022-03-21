function TextHalfCirclePath() {
    return (
        <>
            <div className="absolute right-1/2">
                <svg width="301" height="301" viewBox="0 0 301 301" preserveAspectRatio="xMaxYMin meet">
                    <g transform="translate(301,301)" stroke="#ffddbb" strokeWidth=".5">
                        <path id="curve-l" d="M0 0 m-300 0 A300-300 0 0 1 0-300" fill="transparent" stroke="#ffddbb" strokeWidth="0.5"/>             
                        <text width="100" fill="#fff"> 
                            {/* <textPath href="#curve-l" textLength="100%">
                            related 
                            </textPath>      */}
                        </text>               
                    </g>
                </svg>
            </div>
            <div className="absolute left-1/2">
                <svg width="301" height="301" viewBox="0 0 301 301" preserveAspectRatio="xMaxYMin meet" >
                    <g transform="translate(0,301)" stroke="#ffddbb" strokeWidth=".5">
                        <path id="curve-r" d="M0 0 m300 0 A300 300 0 0 0 0-300" fill="transparent" stroke="#ffddbb" strokeWidth="0.5"/>
                        <text width="100" fill="#fff"> 
                            {/* <textPath href="#curve-r" textLength="100%">
                                workshop
                            </textPath>      */}
                        </text>
                    </g>
                </svg>
            </div>
        </>
        );
  }
  
  export default TextHalfCirclePath;
  
  