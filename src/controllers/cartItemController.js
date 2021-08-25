const db = require("../models");
const jwt = require('jsonwebtoken')
const CartItem = db.cartitem;

const addCartItem = (req, res) => {
    // Check if data is complete
	product_id = req.params.product_id;
    if (!product_id) {
        res.status(400).send({
            status: "Failed",
            message: "Incomplete Data Provided"
        });
        return;
    }
	
    const cart_item = {
        user_id: req.user.id,
        product_id: product_id
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
	product_id = req.params.product_id
    if (!product_id) {
        res.status(400).send({
            status: "Failed",
            message: "Product ID is not provided in the URL"
        });
        return;
    }
	CartItem.findOne({where: {product_id: product_id}})
	.then(data => {
		/* If quantity <= 1, then delete the item from cart
		else just decrease the quantity */
		if (data.quantity > 1){
			// Decrease the quantity
			CartItem.decrement('quantity', { by: 1, where: { id: data.id }})
			.then(data => {
				res.send({
					status: "Success",
					message: "Product has been removed"
				  });
			})
			.catch(err => {
				res.status(500).send({
					status: "Success",
					message: "Failed to remove product"
				  });
			})
		}else{
			// Delete the product from cart
			CartItem.destroy({
				where: { product_id: product_id }
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
					message: `Cannot remove Product with id=${id} from Cart`
				  });
				}
			  })
			.catch(err => {
				console.trace(err.message);
				res.status(500).send({
					message: "Error occurred while removing product from cart"
				});
			})
		}
	}).catch(err => {
		res.send({
			status: "Failed",
			message: "Product is not found in Cart"
		  });
	});
}

const getCartItems = (req, res) => {
    CartItem.findAll({ where: { user_id: req.user.id } })
    .then(data => {
        res.json({
            status: "Success",
            data: data,
			product_count: data.length,
			message: data.length + " different products found"
        });
    })
    .catch(err => {
      res.json({
		status: "Success",
        data: {},
		product_count: 0,
		message: "0 different products found"
      });
    });
}

module.exports = {
    getCartItems,
	addCartItem,
	removeCartItem,
}