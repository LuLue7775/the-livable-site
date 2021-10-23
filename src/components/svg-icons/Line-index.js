function LineIndex({i}) {
    return (
    <svg viewBox="0 0 200 600" height="100%" preserveAspectRatio="xMinYMin meet" className="invisible md:visible absolute top-24 right-0 text-base font-minor capitalize">
        <path stroke="#000" fill="transparent" strokeWidth="1" opacity="0.3" d="M 100 300 V 200 L 100 300"/>
        <text x="100" y="350" writingMode="tb">No.{i+1}</text>  
    </svg>
    );
  }
  
  export default LineIndex;
  