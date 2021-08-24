const googleAuthLib = require('../libraries/googleAuthLib');
var gAuth = new googleAuthLib();

const getGoogleAuthURL = (req, res) => {
	// Retrieve Auth URL
	auth_url = gAuth.getURL();

	res.send({
		status: "success",
		data: auth_url
	});
}

const getGoogleAccount = async (req, res) => {
	try {
		res.send(gAuth.getGoogleAccount(req.query.code));
		console.log(123);
	}catch(e){
		res.send({
			"status": "failed",
			"message": "Failed to retrieve data from Google Auth Token"
		});
	}
	
}

module.exports = {
    getGoogleAccount,
	getGoogleAuthURL
}