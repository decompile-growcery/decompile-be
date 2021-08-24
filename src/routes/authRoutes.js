const googleAuth = require('../controllers/googleAuthController');
const auth = require('../controllers/authController');
var router = require("express").Router();

// Google Auth
router.get("/auth/google/get-auth-url", googleAuth.getGoogleAuthURL)
router.get("/auth/google/auth-code", googleAuth.getGoogleAccount)

// Manual Auth
router.post("/auth/create-user", auth.createUser)
router.post("/auth/login", auth.authUser)

module.exports = router;