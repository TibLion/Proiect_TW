const friendRelDB = require("../models").FriendshipRelationship;
const { Op } = require("sequelize");

const controller = {
  getFriendshipRel: async (req, res) => {
    const { userId } = req.params;
    if (userId < 0) {
      res.status(400).send({ message: "Friendship  doesn't exist" });
    }
    friendRelDB
      .findAll({
        where: {
          [Op.or]: [
            { sender_id: parseInt(userId) },
            { receiver_id: parseInt(userId) },
          ],
        },
      })
      .then((friendship) => {
        res.status(200).send({ friendship });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  postFriendShip: async (req, res) => {
    friendRelDB
      .create({
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id,
        category: req.body.category,
      })
      .then((friendship) => {
        res.status(200).send({ friendship });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  putFriendShip: async (req, res) => {
    friendRelDB
      .update(
        {
          sender_id: req.body.sender_id,
          receiver_id: req.body.receiver_id,
          category: req.body.item_id,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      )
      .then((friendship) => {
        res.status(200).send({ friendship });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  deleteFriend: async (req, res) => {
    const { friendID } = req.params;
    if (friendID < 0) {
      res.status(400).send({ message: "Item doesn't exist" });
    }
    friendRelDB
      .destroy({
        where: {
          id: friendID,
        },
      })
      .then((items) => {
        res.status(200).send({ items });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
};
module.exports = controller;
