module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("user", {
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
        type: Sequelize.STRING,
        allowNull: false
      }
    },
      {
        freezeTableName: true,
        timestamps: false
    });
    return User;
};