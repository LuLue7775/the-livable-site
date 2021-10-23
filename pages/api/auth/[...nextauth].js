import NextAuth from "next-auth";
import { session } from "next-auth/client";
import Providers from "next-auth/providers";

export default NextAuth({
    
    providers: [ 
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
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
        }
    }
})
