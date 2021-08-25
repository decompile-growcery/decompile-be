const dbConfig = require("../config/dbConfig");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	dialectOptions: JSON.parse(dbConfig.dialectOptions)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// DBs
db.cartitem = require("./cartItemModel.js")(sequelize, Sequelize);
db.users = require("./userModel.js")(sequelize, Sequelize);
db.category = require("./categoryModel.js")(sequelize, Sequelize);
db.product = require("./productModel.js")(sequelize, Sequelize);
db.product_image = require("./productImageModel.js")(sequelize, Sequelize);

// Foreign Keys
// FIXME: Check product foreign key validation for cartitem
db.product.hasMany(db.product_image, {foreignKey: 'product_id'})
db.category.hasMany(db.product, {foreignKey: 'category_id'})
db.users.hasMany(db.cartitem, {foreignKey: 'user_id'})
db.product.hasMany(db.cartitem, {foreignKey: 'product_id'})

module.exports = db;