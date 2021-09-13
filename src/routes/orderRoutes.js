const verifyAuth = require('../middlewares/verifyAuth');
const order = require('../controllers/orderController');
const payment = require('../controllers/paymentController');
var router = require("express").Router();

router.post("/order", verifyAuth.verifyToken, payment.createPayment, order.insertOrder, 
    order.insertOrderItem);
router.get("/order", verifyAuth.verifyToken, order.getOrdersByUser);
router.put("/order-status", verifyAuth.verifyToken, order.updateOrderStatus);

module.exports = router;