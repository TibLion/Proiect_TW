const itemRequestDB = require("../models").ItemRequest;

const controller = {
  getAllBySenderId: async (req, res) => {
    const { userId } = req.params;
    if (userId < 0) {
      res.status(400).send({ message: "Item Request doesn't exist" });
    }
    itemRequestDB
      .findAll({
        where: {
          sender_id: userId,
        },
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
      res.status(400).send({ message: "Item Request doesn't exist" });
    }
    itemRequestDB
      .findAll({
        where: {
          receiver_id: userId,
        },
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
};
module.exports = controller;
