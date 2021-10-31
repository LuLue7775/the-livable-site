import { getSession, useSession } from 'next-auth/client';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../src/components/context/AppContext";
import client from '../src/components/ApolloClient';
import { gql, useMutation, useQuery } from '@apollo/client';


import Header from '../src/components/Header';

export const REGISTER_USER2 = gql`
  mutation REGISTER_USER( $input: RegisterUserInput!) {
    registerUser( input: $input ) {
      user {
        id
        name
        email
      }
    }
  }
`;


export const GET_USER = gql`
  query GET_USER( $input: ID!) {
    __typename
    user(id: $input, idType: EMAIL) {
        id 
        name
    }
  }
`;


export default function Dashboard({ session, data }) {
    // const [ session ] = useSession();

    const [user, setUser] = useContext(UserContext);

    const [requestError, setRequestError] = useState(null);

    useEffect(()=>{ console.log(user) },[user]);
  
    const { data:getUserData, loading:getUserLoading, refetch } = useQuery(GET_USER, {
        variables: { input:"piece7775@hotmail.com.tw"  },
        notifyOnNetworkStatusChange: true,
        onCompleted: () => {

            setUser(getUserData);
        },
        onError: (error) => {
            console.log(error)

            if (error) {
                setRequestError(error?.graphQLErrors?.[0]?.message ?? '');
            }
        }
        
    });
  
    const [ registerUser, { data:registerUserData, loading:registerUserLoading, error }] = useMutation( REGISTER_USER2, {
        variables: { input:{ username:session.user.name, email:"piece7775@hotmail.com.tw" } },
        onCompleted: () => {
            // store to appContext
            setUser(registerUserData);
        }
    });
  
  
    useEffect(() => {
      const securePage = async () => {
        const session = await getSession()
        if ( session ) {
            setRequestError(null);
            refetch()
            // registerUser();
            // console.log(session)
        }
      }
  
      securePage()
    }, [])

  
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
                destination: `/signin`,
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