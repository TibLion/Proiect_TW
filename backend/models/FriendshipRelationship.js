const express = require("express");
const Sequelize = require("sequelize");
const User = require("./User");

const sequelize = new Sequelize("foodwaste", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

var FriendshipRelationship = sequelize.define(
  "FriendshipRelationships",
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

    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "ItemRequests",
    timestamps: false,
  }
);
sequelize.sync();
FriendshipRelationship.belongsTo(User, {
  foreignKey: "sender_id",
  targetKey: "id",
});
FriendshipRelationship.belongsTo(User, {
  foreignKey: "receiver_id",
  targetKey: "id",
});

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

module.exports = FriendshipRelationship;
