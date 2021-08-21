const auth = require('../controllers/authController');
var router = require("express").Router();

router.get("/auth/get-google-url", auth.getGoogleAuthURL)
router.post("/auth/validate-google-url", auth.validateGoogleAuthToken)

module.exports = router;