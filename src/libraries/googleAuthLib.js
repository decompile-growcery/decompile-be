/* Adapted from https://medium.com/@jackrobertscott/how-to-use-google-auth-api-with-node-js-888304f7e3a0 */
import { google } from 'googleapis';
require('../config/googleAuthConfig');

class GoogleAuthLib {
	constructor() {
		this.auth_code = "";
	}

	/* Helper */
	createConnection() {
		return new google.auth.OAuth2(
			googleConfig.clientId,
			googleConfig.clientSecret,
			googleConfig.redirect
		);
	}
	
	getConnectionUrl(auth) {
		return auth.generateAuthUrl({
			access_type: 'offline',
			prompt: 'consent',
			scope: defaultScope
		});
	}
	
	getGooglePlusApi(auth) {
		return google.plus({ version: 'v1', auth });
	}
	
	/* Main */
	getGoogleAuthURL() {
		const auth = createConnection();
		const url = getConnectionUrl(auth);
		return url;
	}

	getGoogleAccountFromCode(code) {
		const data = await auth.getToken(code);
		const tokens = data.tokens;
		const auth = createConnection();
		auth.setCredentials(tokens);
		const plus = getGooglePlusApi(auth);
		const me = await plus.people.get({ userId: 'me' });
		const userGoogleId = me.data.id;
		const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
		return {
			id: userGoogleId,
			email: userGoogleEmail,
			tokens: tokens,
		};
	}
}