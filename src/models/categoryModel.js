module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      category_name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    });
    return Category;
};