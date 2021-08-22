/* Some parts are adapted from 
https://medium.com/@jackrobertscott/how-to-use-google-auth-api-with-node-js-888304f7e3a0 */
const google = require('googleapis').google;

class googleAuthLib{
	constructor(){
		// Configs
		this.googleConfig = {
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			redirect: process.env.GOOGLE_REDIRECT_URL,
		};
		this.defaultScope = [
			'https://www.googleapis.com/auth/plus.me',
			'https://www.googleapis.com/auth/userinfo.email',
		];

		this.auth = this.createConnection();
	}

	// Create Connection
	createConnection(){
		const auth =  new google.auth.OAuth2(
			this.googleConfig.clientId,
			this.googleConfig.clientSecret,
			this.googleConfig.redirect
		);
		return auth;
	}

	// Google Plus API
	getGooglePlusApi(auth) {
		const service = google.people({
			version: "v1",
			auth
		});
		service.people.connections.list({
				resourceName: "people/me",
				pageSize: 10,
				personFields: "names,emailAddresses"
			},
			(err, res) => {
				if (err) return console.error("The API returned an error: " + err);
				const connections = res.data.connections;
				if (connections) {
					console.log("Connections:");
					connections.forEach(person => {
						if (person.names && person.names.length > 0) {
							console.log(person.names[0].displayName);
						} else {
							console.log("No display name found for connection.");
						}
					});
				} else {
					console.log("No connections found.");
				}
			}
		);
	}

	getURL(){	
		// Retrieve Auth URL
		const auth_url = this.auth.generateAuthUrl({
											access_type: 'offline',
											prompt: 'consent',
											scope: this.defaultScope
										});
	
		return auth_url;
	}

	async getGoogleAccount(code){
		//FIXME: Find the Latest API to get Email & Account Info from Google Auth Callback Code
		// Retrieve Token
		const data = await this.auth.getToken(code);
		const tokens = data.tokens;

		// Get New Auth
		const new_auth = this.createConnection();
		new_auth.setCredentials(tokens);
		
		// Get Google Account Data
		const gplus = this.getGooglePlusApi(new_auth);
		const me = await gplus.people.get({ userId: 'me' });
		const userGoogleId = me.data.id;
		const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;

		return({
			id: userGoogleId,
			email: userGoogleEmail,
			tokens: tokens,
		});
	}
}

module.exports = googleAuthLib;