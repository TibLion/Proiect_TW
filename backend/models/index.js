const Sequelize = require("sequelize");
const db = require("./../config/db");

//we get our database
const UserModel = require("./User");
const FriendshipRelationshipModel = require("./FriendshipRelationship");
const FriendshipRequestModel = require("./FriendshipRequest");
const ItemModel = require("./Item");
const ItemRequestModal = require("./ItemRequest");

//we get our tabels
const User = UserModel(db, Sequelize);
const FriendshipRelationship = FriendshipRelationshipModel(db, Sequelize);
const FriendshipRequest = FriendshipRequestModel(db, Sequelize);
const Item = ItemModel(db, Sequelize);
const ItemRequest = ItemRequestModal(db, Sequelize);

//tabels relationships

//Friendship Relations

FriendshipRelationship.belongsTo(User, {
  foreignKey: "sender_id",
  targetKey: "id",
});
FriendshipRelationship.belongsTo(User, {
  foreignKey: "receiver_id",
  targetKey: "id",
});

// Friendship Request

FriendshipRequest.belongsTo(User, {
  foreignKey: "sender_id",
  targetKey: "id",
  as: "SenderId",
});
FriendshipRequest.belongsTo(User, {
  foreignKey: "receiver_id",
  targetKey: "id",
  as: "ReceiverId",
});

//Item

Item.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });

// Item Request
ItemRequest.belongsTo(User, {
  foreignKey: "sender_id",
  targetKey: "id",
  as: "SenderId",
});
ItemRequest.belongsTo(User, {
  foreignKey: "receiver_id",
  targetKey: "id",
  as: "ReceiverId",
});
ItemRequest.belongsTo(Item, { foreignKey: "item_id", targetKey: "id" });

//export

module.exports = {
  User,
  FriendshipRequest,
  FriendshipRelationship,
  Item,
  ItemRequest,
  connection: db,
};
