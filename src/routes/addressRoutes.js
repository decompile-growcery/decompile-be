const verifyAuth = require('../middlewares/verifyAuth');
const address = require('../controllers/addressController');
var router = require("express").Router();

router.post("/address", verifyAuth.verifyToken, address.insertToAddress);
router.get("/address", verifyAuth.verifyToken, address.getAddressByUserId);
router.put("/address", verifyAuth.verifyToken, address.updateToAddress);
router.delete("/address", verifyAuth.verifyToken, address.deleteAddress);

module.exports = router;