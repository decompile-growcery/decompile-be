module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      farm_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      product_desc: {
        type: Sequelize.STRING,
        allowNull: false
      },
      product_price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      unit_weight: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      unit_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      is_fresh: {
        type: Sequelize.BOOLEAN,
        default: true
      },
      discount: {
        type: Sequelize.INTEGER,
        default: 0
      }
    },
      {
        freezeTableName: true,
        timestamps: false
    });
    return Product;
};