module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING,
		    unique: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
		    unique: true,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING,
		    unique: false,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
		    unique: false,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING
      },
      googleId: {
        type: Sequelize.STRING
      }
    },
      {
        freezeTableName: true,
        timestamps: false
    });
    return User;
};