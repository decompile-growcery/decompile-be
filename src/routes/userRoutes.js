const user = require('../controllers/userController');
const auth = require('../middlewares/verifyAuth.js');
var router = require("express").Router();

router.get("/user", auth.verifyToken, user.getUserById)
router.put("/user", auth.verifyToken, user.updateUser)

module.exports = router;