module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define("order_item", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false
    });
    return OrderItem;
};