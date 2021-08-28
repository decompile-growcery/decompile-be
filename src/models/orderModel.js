module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("ORDER", {
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
        allowNull: false,
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    });
    return Order;
};