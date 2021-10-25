import SvgInstagram from "../svg-icons/Instagram";
import SvgFacebook from "../svg-icons/Facebook"
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from "next/link";

const ContactAndAccount = () => {
    /* @TODO need to store session */
    const [session, loading] = useSession();
    // console.log({session,loading})

 return (
    <>
        <li className="flex items-center font-light font-serif py-3">
            <a target="_blank" href="https://www.instagram.com/thelivablestudio/" rel="noopener noreferrer" className="pr-5">
                <SvgInstagram/>
            </a>
            <a target="_blank" href="https://www.facebook.com/thelivablestudio" rel="noopener noreferrer" className="pr-5 ">
                <SvgFacebook/>
            </a>
        </li>
        <li className="flex items-center font-light font-serif py-2 text-green-1000 cursor-pointer"> info@thelivablestudio.com</li>
        <li className="flex items-center font-light font-serif py-2 text-green-1000 cursor-pointer"> Policy</li>

        { session && (
            <Link href='/dashboard'>
                <a>
                    <li className="flex items-center font-semibold font-serif py-2 text-green-1000 "> Dashboard </li>
                </a>
            </Link>
        )}
        { !loading && !session && (
            <Link href='/signin'>
                <a onClick={ e => { e.preventDefault(); signIn(); } }>
                    <li className="flex items-center font-semibold font-serif py-2 text-green-1000 "> Sign In</li>
                </a>
            </Link>
        )}
        { session && (
            <Link href='/api/auth/signout'>
                <a onClick={ e => { e.preventDefault(); signOut(); } }>
                    <li className="flex items-center font-semibold font-serif py-2 text-green-1000 "> Sign Out</li>
                </a>
            </Link>
        )}

    </>
 )
};

export default ContactAndAccount;