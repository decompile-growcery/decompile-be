const auth = require('../controllers/authController');
var router = require("express").Router();

router.get("/auth/get-google-auth-url", auth.getGoogleAuthURL)
router.get("/auth/auth-google-account", auth.getGoogleAccount)

module.exports = router;