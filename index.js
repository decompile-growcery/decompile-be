require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
require('./src/config/passport')(passport)

// BASE URL CONFIG
const ENVIRONMENT = process.env.ENV || "development";
if (ENVIRONMENT == "development"){
	const base_url = "http://localhost:8080";
}else{
	const base_url = "https://growcery-be.herokuapp.com";
}

// CORS CONFIG
const allowedOrigins = process.env.CORS_WHITELIST.split(' ');
const corsOptions = {
	function (origin, callback) {
		console.log(origin)
		if (allowedOrigins.indexOf(origin) !== -1) {
		  callback(null, true)
		} else {
		  callback(new Error('Not allowed by CORS'))
		}
	}
}
app.use(cors(corsOptions));

// EXPRESS CONFIG
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// PASSPORT
app.use(passport.initialize())
app.use(passport.session())

// ROUTER
const router = require('./src/routes/indexRoutes');
app.use('/growcery', router);

// DATABASE
const db = require("./src/models");
// add this to sync / create new table in db
db.sequelize.sync();

// PORT CONFIG
const port = process.env.PORT || 5000;
app.listen(port, () => {
	app.get('/',function(req, res){
		res.send("Growcery Backend is up and running...");
	})
    console.log(`App running on port ${port}`)
})