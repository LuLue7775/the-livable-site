import { useRef, useEffect, useState } from "react"
import Header from "../src/components/Header";
import Image from "next/image";

export default function Policy() {

    const pageWrap = useRef(null);
    useEffect(() => {
        gsap.to(pageWrap.current, {opacity:1, duration:2, delay:1 })
    }, [])

    const privacyRef = useRef(null);
    const [ isPrivacyVisible, setPrivacyVisibility ] = useState(false);

    const handleClick = () => {
        setPrivacyVisibility(!isPrivacyVisible);
        
    };
    useEffect(()=>{
        if( isPrivacyVisible !== false ) {
            gsap.to(privacyRef.current,{ duration: 1, ease:'power1', opacity:1 })
        } else {
            gsap.to(privacyRef.current,{ duration: 1, ease:'power1', opacity:0, })

        }
    },[isPrivacyVisible]);


    return(
        <div ref={pageWrap} className="pageWrap ">
            <div className="relative z-50">
                <Header/>
            </div>
            <div className="fixed top-0 w-reset-screen h-screen opacity-90 z-0"> 
                <Image className="object-cover" src='/lobby.png' alt="background" layout="fill" />
            </div>
            <div className="h-100px"> </div>
            <div className="relative z-10 w-4/5 m-auto font-serif-ch text-base text-orange text-center overflow-hidden ">
                <h1 className="font-serif text-2xl m-4"> Privacy and Terms </h1>
                <div className="flex flex-col gap-4 ">
                    
                    <p> 
                        <h2 className="border border-orange p-4">  認知與接受條款 </h2>
                        <ul className="p-4 m-4 text-left list-decimal ">
                            <li> 若顧客完成會員註冊手續或開始使用本線上購物網之服務，就視為已知悉、並同意本服務條款之所有內容及其後修改變更。 </li>
                            <li> 若為未滿二十歲之顧客，應於法定代理人閱讀、知悉並同意本服務條款之所有內容及其後修改變更後，方得使用。 </li>
                            <li> 若未滿二十歲之顧客開始使用本線上購物網時，即推定您的法定代理人已閱讀、知悉並同意接受本服務條款之所有內容及其後修改變更。</li>
                            <li> 顧客及本公司雙方同意以電子文件作為意思表示之方式。 </li>
                            <li> 若您不同意本服務條款之任何內容或其後修改變更，建議您立即停止使用本線上購物網之服務。 </li>
                        </ul>
                    </p>
                    
                    <p> 
                        <h2 className="border border-orange p-4"> 隱私權保護政策 </h2> 
                        <p className="p-4 m-4 text-left ">關於您註冊或使用本服務時所提供之個人資料，本公司將依「
                        {<button className="text-red-500" onClick={handleClick}>隱私權保護政策</button>}」為蒐集、處理、利用與保護。</p>
                        <div ref={privacyRef} className={`${isPrivacyVisible ? `` : `hidden` } `}>  
                            <div> 可居股份有限公司(以下稱本公司)與本公司之關係企業，為了滿足顧客需求，及提供便利且高品質的服務，將依法活用顧客所提供之個人資料。本公司非常重視顧客個人資料的保護，並將盡力避免個人資料之竊取、洩漏、遺失、竄改等情事之發生。為了保護顧客隱私並遵循個人資料保護法及相關法令之規定，特制定本隱私權保護政策，本隱私權保護政策之內容如下供您參考。本公司將要求全體員工以及本公司委託處理營業、物流等相關事務之第三人與其員工，於蒐集、處理、利用顧客個人資料時，確認已理解並同意加以遵守本隱私權保護政策之規定。</div>
                            <p> 
                                <h2 className="border border-orange p-4"> 個人資料保護方針 </h2> 
                                <p className="p-4 m-4 text-left ">本公司將遵守以下個人資料保護方針。可居線上購物網(以下稱本線上購物網)向顧客蒐集而保有的個人資料及本公司經由正當程序向第三方取得而保有的個人資料，將供本公司按原來向顧客說明之目的與範圍進行利用。除非本公司已事先說明或依相關法令規定辦理者外，本公司不會未經顧客同意即將其個人資料公開、提供給與本線上購物網無關之第三人，或為特定目的以外之利用。</p>
                                <ul className="p-4 m-4 text-left list-decimal">
                                    <li> 蒐集目的－本公司蒐集個人資料之目的在於網路購物及其他電子商務服務、商品銷售、契約管理、確認及履行與顧客之交易內容、商品之配送(物流)及付款等服務(包含信用卡等金融交易授權)、商品及服務之說明、廣告行銷、顧客及會員管理與服務(包含會員相關權益通知)、贈獎活動、調查、統計與研究分析、資訊與資料庫管理、其他契約相關業務(包含售後服務)及履行法定義務有所必要者。 </li>
                                    <li> 蒐集之個人資料類別－本公司依所提供之服務需要，可能需要請您提供之個人資料種類，包含基本資料及帳務資料：基本資料(包含訂購人及收件人)：姓名、性別、出生年月日、電子郵件信箱、聯絡電話、行動電話、地址、身分證字號、會員帳號及密碼(如為會員)等資料。帳務資料：支付方式、金融帳戶之號碼、信用卡帳號、交易帳戶號碼、訂單編號、訂單商品明細、消費金額及其他交易資料等資料。</li>
                                    <li> 利用之期間及地區－期間：至當事人要求停止蒐集、處理或利用，或者本公司停止提供服務之日為止。 地區：顧客之個人資料將用於台灣地區。</li>
                                    <li> 利用之對象及方式－本公司及本公司委託處理營業、商品銷售、物流、行銷等相關事務之第三人(例如金融機構、供應商、合作企業、物流公司等服務提供者)將依照前述特定目的，於進行相關作業之必要範圍內揭露、處理或利用個人資料，本公司將不會向前述以外之第三人揭露您的個人資料，但法令另有規定或經取得您書面同意者，不在此限。</li>
                                    <li> 顧客就其個人資料之權利－查詢或請求閱覽。<br/>請求製給複製本。<br/>請求補充或更正。<br/>請求停止蒐集、處理或利用。<br/>請求刪除。<br/>您如欲行使上述權利，請寄信至客服信箱：info@thelivablestudio.com，客服人員將以適當的方式確認您是否確為當事人本人或有權代為行使權利之人，並於合理的期間及範圍內協助處理相關事宜。 ※若您查詢、請求閱覽個人資料或請求製給複製本，本公司得酌收必要成本費用。</li>
                                
                                    <li> 權益影響－本公司在此提醒您，若您不願意提供您的個人資料供本公司依法進行蒐集、處理、利用，或您未能提供您的完整個人資料， 本公司將尊重您的決定，但您可能因此無法享受本線上購物網完整的服務或完全無法使用本線上購物網之服務。若您提供之資料不正確或正確性有爭議，亦可能不受此隱私權保護政策之保護。(例如金融機構、供應商、合作企業、物流公司等服務提供者)將依照前述特定目的，於進行相關作業之必要範圍內揭露、處理或利用個人資料，本公司將不會向前述以外之第三人揭露您的個人資料，但法令另有規定或經取得您書面同意者，不在此限。</li>
                                    <li> 本公司已設置個人資料保護組織，並選定個人資料保護管理者，建立個人資料保護制度以防範風險發生。(例如金融機構、供應商、合作企業、物流公司等服務提供者)將依照前述特定目的，於進行相關作業之必要範圍內揭露、處理或利用個人資料，本公司將不會向前述以外之第三人揭露您的個人資料，但法令另有規定或經取得您書面同意者，不在此限。</li>
                                    <li> 本公司全體員工以及本公司委託處理營業、物流等相關事務之第三人與其員工，在處理本公司保有之個人資料時，將實行合理的安全管理措施來防止資料遭竊取、洩漏、遺失、竄改及毀損。並遵守個人資料保護相關法令、政策及其他規範。本公司並將定期或不定期對本公司全體員工及本公司委託處理營業、物流等相關事務之第三人之員工實施個人資料保護相關宣導、教育訓練，使其徹底理解本方針、加強守法意識。(例如金融機構、供應商、合作企業、物流公司等服務提供者)將依照前述特定目的，於進行相關作業之必要範圍內揭露、處理或利用個人資料，本公司將不會向前述以外之第三人揭露您的個人資料，但法令另有規定或經取得您書面同意者，不在此限。</li>
                                    
                                    <li> 本公司會對個人資料保護體制及其相關規則、個人資料保護管理系統定期評鑑、重新審視並持續改善。(例如金融機構、供應商、合作企業、物流公司等服務提供者)將依照前述特定目的，於進行相關作業之必要範圍內揭露、處理或利用個人資料，本公司將不會向前述以外之第三人揭露您的個人資料，但法令另有規定或經取得您書面同意者，不在此限。</li>
                                    <li> 隱私權保護政策修訂－本公司將因應相關法令修正、經濟社會環境之變遷及科技之進步，不時修訂本隱私權保護政策之內容，修訂後之版本將於本線上購物網公告周知，或以其他適當方式通知顧客，您得隨時於本線上購物網檢視本隱私權保護政策之最新內容。(例如金融機構、供應商、合作企業、物流公司等服務提供者)將依照前述特定目的，於進行相關作業之必要範圍內揭露、處理或利用個人資料，本公司將不會向前述以外之第三人揭露您的個人資料，但法令另有規定或經取得您書面同意者，不在此限。</li>
                                    <li> 客服窗口－您若有任何意見、建議、諮詢或疑問等，請寄信至客服信箱：info@thelivablestudio.com，客服人員將儘速與您聯繫。您寶貴的意見、建議，將作為本公司持續改善之參考(例如金融機構、供應商、合作企業、物流公司等服務提供者)將依照前述特定目的，於進行相關作業之必要範圍內揭露、處理或利用個人資料，本公司將不會向前述以外之第三人揭露您的個人資料，但法令另有規定或經取得您書面同意者，不在此限。</li>
                                </ul>
                                <h2 className="border border-orange p-4"> COOKIE利用相關 </h2> 
                                <p className="p-4 m-4 text-left ">Cookie是瀏覽紀錄的一種，能讓顧客瀏覽網頁時更加便利。本公司不會經由Cookie蒐集顧客的個人資料或可判別個人資料的資訊，或對顧客的電腦造成不良影響。本網站將根據瀏覽紀錄cookie，於Yahoo奇摩、Google等第三方廣告媒體網站上，投放顧客有興趣之本公司廣告。若顧客不希望看到依據瀏覽記錄投放之廣告，可依下方網站的說明設定。</p>

                            </p>
                        </div>
                    </p>
                    <p> 
                        <h2 className="border border-orange p-4"> 條款之改定 </h2> 
                        <p className="p-4 m-4 text-left ">本公司保留於任意時間改定本條款內容之權利，並於修改後公佈於本線上購物網，不另行個別通知使用者，建議您隨時留意本服務條款之最新內容。改定之內容於本線上購物網公告時立即生效。</p>
                    </p>
                    <p> 
                        <h2 className="border border-orange p-4"> 條款之改定 </h2> 
                        <p className="p-4 m-4 text-left ">本公司保留於任意時間改定本條款內容之權利，並於修改後公佈於本線上購物網，不另行個別通知使用者，建議您隨時留意本服務條款之最新內容。改定之內容於本線上購物網公告時立即生效。</p>
                    </p>

                    <p> 
                        <h2 className="border border-orange p-4"> 智慧財產權 </h2> 
                        <p className="p-4 m-4 text-left ">本線上購物網使用之軟體、程式及所有內容，包括但不限於所刊登之資料、圖像和網頁設計，著作權等智慧財產權皆為本公司或資料提供之其他智慧財產權人所有，若欲使用、修改、重製或以其他任何方式利用前述軟體、程式及網站內容，需依法取得本公司或其他智慧財產權人的事前書面同意。 若有違反前述規定，本公司或其他智慧財產權人有權請求損害賠償。</p>
                    </p>

                    <p> 
                        <h2 className="border border-orange p-4">  暫停服務 </h2>
                        <ul className="p-4 m-4 text-left list-decimal">
                            <li> 對本服務相關軟硬體設備進行必要之搬遷、更換、升級、保養或維修，並已於本線上購物網公告周知或以其他適當方式通知顧客者。 </li>
                            <li> 顧客有任何違反法令或本服務條款之規定或有違反前述規定之虞者。</li>
                            <li> 因天災或其他不可抗力情事而導致全部或部分之服務停止、中斷或受到影響。</li>
                            <li> 因其他非可歸責於本公司之情事而導致全部或部分之服務停止、中斷或受到影響。</li>
                            <li> 因非本公司得控制之事由而導致服務資訊顯示不正確、或遭偽造、竄改、刪除或擷取、或致系統中斷、不能正常運作或受到其他影響。</li>
                        </ul>
                    </p>

                    <p> 
                        <h2 className="border border-orange p-4">  免責聲明 </h2>
                        <ul className="p-4 m-4 text-left ">
                            <li> 1.本公司保留全部或部分變更、廢止本線上購物網服務之權利，所造成之任何直接或間接之損害，本公司不負任何賠償責任。 </li>
                            <li> 2.本公司不擔保於本線上購物網無償提供資料內容之真偽、正確性、即時性、有效性、可依賴性、合適性及損害第三者權利等責任。</li>
                            <li> 3.若發生電子通信服務或電腦等設備障礙，導致系統中斷、延遲、中止、資料消失、資訊不正確等情形，所造成之任何直接或間接之損害，本公司不負任何賠償責任。</li>
                        </ul>
                    </p>

                    <p> 
                        <h2 className="border border-orange p-4"> 其他 </h2> 
                        <p className="p-4 m-4 text-left ">本服務條款中，若有任何條款全部或一部分無效之情形，並不影響其他條款之效力。 本服務條款的解釋和適用、或與本服務條款有關之事項，及顧客與本公司的關係(包含因交易行為而產生之爭議或糾紛)均適用中華民國法律。 萬一發生爭議或糾紛，雙方應以秉持誠意解決為前提，如不得已需進入訴訟程序時，您與本公司同意以臺灣新北地方法院為第一審管轄法院。 若有違反前述規定，本公司或其他智慧財產權人有權請求損害賠償。</p>
                    </p>

                    <p className="p-12 "> 最近一次更新條款：2021 年 11 月 5 日 </p>
                </div>
            </div>
        </div>
        )
  }

