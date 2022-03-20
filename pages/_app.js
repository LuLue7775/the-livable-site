import "../src/styles/style.scss";
import "../src/styles/main.scss";
import Head from "next/head";
import Router from 'next/router';
export { throttle, debounce } from 'lodash'

import Layout from "../src/components/Layout";

function MyApp({ Component, pageProps, router,  }) {

  return (
    
    <Layout >
      <Head>
        <title>The Livable Studio</title>
        <link rel="shortcut icon" href="/favicon.ico" crossOrigin="anonymous"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js" crossOrigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/ScrollTrigger.min.js" crossOrigin="anonymous"></script>

        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous"/>
        <link  crossOrigin="anonymous"href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Josefin+Slab:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Playfair+Display:wght@400;500;600&family=Noto+Serif+TC:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      
        <link
            rel="preload"
            href="/fonts/culture-bold-webfont.woff2"
            as="font"
            crossOrigin="anonymous"
          />

      </Head>

      <Component {...pageProps} />


    </Layout>
  )
  
}

export default MyApp

