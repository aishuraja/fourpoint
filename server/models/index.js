const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: config.dialect,
    dialectOptions: {
      ssl: {
        rejectUnauthorized:true
      }
    },
    host: config.host
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.semester = require("../models/semester.model.js")(sequelize, Sequelize);

module.exports = db;