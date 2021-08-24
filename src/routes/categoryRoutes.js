const category = require('../controllers/categoryController.js');
var router = require("express").Router();

router.post("/category", category.createCategory)
router.get("/category", category.seeCategories)
router.put("/category", category.updateCategories)
router.delete("/category/:id", category.deleteCategories)

module.exports = router;