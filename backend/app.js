const experss = require("express");
const bodyParser = require("body-parser");

const User = require("./models/User");
const Item = require("./models/Item");
const ItemRequest = require("./models/ItemRequest");
const FriendshipRelationship = require("./models/FriendshipRelationship");
const FriendshipRequest = require("./models/FriendshipRequest");

const app = experss();

app.use(bodyParser.json());

const PORT = 8080;

//app.use("/", appRoutes);

//listed request here
app.listen(PORT, function () {
  console.log("Application is running");
});
