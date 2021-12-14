const express = require("express");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("foodwaste", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

var User = sequelize.define(
  "Users",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    modelName: "User",
    timestamps: false,
  }
);
sequelize.sync();

// check database connection
sequelize
  .authenticate()
  .then(function (success) {
    console.log("Successfully we are connected with the database");
  })
  .catch(function (error) {
    console.log("We have some error while connecting database connection");
    console.log(error);
  });

module.exports = User;
