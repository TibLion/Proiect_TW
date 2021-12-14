const User = require("./User");
const Item = require("./Item");
const ItemRequest = require("./ItemRequest");
const FriendshipRelationship = require("./FriendshipRelationship");
const FriendshipRequest = require("./FriendshipRequest");
const Sequelize = require("sequelize");

// check database connection
const sequelize = new Sequelize("foodwaste", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.sync();

sequelize
  .authenticate()
  .then(function (success) {
    console.log("Successfully we are connected with the database");
  })
  .catch(function (error) {
    console.log("We have some error while connecting database connection");
  });
