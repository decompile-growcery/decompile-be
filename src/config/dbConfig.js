require('dotenv').config();

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT,
    dialectOptions: process.env.DB_DIALECT_OPTIONS,
    ssl: process.env.SSL
    // timezone: "+07:00"
  };