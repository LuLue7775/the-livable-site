import "../src/styles/style.scss";
import "../src/styles/main.scss";
import Head from "next/head";
import Router from 'next/router';
import NProgress from 'nprogress';
export { throttle, debounce } from 'lodash'

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import Layout from "../src/components/Layout";

function MyApp({ Component, pageProps, router }) {


  return (
    
    <Layout >
      <Head>
        <title>The Livable Studio</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/ScrollTrigger.min.js"></script>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Josefin+Slab:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Playfair+Display:wght@400;500;600&family=Noto+Serif+TC:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      </Head>

      <Component {...pageProps} />


    </Layout>
  )
  
}

export default MyApp

