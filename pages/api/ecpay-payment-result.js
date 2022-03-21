
// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };
import { buffer } from "micro";
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
    origin: "*",
    methods: ['GET', 'HEAD', 'POST'],
    allowedHeaders:['Content-Type', 'Authorization']
    // preflightContinue: false,
    // optionsSuccessStatus: 204
  
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  if (req.method === 'POST' ) {
    var arr = [];
    var obj = {};
    const body = await buffer(req.body);

    try {

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
      let decoded_body = decodeURIComponent(body);
      
      arr = decoded_body.split('&');
      
      arr.forEach((prop, i)=>{
        let key = prop.split('=')[0];
        let value = prop.split('=')[1]; 
        obj[key] = value;
      });
      
      isPaid = obj['RtnCode:'];
  // console.log('isPaid:', isPaid);     
      if ( isPaid !== 1 ) { return };

      // checksum validation first             
      isChkMacValueCorrrect = ecpay_api.payment_client.helper.valid_chkmc_string(decoded_body);
  // console.log('isChkMacValueCorrrect:', isChkMacValueCorrrect);
      if ( !isChkMacValueCorrrect ) { return };

      var orderId = obj.MerchantTradeNo;
      
      try {
          await updateOrder( 'processing', orderId,  );
      } catch (error) {
          await updateOrder( 'failed', orderId );
          console.error('Update order error', error);
      }

      res.status(200).write("1|OK");
      res.end();
    } catch {
      res.status(500).write("FAILED");
      res.end();
      return;
    }

  };
  

}
  


const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3"
});

const updateOrder = async ( newStatus, orderId, CustomField1, transactionId = '', payment_method = '', PaymentType = '', 
          card4no = '', process_date='', auth_code='' ) => {

    let newOrderData = {
        status: newStatus,
        itemWcId: '' 
    }

    newOrderData.itemWcId = CustomField1;

    if ( transactionId ) {
        newOrderData.transaction_id = transactionId;
    } 
    if ( payment_method ) {
        newOrderData.payment_method = payment_method;
    }
    if ( PaymentType ) {
        newOrderData.PaymentType = PaymentType;
    }
    if ( card4no ) {
        newOrderData.card4no = card4no;
    }
    if ( process_date ) {
        newOrderData.process_date = process_date;
    }
    if ( auth_code ) {
        newOrderData.auth_code = auth_code;
    }

    try {
        // tell woocommerce rest api that payment is made or not. 
        const {data} = await api.put( `orders/${ orderId }`, newOrderData ); 
        console.log( '✅ Order updated data', data );
    } catch (ex) {
        console.error('Order creation error', ex);
        throw ex;
    }
}


export default handler;