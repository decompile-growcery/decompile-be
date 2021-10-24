const product = require('../controllers/productController.js');
const farm = require('../controllers/farmController.js');
const productImage = require('../controllers/productImageController.js');
const upload = require('../middlewares/uploadProductImage.js');
const unlink = require('../middlewares/unlinkImage.js');
const auth = require('../middlewares/verifyAuth.js');
var router = require("express").Router();

router.post("/product", auth.verifyToken, upload.uploadProduct, farm.getFarmId, product.createProduct, productImage.createProductImage)
router.put("/product", auth.verifyToken, product.updateProduct)
router.get("/product/:id", product.getProduct)
router.delete("/product/:id", auth.verifyToken, product.deleteProduct)
router.get("/products", product.seeProducts)
router.get("/my-products", product.myProducts)
router.get("/search-products/:product_name", product.searchProduct)

router.delete("/delete-product-image/:id", auth.verifyToken, productImage.findProductImage, unlink.unlinkImage, productImage.deleteProductImage)
router.post("/upload-product-image", auth.verifyToken, upload.uploadProduct, productImage.createProductImage)

module.exports = router;