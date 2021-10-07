module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status_id: {
        type: Sequelize.INTEGER,
        default: 1
      },
      payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      total_weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      shipping_cost: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      is_delivery: {
        type: Sequelize.BOOLEAN,
        default: 1
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    });
    return Order;
};