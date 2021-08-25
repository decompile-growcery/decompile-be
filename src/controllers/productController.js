const db = require("../models");
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');
const Product = db.product;
const ProductImage = db.product_image;

const createProduct = (req, res, next) => {
    if (!req.body.category_id || !req.body.product_name || !req.body.product_desc || !req.body.product_price
      || !req.body.unit_weight || !req.body.unit_name) {
        res.status(400).send({
            status: "Failed",
            message: "Content can not be empty!"
        });
        return;
    }

    const product = {
        farm_id: req.farm_id,
        category_id: req.body.category_id,
        product_name: req.body.product_name,
        product_desc: req.body.product_desc,
        product_price: req.body.product_price,
        unit_weight: req.body.unit_weight,
        unit_name: req.body.unit_name
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

const getProduct = async (req, res) => {
  query = `SELECT P.ID AS PRODUCT_ID, F.ID AS FARM_ID, F.FARM_NAME, F.FARM_ADDRESS,
      P.PRODUCT_NAME, P.PRODUCT_DESC, P.PRODUCT_PRICE, P.UNIT_WEIGHT, P.UNIT_NAME,
      PI.ID AS IMAGE_ID, PI.IMAGE
      FROM PRODUCT P, FARM F, PRODUCT_IMAGE PI
      WHERE P.FARM_ID = F.ID AND PI.PRODUCT_ID = P.ID 
      AND P.ID = ${req.params.id}`
  try {
    var [result, metadata] = await sequelize.query(query)
      res.send({
        status: "Success",
        data: result
      })
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Error occurred while fetching product"
    });
  }  
}

const getProductByFarm = async (req, res) => {
  query = `SELECT P.ID AS PRODUCT_ID, F.ID AS FARM_ID, F.FARM_NAME, F.FARM_ADDRESS,
      P.PRODUCT_NAME, P.PRODUCT_DESC, P.PRODUCT_PRICE, P.UNIT_WEIGHT, P.UNIT_NAME,
      PI.ID AS IMAGE_ID, PI.IMAGE
      FROM PRODUCT P, FARM F, PRODUCT_IMAGE PI
      WHERE P.FARM_ID = F.ID AND PI.PRODUCT_ID = P.ID 
      AND F.ID = ${req.params.farm_id}`
  try {
        var [result, metadata] = await sequelize.query(query)
          res.send({
            status: "Success",
            data: result
          })
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Error occurred while fetching product"
    });
  } 
}

const seeProducts = async (req, res) => {
    let query;
    if (req.query.category_id) {
      query = `SELECT P.ID AS PRODUCT_ID, F.ID AS FARM_ID, F.FARM_NAME, F.FARM_ADDRESS,
      P.PRODUCT_NAME, P.PRODUCT_DESC, P.PRODUCT_PRICE, P.UNIT_WEIGHT, P.UNIT_NAME,
      PI.ID AS IMAGE_ID, PI.IMAGE
      FROM PRODUCT P, FARM F, PRODUCT_IMAGE PI
      WHERE P.FARM_ID = F.ID AND PI.PRODUCT_ID = P.ID
      AND P.CATEGORY_ID = ${req.query.category_id}`
    } else if (req.query.farm_id) {
      query = `SELECT P.ID AS PRODUCT_ID, F.ID AS FARM_ID, F.FARM_NAME, F.FARM_ADDRESS,
      P.PRODUCT_NAME, P.PRODUCT_DESC, P.PRODUCT_PRICE, P.UNIT_WEIGHT, P.UNIT_NAME,
      PI.ID AS IMAGE_ID, PI.IMAGE
      FROM PRODUCT P, FARM F, PRODUCT_IMAGE PI
      WHERE P.FARM_ID = F.ID AND PI.PRODUCT_ID = P.ID 
      AND F.ID = ${req.query.farm_id}`
    } else {
      query = `SELECT P.ID AS PRODUCT_ID, F.ID AS FARM_ID, F.FARM_NAME, F.FARM_ADDRESS,
      P.PRODUCT_NAME, P.PRODUCT_DESC, P.PRODUCT_PRICE, P.UNIT_WEIGHT, P.UNIT_NAME,
      PI.ID AS IMAGE_ID, PI.IMAGE
      FROM PRODUCT P, FARM F, PRODUCT_IMAGE PI
      WHERE P.FARM_ID = F.ID AND PI.PRODUCT_ID = P.ID`
    }
    try {
      var [result, metadata] = await sequelize.query(query)
      res.send({
        status: "Success",
        data: result
      })
    } catch (error) {
      res.status(500).send({
        message:
          error.message || "Error occurred while fetching products"
      });
    }
}

const updateProduct = (req, res) => {
    if (!req.body.id || !req.body.category_id || !req.body.product_name 
        || !req.body.product_desc || !req.body.product_price || !req.body.unit_weight
        || !req.body.unit_name) {
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
        product_price: req.body.product_price,
        unit_weight: req.body.unit_weight,
        unit_name: req.body.unit_name
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