
function LangingPageArrowDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="100%" viewBox="0 0 320 624.5" >
      <g transform="translate(0,301)" stroke="#fff" fill="transparent" strokeWidth="1">
          <path id="curve-r" d="M310.5,310.5C310.5,139,171.48,0,0,0V1.51c170.7.27,309,139.4,309,311v312h1.5Z"/>
          <path d="M613-314.5"/><path d="M611,303.5" />
          <text className="font-light text-base" opacity=".8" > 
              <textPath href="#curve-r" startOffset="600" textLength="95%"  fill="transparent" stroke="#fff" strokeWidth="1">
                  SCROLL DOWN
              </textPath>     
          </text>
      </g>
      <g transform="translate(100,501)" stroke="#fff" fill="transparent" strokeWidth="1">
          <path d="M613-314.5" transform="translate(-149 -318.5)"/>
          <path d="M611,303.5" transform="translate(-149 -318.5)"/>
          <path d="M149,379.5a40,40,0,0,1,40,40" transform="translate(-149 -318.5)"/>
          <path d="M189,419.5a40,40,0,0,1,40-40" transform="translate(-149 -318.5)"/>
          <line x1="40" y1="100" x2="40"/>
      </g>
  </svg>

  );
}

export default LangingPageArrowDown;
