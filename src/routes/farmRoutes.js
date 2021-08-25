const farm = require('../controllers/farmController.js');
const auth = require('../middlewares/verifyAuth.js');
var router = require("express").Router();

router.post("/farm", auth.verifyToken, farm.createFarm)
router.put("/farm", auth.verifyToken, farm.updateFarm)
router.get("/farm", auth.verifyToken, farm.getFarm)
router.delete("/farm/:id", auth.verifyToken, farm.deleteFarm)

module.exports = router;