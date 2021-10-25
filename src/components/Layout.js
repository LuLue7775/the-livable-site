/**
 * Layout.js is applied globally in _app.js 
 * It holds global context, event listeners, fonts and styles
 */
import { AppProvider } from "./context/AppContext";
import client from "./ApolloClient";
import Router from "next/router";
import NProgress from "nprogress";
import { ApolloProvider } from "@apollo/client";
import { useEffect } from 'react';

import { Provider } from 'next-auth/client';

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());


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
      <Provider >
        <ApolloProvider client={client}>
          <div>
            {/* <Header /> */}
            {props.children}
            {/* <Footer /> */}
          </div>
        </ApolloProvider>
      </Provider>
    </AppProvider>
    
  );
};

export default Layout;
