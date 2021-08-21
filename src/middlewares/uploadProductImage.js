const multer = require('multer');
const util = require("util");
const db = require("../models");

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './src/uploads')
    },
    filename: (req, file, callback) => {
        const match = ["image/png", "image/jpeg", "image/jpg"];
    
        if (match.indexOf(file.mimetype) === -1) {
          var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
          return callback(message, null);
        }

        var filename = `${Date.now()}-${file.originalname}`;
        callback(null, filename);
    }
})
var uploadProduct= multer({storage: storage}).array("product_image", 5);;
var uploadFilesMiddleware = util.promisify(uploadProduct);
module.exports = uploadFilesMiddleware;

module.exports = {
    uploadProduct
}