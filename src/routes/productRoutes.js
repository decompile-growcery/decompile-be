const product = require('../controllers/productController.js');
const productImage = require('../controllers/productImageController.js');
const upload = require('../middlewares/uploadProductImage.js');
const unlink = require('../middlewares/unlinkImage.js');
var router = require("express").Router();

router.post("/product", upload.uploadProduct, product.createProduct, productImage.createProductImage)
router.put("/product", product.updateProduct)
router.get("/product/:id", product.getProduct)
router.delete("/product/:id", product.deleteProduct)
router.delete("/delete-product-image/:id", productImage.findProductImage, unlink.unlinkImage, productImage.deleteProductImage)

router.get("/products", product.seeProducts)

router.post("/upload-product-image", upload.uploadProduct, productImage.createProductImage)



module.exports = router;