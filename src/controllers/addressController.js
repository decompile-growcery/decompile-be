const db = require("../models");
const Address = db.address;
const sequelize = db.sequelize;

const getAddressByUserId = async (req, res) => {
    try {
        var query = `SELECT a.city, a.state, a.postal_code, a.street_address
        FROM address as A, users as U
        WHERE a.user_id = u.id AND u.user_id = u.id`
        var data = await sequelize.query(query, {
            replacements: [req.query.user_id]
        })
        res.send({
            status: "Success",
            message: "Successful",
            data: data[0]
        })
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: error.message || "Get address failed"
        })
    }
}

const insertToAddress = (req, res) => {
    Address.create({
        user_id: req.user.id,
        city: req.body.city,
        state: req.body.state,
        postal_code: req.body.postal_code,
        street_address: req.body.street_address
    })
    .then(data => {
        res.send({
            status: "Success",
            message: "Successful"
        })
    })
    .catch(error => {
        res.status(500).send({
            status: "Failed",
            message: error.message || "Insert address failed"
        })
    })
}

const updateToAddress = (req, res) => {
    Address.update({
        user_id: req.user.id,
        city: req.body.city,
        state: req.body.state,
        postal_code: req.body.postal_code,
        street_address: req.body.street_address
    }, {
        where: {
            id: req.body.id
        }
    })
    .then(data => {
        res.send({
            status: "Success",
            message: "Successful"
        })
    })
    .catch(error => {
        res.status(500).send({
            status: "Failed",
            message: error.message || "Insert address failed"
        })
    })
}

const deleteAddress = (req, res) => {
    Address.destroy({
        where: {
            id: req.query.id
        }
    })
    .then(data => {
        res.send({
            status: "Success",
            message: "Successful"
        })
    })
    .catch(error => {
        res.status(500).send({
            status: "Failed",
            message: error.message || "Insert address failed"
        })
    })
}

module.exports = {
    getAddressByUserId,
    insertToAddress,
    updateToAddress,
    deleteAddress
}