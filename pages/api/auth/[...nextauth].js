import NextAuth from "next-auth";
import { session } from "next-auth/client";
import Providers from "next-auth/providers";

const options = {
    
    providers: [ 
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // Providers.Google({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET,
        // }),
        // Providers.Facebook({
        //     clientId: process.env.FACEBOOK_ID,
        //     clientSecret: process.env.FACEBOOK_SECRET,
        // }),
    ],
    session: {
        jwt:true,
    },
    jwt: {
        secret:'123546',
        encryption: true,
    },
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session(session, token) {
            session.user.id = token.id
            return session
        },
        async redirect(url, baseUrl) {
            return url.startsWith(baseUrl)
              ? url
              : baseUrl
          }
    },
    // pages: {
    //     signIn: '/signin',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    //   }

};

export default (req, res) => NextAuth(req, res, options);