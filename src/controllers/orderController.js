const db = require("../models");
const sequelize = db.sequelize;
const Order = db.orders;
const OrderItem = db.order_item;
const { QueryTypes } = require('sequelize');

const insertOrder = (req, res, next) => {
    console.log(req.payment_id)
    var order = {
        user_id: req.user.id,
        address_id: req.body.address_id,
        total_price: req.body.total_price,
        is_delivery: req.body.is_delivery,
        payment_id: req.payment_id,
        status_id: 1,
        shipping_cost: req.body.shipping_cost,
        total_weight: req.body.total_weight
    }
    Order.create(order)
    .then(data => {
        // console.log(data)
        req.order = data;
        req.product = req.body.product;
        next()
    })
    .catch(error => {
        console.log(error.message)
        res.status(500).send({
            status: "Failed",
            message: error.message || "Create order failed"
        })
    })
}

const insertOrderItem = (req, res, next) => {
    var productList = req.body.product;
    var count = 0;
    for (let i = 0; i < productList.length; i++) {
        OrderItem.create({
            order_id: req.order.id,
            product_id: productList[i].product_id,
            note: productList[i].note,
            amount: productList[i].amount,
            price: productList[i].price,
            weight: productList[i].weight,
        }).catch(error => {
            console.log("error insert oi")
            res.status(500).send({
                status: "Failed",
                message: error.message || "Insert order item failed"
            })
        })
        count++
    }
    if (count === productList.length) {
        next()
        
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

const updateStatusConfirmed = (req, res) => {
    Order.update({
        status_id: 2
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

const getOrdersByFarmer = async (req, res) => {
    try {
        var query2 = `SELECT o.id as order_id, o.address_id, o.status_id, s.status, o.total_price, o.total_weight, o.shipping_cost, o.is_delivery,
        oi.id as order_item_id, oi.product_id, oi.amount, oi.note, oi.weight, oi.price, 
        p.id as product_id, p.product_name, p.unit_weight, p.unit_name, pi.image, 
        u.id as user_id, u.first_name, u.last_name, a.city, a.state, a.postal_code, a.street_address,
        count(o.id) as "count_order"
        FROM orders o
        JOIN order_status s ON s.id = o.status_id
        JOIN order_item oi ON o.id = oi.order_id
        JOIN product p ON oi.product_id = p.id
        JOIN users u ON u.id = o.user_id
        JOIN farm f ON f.id = p.farm_id
        JOIN address a ON a.id = o.address_id
        JOIN product_image pi ON pi.product_id = p.id
        WHERE f.user_id = ${req.user.id}`
        var orderItems = await sequelize.query(query2,
            { type: QueryTypes.SELECT });

        res.send({
            message: "Success",
            data: orderItems
        })
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: error.message || "Get orders by farmer"
        })
    }
}

module.exports = {
    insertOrder,
    insertOrderItem,
    getOrdersByUser,
    updateOrderStatus,
    updateStatusConfirmed,
    getOrdersByFarmer
}