module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {
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
      order_id: {
        type: Sequelize.INTEGER,
		// TODO: Change these once the Order model is already implemented
        allowNull: true, 
		unique: false,
      },
      paypal_payment_id: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    },
      {
        freezeTableName: true,
        timestamps: false
    });
    return Payment;
};