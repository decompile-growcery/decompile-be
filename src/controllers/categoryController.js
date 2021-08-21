const db = require("../models");
const Category = db.category;

const createCategory = (req, res) => {
    if (!req.body.category_name) {
        res.status(400).send({
            status: "Failed",
            message: "Content can not be empty!"
        });
        return;
    }

    const category = {
        category_name: req.body.category_name
    }

    Category.create(category)
        .then(data => {
            res.send({
                status: "Success",
                message: "Category is created successfully"
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error occurred while creating category"
            });
    });
}

const seeCategories = (req, res) => {
    Category.findAll()
    .then(data => {
        res.send({
            status: "Success",
            data: data
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while retrieving categories"
      });
    });
}

const updateCategories = (req, res) => {
    if (!req.body.category_name || !req.body.id) {
        res.status(400).send({
            status: "Failed",
            message: "Content can not be empty!"
        });
        return;
    }

    Category.update({
        category_name: req.body.category_name
    }, {
        where: { id: req.body.id }
      })
    .then(data => {
        res.send({
            status: "Success",
            message: "Category is updated successfully"
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while updating categories"
      });
    });
}

const deleteCategories = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            status: "Failed",
            message: "Content can not be empty!"
        });
        return;
    }

    Category.destroy({
        where: { id: req.params.id }
      })
    .then(data => {
        if (data == 1) {
          res.send({
            status: "Success",
            message: "Category is deleted successfully"
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
          err.message || "Error occurred while deleting category"
      });
    });
}

module.exports = {
    createCategory,
    seeCategories,
    updateCategories,
    deleteCategories
}