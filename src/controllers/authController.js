const db = require("../models");
var crypto = require('crypto'); 
const User = db.user;

const createUser = (req, res) => {
	// Check if data is complete
    if (!req.body.username || !req.body.password || !req.body.email || !req.body.first_name || !req.body.last_name) {
        res.status(400).send({
            status: "Failed",
            message: "Content can not be empty!"
        });
        return;
    }
	// TODO: Validate Username

	salt = crypto.randomBytes(16).toString('hex');
	password_hash =  crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex');
	password_hash_salt = password_hash + "|" + salt;

    const user = {
        username: req.body.username.trim(),
        password: password_hash_salt.trim(),
        email: req.body.email.trim(),
        first_name: req.body.first_name.trim(),
        last_name: req.body.last_name.trim(),
    }

    User.create(user)
        .then(data => {
            res.send({
                status: "Success",
                message: "User is created successfully"
            });
        })
        .catch(err => {
            res.status(500).send({
				status: "Failed",
                message: err.message || "Error occurred while creating a user"
            });
    });
}

const authUser = (req, res) => {
	var login_key = req.body.login;
	if (!req.body.login || !req.body.password) {
        res.status(400).send({
            status: "Failed",
            message: "Content can not be empty!"
        });
        return;
    }
	
	// Choose between email and username
	if (login_key.indexOf("@") >= 0){
		var user_data = User.findOne({ where: { email: login_key } });    
	}else{
		var user_data = User.findOne({ where: { username: login_key } });    
	}
	
	user_data.then(data => {
		// Validate Hash
		var password_split = data.password.split("|");
		var password_hash_db = password_split[0];
		var password_salt_db = password_split[1];

		var password_hash = crypto.pbkdf2Sync(req.body.password,  password_salt_db, 1000, 64, `sha512`).toString(`hex`); 
		
		if (password_hash === password_hash_db){
			res.status(200).send({
				status: "Success",
				message: "User has been authenticated"
			});
		}else{
			res.status(403).send({
				status: "Failed",
				message: "Invalid credentials"
			});
		}
    })
    .catch(err => {
      res.status(500).send({
        message: "Invalid credentials."
      });
    });
}

module.exports = {
	authUser,
	createUser,
}