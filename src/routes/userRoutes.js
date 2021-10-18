const user = require('../controllers/userController');
const address = require('../controllers/addressController');
const auth = require('../middlewares/verifyAuth.js');
var router = require("express").Router();

router.get("/user", auth.verifyToken, user.getUserAndAddress)
router.put("/user", auth.verifyToken, user.updateUser, address.updateToAddress)

module.exports = router;