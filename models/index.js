const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ocupation = require("./ocupation.model.js")(sequelize, Sequelize);
db.filters = require("./filters.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.params = require("./params.model.js")(sequelize, Sequelize);
db.filtersMaxMin = require("./filtersMaxMin.model.js")(sequelize, Sequelize);

module.exports = db;