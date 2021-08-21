const product = require('../controllers/productController.js');
var router = require("express").Router();

router.post("/create-product", product.createProduct)
router.get("/all-products", product.seeProducts)
router.get("/products", product.seeProductsBasedCategory)
router.put("/update-product", product.updateProduct)
router.delete("/delete-product/:id", product.deleteProduct)

module.exports = router;