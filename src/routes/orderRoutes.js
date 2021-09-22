const verifyAuth = require('../middlewares/verifyAuth');
const order = require('../controllers/orderController');
const payment = require('../controllers/paymentController');
const removeFromCart = require('../middlewares/removeFromCartAfterOrder');
var router = require("express").Router();

router.post("/create-order", verifyAuth.verifyToken, payment.createPayment, 
order.insertOrder, order.insertOrderItem, removeFromCart.removeProductFromCart,);
router.get("/order", verifyAuth.verifyToken, order.getOrdersByUser);
router.put("/order-status", verifyAuth.verifyToken, order.updateOrderStatus);
router.put("/order/payment-received", verifyAuth.verifyToken, order.updateStatusConfirmed);

module.exports = router;