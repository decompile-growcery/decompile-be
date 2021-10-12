const db = require("../models");
const User = db.users;

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

const updateUser = (req, res) => {
    const user = {
        first_name: req.body.first_name.trim(),
        last_name: req.body.last_name.trim(),
    }

    User.update(user, {
        where: {
            id: req.body.user_id
        }
    })
    .then(data => {
        if (data == 1) {
            res.send({
                status: "Success",
                message: "User update successful"
            })
        } else {
            res.status(500).send({
                status: "Failed",
                message: error.message || "Failed to update user"
            })
        }
    })
    .catch(error => 
        res.status(500).send({
            status: "Failed",
            message: error.message || "Failed to update user"
    }))
}

module.exports = {
    getUserById,
    updateUser
}