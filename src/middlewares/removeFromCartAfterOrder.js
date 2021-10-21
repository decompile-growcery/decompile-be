const { product } = require("../models");
const db = require("../models");
const CartItem = db.cart_item;

const removeProductFromCart = (req, res) => {
    console.log(req.body.product)
    products = req.body.product 
    for (let i = 0; i < products.length; i++) {
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
            if (i === products.length-1) {
                res.send({
                    status: "Success",
                    message: "Order created, waiting for payment",
                    checkout_url: req.checkout_url
                })
            }
        }).catch(err => {
            console.trace("Product not found in cart");
            console.log(err.message);
            res.send({
                status: "Failed",
                message: "Product is not found in Cart"
              });
        });
    }
}

module.exports = {
    removeProductFromCart
}