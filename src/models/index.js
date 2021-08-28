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
db.cart_item = require("./cartItemModel.js")(sequelize, Sequelize);
db.users = require("./userModel.js")(sequelize, Sequelize);
db.category = require("./categoryModel.js")(sequelize, Sequelize);
db.farm = require("./farmModel.js")(sequelize, Sequelize);
db.product = require("./productModel.js")(sequelize, Sequelize);
db.product_image = require("./productImageModel.js")(sequelize, Sequelize);
db.address = require("./addressModel.js")(sequelize, Sequelize);
db.order = require("./orderModel.js")(sequelize, Sequelize);
db.order_item = require("./orderItemModel.js")(sequelize, Sequelize);

// Foreign Keys
// FIXME: Check product foreign key validation for cartitem
db.product.hasMany(db.product_image, {foreignKey: 'product_id'})
db.category.hasMany(db.product, {foreignKey: 'category_id'})
db.users.hasOne(db.farm, {foreignKey: 'user_id'})
db.users.hasMany(db.cart_item, {foreignKey: 'user_id'})
db.product.hasMany(db.cart_item, {foreignKey: 'product_id'})
db.users.hasMany(db.address, {foreignKey: 'user_id'})
db.users.hasMany(db.order, {foreignKey: 'user_id'})
db.order.hasMany(db.order_item, {foreignKey: 'order_id'})
db.order_item.hasMany(db.product, {foreignKey: 'product_id'})

module.exports = db;