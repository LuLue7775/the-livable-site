function BackBtn() {
    return (
        <>
        <svg xmlns="http://www.w3.org/2000/svg" width="30px"  viewBox="0 0 76.8 76.8">
            <path className="cls-back-btn" fill="#c3f33f" d="M51.3,60.63l-1.42-.73c5.36-10.34,2.74-25.07,2.71-25.22C52,28,44.71,19.2,38.16,19.2S26.39,24,26.39,29.81l0,.23c0,.09-2.5,8.74,7,22.38l-1.09,1.13-18.1-11.5L15,40.7l15,9.53c-7.16-11.85-5.52-19.44-5.23-20.54.07-6.67,6-12.09,13.37-12.09s15.32,9.5,16,16.86C54.28,35,56.92,49.81,51.3,60.63Z" />
            <path className="cls-back-btn" fill="#c3f33f" d="M38.5,0A38.4,38.4,0,1,0,76.8,38.5v-.1A38.49,38.49,0,0,0,38.5,0Zm0,75.3A36.9,36.9,0,1,1,75.4,38.4,36.9,36.9,0,0,1,38.5,75.3Z" />     
        </svg>
        <span className=" text-sm font-light italic text-green-light hover:underline group-hover:text-red-400"> back </span>
        </>
        );
  }
  
  export default BackBtn;
  
  