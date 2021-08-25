const db = require("../models");
const jwt = require('jsonwebtoken')
const CartItem = db.cartitem;

const addCartItem = (req, res) => {
    // Check if data is complete
    if (!req.params.id) {
        res.status(400).send({
            status: "Failed",
            message: "Incomplete Data Provided"
        });
        return;
    }
	
    const cart_item = {
        user_id: req.user.id,
        product_id: req.params.id
    }

    CartItem.findOrCreate({
			where: cart_item,
			defaults: {
				quantity: 1
			}
		})
        .then(data => {
			// Item is found
			if (!data[1]){
				CartItem.increment('quantity', { by: 1, where: { id: data[0].id }})
				.then(data => {
					res.send({
						status: "Success",
						message: "Product has been added to cart"
					});
				})
				.catch(err => {
					console.trace(err.message);
					res.status(500).send({
						status: "Failed",
						message: "Error occurred while adding product to cart"
					});
				})
			}else{
				res.send({
					status: "Success",
					message: "Product has been added to cart"
				});
			}
        })
        .catch(err => {
			console.trace(err.message);
            res.status(500).send({
				status: "Failed",
                message: "Error occurred while adding product to cart"
            });
    });
}

const removeCartItem = (req, res) => {
    // Check if data is complete
    if (!req.params.id) {
        res.status(400).send({
            status: "Failed",
            message: "Incomplete Data Provided"
        });
        return;
    }
	
    CartItem.destroy({
        where: { product_id: req.params.id }
      })
    .then(data => {
        if (data == 1) {
          res.send({
            status: "Success",
            message: "Product has been removed"
          });
        } else {
          res.send({
            status: "Failed",
            message: `Cannot remove Product with id=${id}`
          });
        }
      })
    .catch(err => {
		console.trace(err.message);
		res.status(500).send({
			message: "Error occurred while removing product"
		});
    });
}

const getCartItems = (req, res) => {
    CartItem.findAll({ where: { user_id: req.user.id } })
    .then(data => {
        res.json({
            status: "Success",
            data: data,
			message: data.length + " different products found"
        });
    })
    .catch(err => {
      res.json({
		status: "Success",
        data: {},
		message: "0 different products found"
      });
    });
}

module.exports = {
    getCartItems,
	addCartItem,
	removeCartItem,
}