import { getSession, useSession } from 'next-auth/client';

import Header from '../src/components/Header';

export default function Dashboard({ data }) {
    const [session] = useSession(); 
console.log(session)
    // if (loading) {
    //     return <h1> LOADING ...</h1>
    // }
    return (
        <>
        <div className="relative z-50">
            <Header/>
        </div>
        <h1> {data} </h1>
        </>
    )

};



export async function getServerSideProps(context){
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: `/api/auth/signin`,
                permanent: false,
            }, 
        }
    }
    return {
        props: {
            session,
            data: session ? 'you have logged in': 'pls log in'
        }
    }
}