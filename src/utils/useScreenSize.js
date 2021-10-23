import { useState, useEffect } from "react";

export default function useScreenSize() {
    const isSSR = typeof window !== "undefined";
    const [ screenSize, setScreenSize ] = useState({
        width: isSSR ? window.innerWidth : '',
        height: isSSR ? window.innerHeight : '',
    });
    const updateScreenSize = () => {
        setScreenSize({ width: window.innerWidth, height: window.innerHeight } );
    }

    useEffect( () => {
        if (typeof window !== "undefined") {
            window.addEventListener("resize", updateScreenSize );
        }
        return () => {
            window.removeEventListener("resize", updateScreenSize );
            
        };
    }, []);

    return screenSize;
}


