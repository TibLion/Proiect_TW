const FriendshipRequestDB = require("./../models").FriendshipRequest;

const controller = {
  getAllReceivedFriendRequests: async (req, res) => {
    const { userId } = req.params;
    if (userId < 0) {
      res.status(400).send({ message: "User doesn't exist" });
    }
    FriendshipRequestDB.findAll({
      where: {
        receiver_id: userId,
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
  deleteFriendRequests: async (req, res) => {
    const { id } = req.params;
    if (id < 0) {
      res.status(400).send({ message: "User doesn't exist" });
    }
    FriendshipRequestDB.destroy({
      where: {
        id: id,
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
  postFrRequest: async (req, res) => {
    FriendshipRequestDB.create({
      sender_id: req.body.sender_id,
      receiver_id: req.body.receiver_id,
      date: req.body.date,
    })
      .then((frReq) => {
        res.status(200).send({ frReq });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
};
module.exports = controller;
