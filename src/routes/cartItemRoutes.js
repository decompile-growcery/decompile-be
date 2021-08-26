const verifyAuth = require('../middlewares/verifyAuth');
const cartItem = require('../controllers/cartItemController');
var router = require("express").Router();

router.post("/cart/add", verifyAuth.verifyToken , cartItem.addCartItem);
router.get("/cart", verifyAuth.verifyToken , cartItem.getCartItems);
router.delete("/cart/remove", verifyAuth.verifyToken , cartItem.removeCartItem);

module.exports = router;