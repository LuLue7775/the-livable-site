

const Result = (  ) => {
    return (
        <>  
            TEST
            {/* { query && query}
            { message && message} */}
        </>
    )
};
export default Result;


export const getServerSideProps = async ({ req }) => {
    if (req.method == "POST") {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk
      })
      req.on('end', () => {
        console.log(body);
    });
    }
    return { props: {} };
};


// export async function getServerSideProps({  req, res }) {
//     let data = [
//         {
//             merchantID: '',
//             merchantTradeNo: '',
//             storeID: '',
//             rtnMsg: '',
//             paymentDate: '',
//             paymentType: '',
//             tradeAmt: ''
//         }
//     ]


//     if (req.method === "POST") {
//         await req.body

//         // data[0].merchantID = req.body.MerchantID; //會員編號
//         // data[0].merchantTradeNo = req.body.MerchantTradeNo; //交易編號
//         // data[0].storeID = req.body.StoreID; //商店編號
//         // data[0].rtnMsg = req.body.RtnMsg; //交易訊息
//         // data[0].paymentDate = req.body.PaymentDate; //付款時間
//         // data[0].paymentType = req.body.PaymentType; //付款方式
//         // data[0].tradeAmt = req.body.TradeAmt; //交易金額


//         // console.log("result: " + JSON.stringify(result));
// // console.log('data= ', data[0] )
//     }
//     return {
//         props: { 
//             data: req.body ?? 'didnt get'
//         }
//     }
// }
  
    