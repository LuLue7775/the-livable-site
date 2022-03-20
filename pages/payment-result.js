import Header from '../src/components/Header';
import Image from 'next/image';
import ecpay from 'ecpay-aio-node';
import ContactAndAccount from '../src/components/menu/ContactAndAccount';
const Result = ( { TradeNo, TradeDate, amount, itemname } ) => {

    return (
        <>  
            <div className="relative z-50">
                <Header/>
            </div>
            <div className="fixed top-0 w-reset-screen h-screen opacity-90 z-0"> 
                <Image className="object-cover" src='/lobby.png' alt="background" layout="fill" />
            </div>

            <div className="h-100px"> </div>
            <div className="relative z-10 w-4/5 m-auto font-serif text-base text-orange text-center overflow-hidden ">
                <h1 className="font-serif text-2xl m-4"> Thank you for your order! </h1>
                <div className='my-6'> We appreciate your support. </div>
                <div className="flex flex-col gap-4 border border-green-light py-6">              
                    <div> 訂單編號: {TradeNo} </div>
                    <div> 日期:{TradeDate} </div>
                    <div> 商品:{itemname} </div>
                    <div> 金額:{amount} </div>
                </div>
                <div className='my-6 '> Stay tuned for our new art projects!</div>
                <ContactAndAccount/>
                
            </div>
        </>
    )
};
export default Result;


export async function getServerSideProps({ req }) {

    var arr = [];
    var obj = {};

    if (req.method === "POST") {
    // if(true){
        var body = '';

        var isChkMacValueCorrrect = false;
        var isPaid = false;

        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', () => {

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
        });
    } ;

    return { 
        props: { 
            TradeNo: obj?.TradeNo ?? '',
            TradeDate: obj?.TradeDate ?? '', 
            amount: obj?.amount ?? '',
            itemname: obj?.itemname ?? 'Item',

        } 
    };
};


  
// # 取得交易使用者資訊
// uid = trade_detail.uid

// trade_client_detail = {
//     'name': trade_detail.trade_name,
//     'phone': trade_detail.trade_phone,
//     ‘county’: trade_detail.trade_county,
//     ‘district’: trade_detail.trade_district,
//     ‘zipcode’: trade_detail.trade_zipcode,
//     ‘trade_address’: trade_detail.trade_address
// }

// # 判斷成功
// if result == ‘Succeeded’:
//     trade_detail.status = ‘待處理’
//     commit_list = []

//     # 移除 AddToCar (狀態：Y 修改成 N)
//     carts = sql.AddToCar.query.filter_by(uid=uid, state=‘Y’)
//     for cart in carts:
//         price = cart.product.price
//         quan = cart.quantity
//         cart.state = 'N'
//         # 新增 Transaction_detail 訂單細項資料
//         Td = sql.Transaction_detail(tid, cart.product.pid, quan, price)
//         commit_list.append(Td)
//         commit_list.append(cart)

//     db.session.add_all(commit_list)
//     db.session.commit()

//     # 讀取訂單細項資料
//     trade_detail_items = sql.Transaction_detail.query.filter_by(
//         tid=tid)

//     return render_template('/payment/trade_success.html',
//                            shopping_list=trade_detail_items,
//                            total=trade_detail.total_value)

// # 判斷失敗
// else:
//     carts = sql.AddToCar.query.filter_by(uid=uid, state='Y')
//     trade_detail = sql.Transaction.query.filter_by(tid=tid).first()

//     return render_template('/payment/trade_fail.html',
//                            shopping_list=carts,
//                            total=trade_detail.total_value,
//                            trade_client_detail=trade_client_detail)