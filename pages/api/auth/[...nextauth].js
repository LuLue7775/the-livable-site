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
            //not really functioning. is the callbackUrl in signIn client functions redirecting successfully
            return url.startsWith(baseUrl)
              ? url
              : baseUrl
        },

        async signin(user, account, profile) {
            // https://developer.github.com/v3/users/emails/#list-email-addresses-for-the-authenticated-user
            const res = await fetch('https://api.github.com/user/emails', {
                headers: {
                'Authorization': `token ${account.accessToken}`
                }
            })
            const emails = await res.json()
            if (!emails || emails.length === 0) {
                return
            }
            // Sort by primary email - the user may have several emails, but only one of them will be primary
            const sortedEmails = emails.sort((a, b) => b.primary - a.primary)
            profile.email = sortedEmails[0].email

            if (typeof user.userId !== typeof undefined)
            {
                if (user.isActive === '1')
                {
                    return user;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        },
    },
    pages: {
        signIn: '/signin',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
      }

};

export default (req, res) => NextAuth(req, res, options);