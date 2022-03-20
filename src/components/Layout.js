/**
 * Layout.js is applied globally in _app.js 
 * It holds global context, event listeners, fonts and styles
 */
import { AppProvider } from "./context/AppContext";
import client from "./ApolloClient";
import { ApolloProvider } from "@apollo/client";
import { useEffect } from 'react';


const Layout = (props) => {
  
  // disable right click globally
  useEffect(()=>{
    window.addEventListener('contextmenu', e => {
      e.preventDefault();
      });
    return window.removeEventListener('contextmenu', e => { e.preventDefault();  });

  }, []);

  return (
    
    <AppProvider>
        <ApolloProvider client={client}>
          <div>
            {/* <Header /> */}
            {props.children}
            {/* <Footer /> */}
          </div>
        </ApolloProvider>
    </AppProvider>
    
  );
};

export default Layout;
