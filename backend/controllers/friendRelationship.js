const friendRelDB = require("../models").FriendshipRelationship;
const UsersDB = require("./../models").User;
const { Op } = require("sequelize");

function isIdUnique(sender_id, receiver_id) {
  return friendRelDB
    .count({
      where: {
        sender_id: sender_id,
        receiver_id: receiver_id,
      },
    })
    .then((count) => {
      if (count != 0) {
        return false;
      }
      return true;
    });
}

const controller = {
  getFriendshipRel: async (req, res) => {
    const { userId } = req.params;
    if (userId < 0) {
      res.status(400).send({ message: "Friendship doesn't exist" });
    }
    friendRelDB
      .findAll({
        where: {
          sender_id: parseInt(userId),
        },
        include: [
          {
            model: UsersDB,
          },
        ],
      })
      .then((friendship) => {
        res.status(200).send(friendship);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  getFriendshipRelByName: async (req, res) => {
    const { userId, userName } = req.params;
    console.log(userName);
    if (userId < 0) {
      res.status(400).send({ message: "Friendship doesn't exist" });
    }
    friendRelDB
      .findAll({
        where: {
          sender_id: parseInt(userId),
        },
        include: [
          {
            model: UsersDB,
            where: { name: userName },
          },
        ],
      })
      .then((friendship) => {
        res.status(200).send(friendship);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  postFriendShip: async (req, res) => {
    if (await isIdUnique(req.body.sender_id, req.body.receiver_id))
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
          category: req.body.category,
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
      .then((friendship) => {
        res.status(200).send({ friendship });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
};
module.exports = controller;
