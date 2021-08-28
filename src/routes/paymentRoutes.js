const verifyAuth = require('../middlewares/verifyAuth');
const Payment = require('../controllers/paymentController');
var router = require("express").Router();

router.post("/payment/create", verifyAuth.verifyToken , Payment.createPayment);
router.get("/payment/data/:paypalPaymentID", verifyAuth.verifyToken , Payment.getPaymentData);
router.get("/payment/checkout-url/:paypalPaymentID", verifyAuth.verifyToken , Payment.getCheckoutURL);

module.exports = router;