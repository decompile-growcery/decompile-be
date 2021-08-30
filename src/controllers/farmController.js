const db = require("../models");
const Farm = db.farm;

const getFarmId = (req, res, next) => {
    Farm.findOne({
        where: {user_id: req.user.id}
    })
    .then(data => {
        req.farm_id = data.id
        next()
    })
    .catch(err => {
      res.status(500).send({
        status: "Failed",
        message:
          err.message || "Farm does not exist"
      });
    });
  }

const createFarm = (req, res) => { 
      const name = req.data.username + `'s farm`
      const farm = {
          user_id: req.data.id,
          farm_name: name
      }
  
      Farm.create(farm)
          .then(data => {
              res.send({
                status: "Success"
              })
          })
          .catch(err => {
              res.status(500).send({
                  message:
                  err.message || "Error occurred while creating farm"
              });
      });
}

const updateFarm = (req, res) => {
    if (!req.body.farm_name || !req.body.farm_address) {
        res.status(400).send({
            status: "Failed",
            message: "Content can not be empty!"
        });
        return;
    }

    const farm = {
        farm_name: req.body.farm_name,
        farm_address: req.body.farm_address,
        pick_up: req.body.pick_up,
        shipping: req.body.shipping
    }

    Farm.update(farm, {
        where: { id: req.body.id }
      })
    .then(data => {
        res.send({
            status: "Success",
            message: "Farm is updated successfully"
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while updating farm"
      });
    });
}

const getFarm = (req, res) => {
    Farm.findOne({
        where: {user_id: req.user.id}
    })
    .then(data => {
        res.send({
            status: "Success",
            data: data
        })
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Error occurred while retrieving farm"
        });
    });
}

const deleteFarm = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            status: "Failed",
            message: "Content can not be empty!"
        });
        return;
    }

    Farm.destroy({
        where: { id: req.params.id }
      })
    .then(data => {
        if (data == 1) {
          res.send({
            status: "Success",
            message: "Farm is deleted successfully"
          });
        } else {
          res.send({
            status: "Failed",
            message: `Cannot delete Product with id=${id}`
          });
        }
      })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while deleting farm"
      });
    });
}

module.exports = {
    getFarmId,
    createFarm,
    updateFarm,
    getFarm,
    deleteFarm
}