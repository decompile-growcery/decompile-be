const { product } = require("../models");
const db = require("../models");
const CartItem = db.cart_item;

const removeProductFromCart = (req, res) => {
    console.log(req.body.product)
    products = req.body.product 
    for (let i = 0; i < products.length; i++) {
        CartItem.findOne({where: {product_id: products[i].product_id}})
        .then(data => {
            if (data.quantity > 1){
                CartItem.decrement('quantity', 
                { by: products[i].amount, 
                    where: 
                    { id: data.id }})
                .catch(err => {
                    res.status(500).send({
                        status: "Success",
                        message: err.message || "Failed to remove product"
                      });
                })
            }else{
                CartItem.destroy({
                    where: { id: data.id }
                  })
                .then(data => {
                    if (data != 1) {
                      res.send({
                        status: "Failed",
                        message: `Cannot remove Product with id=${id} from Cart`
                      });
                  }})
                .catch(err => {
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