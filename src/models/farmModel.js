module.exports = (sequelize, Sequelize) => {
    const Farm = sequelize.define("farm", {
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
      farm_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      farm_address: {
        type: Sequelize.STRING,
      },
      pick_up: {
        type: Sequelize.INTEGER,
        default: 1
      },
      shipping: {
        type: Sequelize.INTEGER,
        default: 1
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    });
    return Farm;
};