const express = require("express");
const Sequelize = require("sequelize");
const User = require("./User");

const sequelize = new Sequelize("foodwaste", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

var Item = sequelize.define(
  "Items",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    category: {
      type: Sequelize.INTEGER,
    },
    expiration_date: {
      type: Sequelize.DATE,
    },
    is_available: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    modelName: "Item",
    timestamps: false,
  }
);
sequelize.sync();
Item.belongsTo(User, { foreignKey: "user_id", targetKey: "id" }); // Adds fk_companyname to User

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
module.exports = Item;
