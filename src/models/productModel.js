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
      }
    },
      {
        freezeTableName: true,
        timestamps: false
    });
    return Product;
};