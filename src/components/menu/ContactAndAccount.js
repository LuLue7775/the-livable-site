import SvgInstagram from "../svg-icons/Instagram";
import SvgFacebook from "../svg-icons/Facebook"
import Link from "next/link";

const ContactAndAccount = () => {
    
     return (
    <ul>
        <li className="flex items-center font-light font-serif py-3">
            <a target="_blank" href="https://www.instagram.com/thelivablestudio/" rel="noopener noreferrer" className="pr-5">
                <SvgInstagram/>
            </a>
            <a target="_blank" href="https://www.facebook.com/thelivablestudio" rel="noopener noreferrer" className="pr-5 ">
                <SvgFacebook/>
            </a>
        </li>
        <li className="flex items-center font-light font-serif py-2 "> 
            info@thelivablestudio.com
        </li>
        <li className="flex items-center font-light font-serif py-2"> 
            <Link href="/policy">
                Policy
            </Link>
        </li>
        


    </ul>
 )
};

export default ContactAndAccount;