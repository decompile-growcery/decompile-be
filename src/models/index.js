const dbConfig = require("../config/dbConfig");
const Sequelize = require("sequelize");

console.trace(dbConfig.dialectOptions);

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	dialectOptions: JSON.parse(dbConfig.dialectOptions)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require("./userModel.js")(sequelize, Sequelize);
db.category = require("./categoryModel.js")(sequelize, Sequelize);
db.product = require("./productModel.js")(sequelize, Sequelize);
db.product_image = require("./productImageModel.js")(sequelize, Sequelize);
db.product.hasMany(db.product_image, {foreignKey: 'product_id'})
db.category.hasMany(db.product, {foreignKey: 'category_id'})

module.exports = db;