const db = require("../models");
const User = db.users;
const sequelize = db.sequelize;

const getUserById = (req, res) => {
    User.findByPk(req.user.id, {
        attributes: {
            exclude: ["password", "googleId"]
        }
    })
    .then(data => 
        res.send({
            status: "Success",
            data: data
        })
    ).catch(error => 
        res.status(500).send({
            status: "Failed",
            message: error.message || "Failed to fetch user"
        })
    )
}

const updateUser = (req, res, next) => {
    const user = {
        first_name: req.body.first_name.trim(),
        last_name: req.body.last_name.trim(),
    }

    User.update(user, {
        where: {
            id: req.user.id
        }
    })
    .then(data => {
        next()
    })
    .catch(error => 
        res.status(500).send({
            status: "Failed",
            message: error.message || "Failed to update user"
    }))
}

const getUserAndAddress = async (req, res) => {
    try {
        var query = `SELECT u.id as "user_id", u.username, u.email, u.first_name, u.last_name, 
        a.id as "address_id", a.city, a.state, a.postal_code, a.street_address
        FROM users as u
        LEFT JOIN address a ON a.user_id = u.id
        WHERE u.id = ?`
        var data = await sequelize.query(query, {
            replacements: [req.user.id]
        })
        res.send({
            status: "Success",
            message: "Successful",
            data: data[0]
        })
    } catch (error) {
            res.status(500).send({
                status: "Failed",
                message: error.message || "Failed to fetch user"
        })
    }
}

module.exports = {
    getUserById,
    updateUser,
    getUserAndAddress
}