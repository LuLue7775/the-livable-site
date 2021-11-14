import cookie from 'cookie';

const handler = ( req, res ) => { 

	/**
     * Note when you run 'npm run start' locally, cookies won't be set, because locally process.env.NODE_ENV = 'production'
     * so secure will be true, but it will still be http and not https , when tested locally.
     * So when testing locally both in dev and prod, set the value of 'secure' to be false.
     */
		res.setHeader( 'Set-Cookie', cookie.serialize( 'ecpaySession', JSON.stringify( req.body.ecpayCheckoutData ?? '' ) , {
			httpOnly: true,
			secure: 'development' !== process.env.NODE_ENV,
			path: '/',
			maxAge: 60 * 60 * 24 * 1 // 1 day
		} ) );
	
		res.status( 200 ).json( { success: Boolean( req.body )} );

};
export default handler;
