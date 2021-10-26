const db = require("../models");
const sequelize = db.sequelize;
const Product = db.product;

const createProduct = (req, res, next) => {
    if (!req.body.category_id || !req.body.product_name || !req.body.product_desc || !req.body.product_price
      || !req.body.unit_weight || !req.body.unit_name || !req.body.stock) {
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
        unit_name: req.body.unit_name,
        stock: req.body.stock,
        is_fresh: req.body.is_fresh
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
  query = `select p.id as product_id, f.id as farm_id, f.farm_name, f.farm_address,
    p.product_name, p.product_desc, p.product_price, p.unit_weight, p.unit_name,
    p.stock, p.is_fresh, p.discount,
    pi.id as image_id, pi.image
    from product p, farm f, product_image pi
    where p.farm_id = f.id and pi.product_id = p.id 
    and p.id = ${req.params.id}`
  try {
    var [result, metadata] = await sequelize.query(query)
      res.send({
        status: "Success",
        data: result[0]
      })
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Error occurred while fetching product"
    });
  }  
}

const searchProduct = async (req, res) => {
    query = `select p.id as product_id, f.id as farm_id, f.farm_name, f.farm_address,
    p.product_name, p.product_desc, p.product_price, p.unit_weight, p.unit_name,
    p.stock, p.is_fresh, p.discount,
    pi.id as image_id, pi.image
    from product p, farm f, product_image pi
    where pi.product_id = p.id and p.farm_id = f.id
    and p.product_name like '%${req.params.product_name}%'`;
    try {
        var [result, metadata] = await sequelize.query(query);
        output = {
            status: "Success",
            data: result[0] || []
        }
        output.count = output.data.length;
        res.json(output);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            message: "Error occurred while fetching product"
        });
    }  
}

const seeProducts = async (req, res) => {
    let query;
    if (req.query.category_id) {
        query = `select p.id as product_id, f.id as farm_id, f.farm_name, f.farm_address,
        p.product_name, p.product_desc, p.product_price, p.unit_weight, p.unit_name,
        p.stock, p.is_fresh, p.discount,
        pi.id as image_id, pi.image
        from product p, farm f, product_image pi
        where p.farm_id = f.id and pi.product_id = p.id
        and p.category_id = ${req.query.category_id}`
      } else if (req.body.user_id) {
        query = `select p.id as product_id, f.id as farm_id, f.farm_name, f.farm_address,
        p.product_name, p.product_desc, p.product_price, p.unit_weight, p.unit_name,
        p.stock, p.is_fresh, p.discount,
        pi.id as image_id, pi.image
        from product p, farm f, product_image pi, users u
        where p.farm_id = f.id and pi.product_id = p.id and u.id = f.user_id
        and f.user_id = ${req.body.user_id}`
      } else {
        query = `select p.id as product_id, f.id as farm_id, f.farm_name, f.farm_address,
        p.product_name, p.product_desc, p.product_price, p.unit_weight, p.unit_name,
        p.stock, p.is_fresh, p.discount,
        pi.id as image_id, pi.image
        from product p, farm f, product_image pi
        where p.farm_id = f.id and pi.product_id = p.id`
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

const myProducts = async (req, res) => {
  var query = `select p.id as product_id, f.id as farm_id, f.farm_name, f.farm_address,
      p.product_name, p.product_desc, p.product_price, p.unit_weight, p.unit_name,
      p.stock, p.is_fresh, p.discount,
      pi.id as image_id, pi.image
      from product p, farm f, product_image pi, users u
      where p.farm_id = f.id and pi.product_id = p.id and u.id = f.user_id
      and f.user_id = ${req.user.id}`

  try {
    var [result, metadata] = await sequelize.query(query)
    res.send({
      status: "Success",
      data: result
    })
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Error occurred while fetching my products"
    });
  }
}

const updateProduct = (req, res) => {
    if (!req.body.id || !req.body.category_id || !req.body.product_name 
        || !req.body.product_desc || !req.body.product_price || !req.body.unit_weight
        || !req.body.unit_name || !req.body.stock || !req.body.discount) {
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
        unit_name: req.body.unit_name,
        stock: req.body.stock,
        is_fresh: req.body.is_fresh,
        discount: req.body.discount
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
    getProduct,
    searchProduct,
    myProducts
}