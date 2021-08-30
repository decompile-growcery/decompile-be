const verifyAuth = require('../middlewares/verifyAuth');
const Payment = require('../controllers/paymentController');
var router = require("express").Router();

router.post("/payment/create", verifyAuth.verifyToken , Payment.createPayment);
router.get("/payment/data/:payment_id", verifyAuth.verifyToken , Payment.getPaymentData);
router.get("/payment/checkout-url/:payment_id", verifyAuth.verifyToken , Payment.getCheckoutURL);
router.post("/payment/capture/:payment_id", verifyAuth.verifyToken , Payment.capturePaypalPayment);
router.post("/payment/refund/:payment_id", verifyAuth.verifyToken , Payment.refundPaypalPayment);

module.exports = router;