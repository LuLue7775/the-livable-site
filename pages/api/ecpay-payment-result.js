import { buffer } from "micro";

export const config = {
    api: {
        bodyParser: false,
    },
};

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3"
});

const updateOrder = async ( newStatus, orderId, transactionId = '', payment_method = '' ) => {

    let newOrderData = {
        status: newStatus
    }

    if ( transactionId ) {
        newOrderData.transaction_id = transactionId
    } 
    if ( payment_method ) {
        newOrderData.payment_method = payment_method
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


const handler = async (req, res) => {

    if (req.method == "POST") {
        // const result = await buffer(req);
        const result = await req.body;

        // var rtnCode = result.body.RtnCode;
        // var simulatePaid = result.body.SimulatePaid;
        // var merchantID = result.body.MerchantID;
        // var merchantTradeNo = result.body.MerchantTradeNo;
        // var orderId = result.body.CustomField1;
        // var storeID = result.body.StoreID;
        // var rtnMsg = result.body.RtnMsg;
        // // var tradeNo = result.body.TradeNo;
        // var tradeAmt = result.body.TradeAmt;
        // // var payAmt = result.body.PayAmt;
        // var paymentDate = result.body.PaymentDate;
        // var paymentType = result.body.PaymentType;
        // // var paymentTypeChargeFee = result.body.PaymentTypeChargeFee;
        // var CheckMacValue = result.body.CheckMacValue;
//要驗證
// function verify_mac_value

        // let paymentInfo = {
        //     merchantID: merchantID,
        //     merchantTradeNo: merchantTradeNo,
        //     storeID: storeID,
        //     rtnMsg: rtnMsg,
        //     paymentDate: paymentDate,
        //     paymentType: paymentType,
        //     tradeAmt: tradeAmt
        // }

        //(添加simulatePaid模擬付款的判斷 1為模擬付款 0 為正式付款)
        //測試環境
        if (req.body.RtnCode === "1" && req.body.SimulatePaid === "1") {

            // 這部分可與資料庫做互動
            res.status(200).write("1|OK");
            res.end();

            // try {
            //     // update order according to paymentTypes 
            //     //  if credit if atm if webatm 
            //     await updateOrder( 'processing', orderId, merchantTradeNo, paymentType )                     
            // } catch(err) {
            //     await updateOrder( 'failed', session.metadata.orderId );
            //     console.error('Update order error', error);
            // } 

            // try {
            //     // kill cookie session
            //     axios( {
            //         data: { ecpayCheckoutData },
            //         method:'get',
            //         url:'/api/destroy-ecpay-session'
            //     }).catch ( (err)=> {
            //         console.log(err)
            //     });
            // } catch(err) {
            //     console.error('Kill cookie failed', err);
            // } 



        }
        //正式環境
        else if (req.body.RtnCode === "1" && req.body.SimulatePaid === "0") {
        // 這部分可與資料庫做互動

        } 
        else {
            res.status(500).write("0|err");
            res.end();
        }
    }

};

export default handler;