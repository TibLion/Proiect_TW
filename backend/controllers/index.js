const user = require("./Users");
const item = require("./Items");
const friendshipRequest = require("./friendRequest");
const itemRequest = require("./itemRequest");
const friendRel = require("./friendRelationship");

const controllers = {
  user,
  item,
  friendshipRequest,
  itemRequest,
  friendRel,
};

module.exports = controllers;
