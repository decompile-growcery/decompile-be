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
        allowNull: false
      },
      pick_up: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0 
      },
      shipping: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0 
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    });
    return Farm;
};