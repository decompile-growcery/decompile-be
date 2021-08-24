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

	salt = crypto.randomBytes(16).toString('hex');
	password_hash =  crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex');
	password_hash_salt = password_hash + "|" + salt;

    const user = {
        username: req.body.username,
        password: password_hash_salt,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
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
                message:
                err.message || "Error occurred while creating a user"
            });
    });
}

const authUser = (req, res) => {
	if (!req.body.username || !req.body.password) {
        res.status(400).send({
            status: "Failed",
            message: "Content can not be empty!"
        });
        return;
    }
	
    User.findOne({ where: { username: req.body.username } })
    .then(data => {
		// Validate Hash
		var password_split = data.password.split("|");
		var password_hash_db = password_split[0];
		var password_salt_db = password_split[1];

		var password_hash = crypto.pbkdf2Sync(req.body.password,  password_salt_db, 1000, 64, `sha512`).toString(`hex`); 
		
		if (password_hash === password_hash_db){
			res.send({
				status: "Success",
				message: "User has been authenticated"
			}).sendStatus(200);
		}else{
			res.send({
				status: "Failed",
				message: "Invalid credentials"
			}).sendStatus(403);
		}
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Invalid credentials"
      });
    });
}

module.exports = {
	authUser,
	createUser,
}