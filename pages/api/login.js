import cookie from 'cookie';

import client from '../../src/components/ApolloClient';
// import LOGIN from '../mutations/login';
import { v4 } from 'uuid';

import { gql, useMutation, useQuery } from '@apollo/client';
import { session } from 'next-auth/client';

export const LOGIN = gql`
    mutation LOGIN ( $input: LoginInput!) {
        login(input: $input) {
            authToken
            user {
                id
                username
                name
                email
                firstName
                lastName
            }
        }
    }
`;

export const REGISTER_USER = gql`
    mutation RegisterUser( $input: RegisterUserInput!) {
        registerUser( input: $input ) {
            user {
                jwtAuthToken
                jwtRefreshToken
            }
        }
    }
  `;

// from proxy endpoint send query to wp 
export async function loginUser( {username, password } ) {

	const { data, errors } = await client.query( { 
		query: LOGIN,
		variables: {
			input: {
				clientMutationId: v4(), // Generate a unique id
				username: username || '',
                password: password || ''
			},
		},
	} );

    if ( errors ) { console.log(errors) };

	return data || {};
}

export async function registerUser( {username, password, email } ) {

	const { data, errors } = await client.query( { 
		query: REGISTER_USER,
		variables: {
			input: {
				username: username || '',
                password: password || '',
                email: email || ''
			},
		},
	} );

    if ( errors ) { console.log(errors) };
 
	return data || {};
}

// proxy endpoint
export default async function login( req, res ) {
    const { username, password, email } = req?.body ?? {};
    // const data = await loginUser( {username, password} ); 

    // const [ registerUser, { data:registerUserData, loading:registerUserLoading, error }] = useMutation( REGISTER_USER, {
    //     variables: { input:{ username:username, password:username ,email:"piece7775@hotmail.com.tw" } },
    //     onCompleted: () => {
    //         // store to appContext
    //         return registerUserData
    //     }
    // });

    const data = await registerUser( {username, password, email} ); 

console.log(data);
// console.log(req);

    /**
     * Note when you run 'npm run start' locally, cookies won't be set, because locally process.env.NODE_ENV = 'production'
     * so secure will be true, but it will still be http and not https , when tested locally.
     * So when testing locally both in dev and prod, set the value of 'secure' to be false.
     */
    res.setHeader( 'Set-Cookie', cookie.serialize( 'auth', String( data ?? '' ), {
		httpOnly: true,
		secure: 'development' !== process.env.NODE_ENV,
		path: '/',
		maxAge: 60 * 60 * 24 * 7 // 1 week
	} ) );

    // Only sending a message that successful, because we dont want to send JWT to client.
	res.status( 200 ).json( { success: Boolean( data )} );

}