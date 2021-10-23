function TextRoundPath( {text} ) {
    return (
    <svg viewBox="0 0 200 200" height="25%" preserveAspectRatio="xMinYMin meet" textLength="100%" className="invisible md:visible absolute top-24 right-0 text-base font-minor capitalize">
        <path id="curve" fill="transparent" d=" M 100,100 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0 "/>  
        <text width="100" > 
            <textPath href="#curve" textLength="100%">
            {text}
            </textPath>     
        </text>
    </svg> 
    );
  }
  
  export default TextRoundPath;
  
  