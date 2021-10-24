const fs = require("fs");

const unlinkImage = (req, res, next) => {
    let resultHandler = function (err) {
        if (err) {
            res.status(500).send({
                message:
                  err.message || "Error occurred while deleting product"
              });
        } else {
            next()
        }
    }
    fs.unlink(req.data.image, resultHandler);
}

module.exports = {
    unlinkImage
}
