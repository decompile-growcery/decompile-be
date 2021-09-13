const db = require("../models");
const sequelize = db.sequelize;
const Order = db.orders;
const OrderItem = db.order_item;
const { QueryTypes } = require('sequelize');

const insertOrder = (req, res, next) => {
    var order = {
        user_id: req.user.id,
        address_id: req.body.address_id,
        total_price: req.body.total_price,
        is_delivery: req.body.is_delivery,
        payment_id: req.payment_id,
        status_id: req.body.status_id
    }
    Order.create(order)
    .then(data => {
        req.data = data;
        req.product = req.body.product;
        next()
    })
    .catch(error => {
        res.status(500).send({
            status: "Failed",
            message: error.message || "Create order failed"
        })
    })
}

const insertOrderItem = (req, res, next) => {
    var productList = req.product;
    var count = 0;
    for (let i = 0; i < productList.length; i++) {
        OrderItem.create({
            order_id: req.data.id,
            product_id: productList[i].product_id,
            note: productList[i].note,
            amount: productList[i].amount,
            price: productList[i].price,
        }).catch(error => {
            res.status(500).send({
                status: "Failed",
                message: error.message || "Insert order item failed"
            })
        })
        count++
    }
    if (count === productList.length) {
        res.send({
            status: "Success",
            message: "Order created, waiting for payment",
            checkout_url: req.checkout_url
        })
    }
}

const getOrdersByUser = async (req, res) => {
    try {
        var query2 = `SELECT o.id as order_id, o.user_id, o.payment_id, o.address_id, s.status,
        oi.id as order_item_id, oi.product_id, p.id as product_id, f.id as farm_id, f.farm_name, f.farm_address,
        p.product_name, p.product_desc, p.product_price, p.unit_weight, p.unit_name, p.stock, p.is_fresh, p.discount, 
        pi.id as image_id, pi.image 
        FROM orders o
        JOIN order_status s ON s.id = o.status_id
        JOIN order_item oi ON o.id = oi.order_id
        JOIN product p ON oi.product_id = p.id
        JOIN farm f ON p.farm_id = f.id
        JOIN product_image pi ON pi.product_id = p.id
        WHERE o.user_id = ${req.user.id}`

        var orderItems = await sequelize.query(query2,
            { type: QueryTypes.SELECT });

        res.send({
            status: "Success",
            data: orderItems
        })
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: error.message || "Get order failed"
        })
    }
}

const updateOrderStatus = (req, res) => {
    Order.update({
        status_id: req.body.status_id
    }, {
        where: {
            id: req.body.order_id
        }
    })
    .then(data => {
        res.send({
            status: "Success",
            message: "Order status updated"
        })
    })
    .catch(error => {
        res.status(500).send({
            status: "Failed",
            message: error.message || "Create order failed"
        })
    })
}

module.exports = {
    insertOrder,
    insertOrderItem,
    getOrdersByUser,
    updateOrderStatus
}