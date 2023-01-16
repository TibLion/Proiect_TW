const Sequelize = require("sequelize");

const sequelize = new Sequelize("foodwaste", "root", "", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamp: "true",
  },
});

module.exports = sequelize;
