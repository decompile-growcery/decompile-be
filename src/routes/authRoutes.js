const auth = require('../controllers/authController');
const farm = require('../controllers/farmController');
var router = require("express").Router();

router.post("/auth/register", auth.createUser, farm.createFarm)
router.post("/auth/login", auth.authUser)

module.exports = router;