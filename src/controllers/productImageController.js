const db = require("../models");
const ProductImage = db.product_image;

const createProductImage = (req, res) => {
    if (!req.files) {
        res.status(400).send({
            status: "Failed",
            message: "Please upload photos"
        });
        return;
    }

    var id = req.body.id == null? req.data.id : req.body.id;
    for(let i=0; i<req.files.length; i++) {
        ProductImage.create({
            product_id: id,
            image: req.files[i].filename
        })
        .then(data => {
            res.send({
                status: "Success"
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error occurred while creating product"
            });
        });
    }
}

const findProductImage = (req, res, next) => {
    ProductImage.findByPk(req.params.id)
    .then(data => {
        req.data = data
        next()
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while retrieving products"
      });
    });
}

const deleteProductImage = (req,res) => {
    ProductImage.destroy({
        where: { id: req.params.id }
    })
    .then(data => {
        res.send({
            status: "Success"
        });
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error occurred while deleting product"
        });
    });
}

module.exports = {
    createProductImage,
    findProductImage,
    deleteProductImage
}