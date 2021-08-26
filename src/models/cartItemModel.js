module.exports = (sequelize, Sequelize) => {
    const CartItem = sequelize.define("cart_item", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
		unique: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
		defaultValue: 0,
        allowNull: false
      }
    },
      {
        freezeTableName: true,
        timestamps: false
    });
    return CartItem;
};