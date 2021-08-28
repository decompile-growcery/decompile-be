const verifyAuth = require('../middlewares/verifyAuth');
const shippingCost = require('../middlewares/shippingCost');
var router = require("express").Router();

router.get("/shipping-cost", verifyAuth.verifyToken , shippingCost.getShippingCost, shippingCost.showShippingCost);

module.exports = router;