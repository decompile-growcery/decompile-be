const googleAuth = require('../controllers/googleAuthController');
const auth = require('../controllers/authController');
var router = require("express").Router();

// Google Auth
router.get("/auth/google/get-auth-url", googleAuth.getGoogleAuthURL)
router.get("/auth/google/auth-code", googleAuth.getGoogleAccount)

// Manual Auth
// TODO: Change this
router.get("/auth/manual", googleAuth.getGoogleAuthURL)

module.exports = router;