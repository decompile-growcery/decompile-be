require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const exec = require('child_process').exec;

require('./src/config/passport')(passport)

// Required for running behind nginx
app.set('trust proxy', 'loopback');

// BASE URL CONFIG
const ENVIRONMENT = process.env.ENV || "development";
if (ENVIRONMENT == "development"){
	const base_url = "http://localhost:8080";
}else{
	const base_url = "https://deco3801-decompile.uqcloud.net/";
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

// Sync Database in production environment
if (ENVIRONMENT == 'production'){
	db.sequelize.sync();
}	

// PORT CONFIG
// Must match up with /etc/nginx/frameworks-available/nodejs.conf!
const port = process.argv.slice(2)[0] || process.env.PORT || 8081;
app.listen(port, () => {
	welcome_info = {message: "Growcery Backend is up and running...", last_update: "Unknown"};
	app.get('/',function(req, res){
		exec("git log -1 --format=%cd", function(err, stdout, stderr) {
			if (!err) {
				welcome_info.last_update = stdout.trim();
			}
			res.send(welcome_info);
		});
	})
    console.log(`App running on port ${port}`)
})