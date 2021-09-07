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
      payment_id: {
        type: Sequelize.INTEGER,
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status_id: {
        type: Sequelize.INTEGER,
        default: 1
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    });
    return Order;
};