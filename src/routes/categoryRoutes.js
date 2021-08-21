const category = require('../controllers/categoryController.js');
var router = require("express").Router();

router.post("/create-category", category.createCategory)
router.get("/category", category.seeCategories)
router.put("/update-category", category.updateCategories)
router.delete("/delete-category/:id", category.deleteCategories)

module.exports = router;