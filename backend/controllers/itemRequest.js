const itemRequestDB = require("../models").ItemRequest;
const UsersDB = require("./../models").User;
const ItemDB = require("./../models").Item;

function isIdUnique(item_id, sender_id, receiver_id) {
  return itemRequestDB
    .count({
      where: {
        item_id: item_id,
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
  getAllBySenderId: async (req, res) => {
    const { userId } = req.params;
    if (userId < 0) {
      res.status(400).send({ message: "Item request doesn't exist" });
    }
    itemRequestDB
      .findAll({
        where: {
          sender_id: userId,
          status: "PENDING",
        },
        include: [
          {
            model: UsersDB,
            as: "ReceiverId",
          },
          {
            model: ItemDB,
          },
        ],
      })
      .then((itemReq) => {
        res.status(200).send(itemReq);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  getAllByReceiverId: async (req, res) => {
    const { userId } = req.params;
    if (userId < 0) {
      res.status(400).send({ message: "Item request doesn't exist" });
    }
    itemRequestDB
      .findAll({
        where: {
          receiver_id: userId,
          status: "PENDING",
        },
        include: [
          {
            model: UsersDB,
            as: "SenderId",
          },
          {
            model: ItemDB,
          },
        ],
      })
      .then((itemReq) => {
        res.status(200).send(itemReq);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  postItemRequest: async (req, res) => {
    if (
      await isIdUnique(
        req.body.item_id,
        req.body.sender_id,
        req.body.receiver_id
      )
    )
      itemRequestDB
        .create({
          sender_id: req.body.sender_id,
          receiver_id: req.body.receiver_id,
          item_id: req.body.item_id,

          date: req.body.date,
          status: req.body.status,
        })
        .then((item) => {
          res.status(200).send(item);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({ message: "Server error" });
        });
  },
  acceptRequest: async (req, res) => {
    const { id, item_id } = req.params;
    itemRequestDB
      .update(
        {
          status: "REFUSED",
        },
        {
          where: {
            item_id: item_id,
          },
        }
      )

      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
    itemRequestDB
      .update(
        {
          status: "ACCEPTED",
        },
        {
          where: {
            id: id,
          },
        }
      )

      .then((item) => {
        res.status(200).send(item);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
};
module.exports = controller;
