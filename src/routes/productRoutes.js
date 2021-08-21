const product = require('../controllers/productController.js');
const productImage = require('../controllers/productImageController.js');
const upload = require('../middlewares/uploadProductImage.js');
const unlink = require('../middlewares/unlinkImage.js');
var router = require("express").Router();

router.post("/create-product", upload.uploadProduct, product.createProduct, productImage.createProductImage)
router.get("/all-products", product.seeProducts)
router.get("/products", product.seeProductsBasedCategory)
router.put("/update-product", product.updateProduct)
router.delete("/delete-product/:id", product.deleteProduct)
router.delete("/delete-product-image/:id", productImage.findProductImage, unlink.unlinkImage, productImage.deleteProductImage)

module.exports = router;