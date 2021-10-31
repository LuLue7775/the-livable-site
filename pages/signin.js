import { providers, signIn, getSession, useSession, csrfToken } from "next-auth/client";
import { useState, useEffect } from "react";
import axios from "axios";


export default function SignIn({ providers }) {

  const [ errorMessage, setErrorMessage ] = useState( null );
	const [ loading, setLoading ] = useState( false );

  useEffect(() => {
    const loginToWP = async () => {
      const session = await getSession();
      
      // if ( session ) {
      //     setLoading( true );
      //     setErrorMessage(null);

      //     return axios( {
      //         data: {
      //             username: session?.user?.name ?? '',
      //             password : String(session?.user?.id) ?? '',
      //             email : '12345@gmail.com' ?? ''
      //         },
      //         method: 'post', 
      //         url: '/api/login'
      //     }).then(
      //       (response) => { console.log(response) },
      //       (error) => { console.log(error) }, 
      //       (data) => {

      //         setLoading( false );
      //         const { success } = data?.data?? {};
      //         console.log(success)
      //     });
      // } else {
      //   // @todo get error of getSession
      //     console.log('getsession failed');
      // }

    }

    loginToWP()
  }, [])
  
  const handleClicked = (provider) => {
      signIn(provider.id, {
        callbackUrl: `${process.env.NEXTAUTH_URL}`,
      })

  }

  return (
    <>
    <div> this is the customed sigin in page </div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={ () => handleClicked(provider)} >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}
export async function getServerSideProps(context) {

  return { 
    props: { 
      providers: await providers() 
    } 
  };
}