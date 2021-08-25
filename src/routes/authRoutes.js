const googleAuth = require('../controllers/googleAuthController');
const auth = require('../controllers/authController');
var router = require("express").Router();

// Google Auth
router.get("/auth/google/get-auth-url", googleAuth.getGoogleAuthURL)
router.get("/auth/google/auth-code", googleAuth.authGoogle)

// Manual Auth
router.post("/auth/register", auth.createUser)
router.post("/auth/login", auth.authUser)

module.exports = router;