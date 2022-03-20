import { useState, useEffect, useContext } from "react";
import ecpay from 'ecpay-aio-node';
import parse from 'html-react-parser';
import cookie from 'cookie';
import { useRouter } from "next/dist/client/router";

const  ECpay = ( {ecpay_html} ) => {

    const router = useRouter();

    useEffect(()=>{
      if( ecpay_html ) {
        router.reload(window.location.pathname)
      }
    },[ecpay_html]);

    return( ecpay_html ? parse(ecpay_html) : <> wait a moment pls </> );
};



/**
 *  DYNAMICALLY GEN PAGE WHEN 
 *  1. ASKING FOR PAYMENT PAGE
 *  2. BEING REDIRECTED TO /payment-result page automatically by ecpay.
 *  3. IF SUCCUSS showed in /payment-result, will redirect to thank-you page in a few min. 
 *      if FAILED, will gen a new ecpay html according to what's in cookie 
 */

export function parseCookies( req ) {
	return cookie.parse( req ? req.headers.cookie : '' );
}

export function getPaymentSessionToken( req ) {
	const cookies = parseCookies( req );
	return cookies || '' ;
}

export const randomValue = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function getUid(orderKey) {
  let ecpayUid= 'WC' + orderKey.replace(/wc_order_/g,'') ;
  return ecpayUid
}

export function formatDate(date) {
  let formattedDate = date.replace(/-/g, '/').replace('T',' ');
  return formattedDate
}

export function formatItemname(lineItems) {
  let formattedItemname = ''
  const itemsQty = lineItems.length

  lineItems.forEach(( item, i )=>{ 
    if ( i+1 !== itemsQty) {
      formattedItemname = item.name.concat('#', formattedItemname) 
    } else {
      formattedItemname += item.name
    }
  })

  return formattedItemname
}

export async function getServerSideProps(context) {

  var ecpay_html = '';

  let paymentSession = getPaymentSessionToken( context.req ).ecpaySession  ;
  paymentSession = JSON.parse(paymentSession);

  if ( paymentSession ) {
      const ecpay_api = new ecpay({
        operationMode: "Test",
        isProjectContractor: "N",
        ignorePayment: [],
        merchantInfo: {
            merchantID: process.env.ECPAY_MERCHANTID,
            hashKey: process.env.ECPAY_HASHKEY,
            hashIV: process.env.ECPAY_HASHIV
        }
      });  

      let base_param = {
          MerchantTradeNo: getUid(paymentSession.orderKey), //請帶20碼uid, 
          MerchantTradeDate: formatDate(paymentSession.date_created), 
          TotalAmount: paymentSession.total,      
          CustomField1: paymentSession.orderId,
          ItemName: formatItemname(paymentSession.line_items),
          // TradeDesc:'交易描述',
          // ReturnURL: 'https://the-livable-studio-multistage-6wimr3bvhq-de.a.run.app/api/ecpay-payment-result',
          ReturnURL: 'https://the-livable-site.vercel.app/api/ecpay-payment-result/',
          EncryptType:'1',
          // OrderResultURL: 'https://the-livable-studio-multistage-6wimr3bvhq-de.a.run.app/payment-result',
          OrderResultURL: 'https://the-livable-site.vercel.app/payment-result/',
          // ClientBackURL: `https://the-livable-site.vercel.app/thank-you`,
          NeedExtraPaidInfo:'Y',
          IgnorePayment:'CVS',
          // ItemURL: 'http://item.test.tw',
          // Remark: '交易備註',
          // HoldTradeAMT: '1',
          // StoreID: '',
      };
      // 電子發票
      let inv_params = {};

      ecpay_html = await ecpay_api.payment_client.aio_check_out_all(base_param, {}) 
  } else {
    ecpay_html = '<div> ORDER NOT CREATED</div>'
  }
  return {
    props: {
      ecpay_html: ecpay_html,
    },
  };
}
  
export default ECpay;

