const db = require("../models");
const Product = db.product;
const ProductImage = db.product_image;

const createProduct = (req, res, next) => {
    if (!req.body.category_id || !req.body.product_name || !req.body.product_desc || !req.body.product_price) {
        res.status(400).send({
            status: "Failed",
            message: "Content can not be empty!"
        });
        return;
    }

    const product = {
        farm_id: 1, // get from jwt token? ato gimana ya ntar we'll think about this ya
        category_id: req.body.category_id,
        product_name: req.body.product_name,
        product_desc: req.body.product_desc,
        product_price: req.body.product_price
    }

    Product.create(product)
        .then(data => {
            req.data = data
            next()
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error occurred while creating product"
            });
    });
}

const getProduct = (req, res) => {
  Product.findByPk(req.params.id)
  .then(data => {
    ProductImage.findAll({where: {product_id: data.id}})
    .then(imgData => {
      res.send({
        status: "Success",
        product: data,
        image: imgData
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while retrieving product images"
      });
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Error occurred while retrieving product"
    });
  });
}

const seeProducts = (req, res) => {
    if (!req.query.category_id) {
      Product.findAll()
      .then(data => {
          res.send({
              status: "Success",
              data: data
          });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error occurred while retrieving products"
        });
      });
    } else {
      Product.findAll({where: {category_id: req.query.category_id}})
      .then(data => {
          res.send({
              status: "Success",
              data: data
          });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error occurred while retrieving products"
        });
      });
    }
}


const updateProduct = (req, res) => {
    if (!req.body.id || !req.body.category_id || !req.body.product_name 
        || !req.body.product_desc || !req.body.product_price) {
        res.status(400).send({
            status: "Failed",
            message: "Content can not be empty!"
        });
        return;
    }

    const product = {
        category_id: req.body.category_id,
        product_name: req.body.product_name,
        product_desc: req.body.product_desc,
        product_price: req.body.product_price
    }

    Product.update(product, {
        where: { id: req.body.id }
      })
    .then(data => {
        res.send({
            status: "Success",
            message: "Product is updated successfully"
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while updating product"
      });
    });
}

const deleteProduct = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            status: "Failed",
            message: "Content can not be empty!"
        });
        return;
    }

    Product.destroy({
        where: { id: req.params.id }
      })
    .then(data => {
        if (data == 1) {
          res.send({
            status: "Success",
            message: "Product is deleted successfully"
          });
        } else {
          res.send({
            status: "Failed",
            message: `Cannot delete Product with id=${id}`
          });
        }
      })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while deleting product"
      });
    });
}

module.exports = {
    createProduct,
    seeProducts,
    updateProduct,
    deleteProduct,
    getProduct
}