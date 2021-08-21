module.exports = (sequelize, Sequelize) => {
    const ProductImage = sequelize.define("product_image", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
        freezeTableName: true,
        timestamps: false
    });
    return ProductImage;
};