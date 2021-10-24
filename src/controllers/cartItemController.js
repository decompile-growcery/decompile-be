const db = require("../models");
const sequelize = db.sequelize;
const CartItem = db.cart_item;

const addCartItem = (req, res) => {
	product_id = req.body.product_id;
    if (!product_id) {
        res.status(400).send({
            status: "Failed",
            message: "Incomplete Data Provided"
        });
        return;
    }

    const cart_item = {
        user_id: req.user.id,
        product_id: parseInt(product_id)
    }

    CartItem.findOrCreate({
			where: cart_item,
			defaults: {
				quantity: 1
			}
		})
        .then(data => {
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
			console.error(err.message);
            res.status(500).send({
				status: "Failed",
                message: "Error occurred while adding product to cart"
            });
    	}
	);
}

const deleteCartItem = (req, res) => {
	product_id = req.body.product_id
    if (!product_id) {
        res.status(400).send({
            status: "Failed",
            message: "Product ID is not provided in the URL"
        });
        return;
    }

	CartItem.destroy({
		where: { product_id: product_id }
	})
	.then(data => {
		if (data == 1) {
		  res.send({
			status: "Success",
			message: "Product has been deleted from cart"
		  });
		} else {
		  res.send({
			status: "Failed",
			message: `Cannot delete Product with id=${id} from Cart`
		  });
		}
	  })
	.catch(err => {
		console.trace(err.message);
		res.status(500).send({
			message: "Error occurred while deleting product from cart"
		});
	})
}

const removeCartItem = (req, res) => {
	product_id = req.body.product_id
    if (!product_id) {
        res.status(400).send({
            status: "Failed",
            message: "Product ID is not provided in the URL"
        });
        return;
    }
	CartItem.findOne({where: {product_id: product_id}})
	.then(data => {
		if (data.quantity > 1){
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

const getCartItems = async (req, res) => {
	query = `select product.* , product_image.* , cart_item.*
			from product, product_image, cart_item
			where product.id = product_image.product_id 
					and product.id = cart_item.product_id
					and cart_item.user_id = ${req.user.id}`;

	try {
		var [result, metadata] = await sequelize.query(query)
		res.json({
			status: "Success",
			data: result,
			product_count: result.length,
			message: result.length + " products found"
		})
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: "Failed",
			data: [],
			product_count: 0,
			message: "Failed to load cart item"
		});
	}
}

module.exports = {
    getCartItems,
	addCartItem,
	removeCartItem,
	deleteCartItem,
}