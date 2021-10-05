const db = require("../models");
const User = db.users;

const getUserById = (req, res) => {
    User.findByPk(req.user.id, {
        attributes: {
            exclude: ["password"]
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

module.exports = {
    getUserById
}