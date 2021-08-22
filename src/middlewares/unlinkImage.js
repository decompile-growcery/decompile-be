const fs = require("fs");

const unlinkImage = (req, res, next) => {
    console.log("test")
    let resultHandler = function (err) {
        if (err) {
            console.log("failed")
            res.status(500).send({
                message:
                  err.message || "Error occurred while deleting product"
              });
        } else {
            console.log("success")
            next()
        }
    }
    fs.unlink(req.data.image, resultHandler);
}

module.exports = {
    unlinkImage
}
