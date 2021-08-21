/* Some parts are adapted from https://medium.com/@jackrobertscott/how-to-use-google-auth-api-with-node-js-888304f7e3a0 */
const google = require('googleapis').google;

// Configs
const googleConfig = {
	clientId: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	redirect: process.env.GOOGLE_REDIRECT_URL,
};
  
const defaultScope = [
	'https://www.googleapis.com/auth/plus.me',
	'https://www.googleapis.com/auth/userinfo.email',
];

const getGoogleAuthURL = (req, res) => {
	// Create Connection
	auth =  new google.auth.OAuth2(
		googleConfig.clientId,
		googleConfig.clientSecret,
		googleConfig.redirect
	);

	// Retrieve Auth URL
	auth_url = auth.generateAuthUrl({
										access_type: 'offline',
										prompt: 'consent',
										scope: defaultScope
									});

	res.send({
		status: "Success",
		data: auth_url
	});
}

const validateGoogleAuthToken = (req, res) => {
    res.send({
		status: "Success",
		message: "..."
	});
}

module.exports = {
    validateGoogleAuthToken,
	getGoogleAuthURL
}