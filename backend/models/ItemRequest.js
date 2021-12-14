const express = require("express");
const Sequelize = require("sequelize");
const User = require("./User");
const Item = require("./Item");

const sequelize = new Sequelize("foodwaste", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

var ItemRequest = sequelize.define(
  "ItemRequests",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sender_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    receiver_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    item_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    modelName: "ItemRequests",
    timestamps: false,
  }
);
sequelize.sync();
ItemRequest.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });
ItemRequest.belongsTo(Item, { foreignKey: "item_id", targetKey: "id" });

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

module.exports = ItemRequest;
