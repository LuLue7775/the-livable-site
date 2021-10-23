
import { useState, useEffect } from "react";

/** 
 * Loading effect 
 */
export default function useLoading(router) {
    const [isLoading, setLoading] = useState(false);
    // console.log("in useLoading: ",isLoading)
    useEffect(() => {
        const handleRouteChange = (url, { shallow }) => {(url !== router.asPath) && setLoading(true); } ;
    
        router.events.on('routeChangeStart', handleRouteChange)
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
            setLoading(null);
            
        }
      }, [])

      return isLoading
}