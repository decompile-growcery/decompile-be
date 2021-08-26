const auth = require('../controllers/authController');
var router = require("express").Router();

router.post("/auth/register", auth.createUser)
router.post("/auth/login", auth.authUser)

module.exports = router;