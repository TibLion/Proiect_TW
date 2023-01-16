const FriendshipRequestDB = require("./../models").FriendshipRequest;
const UsersDB = require("./../models").User;

function isIdUnique(sender_id, receiver_id) {
  return FriendshipRequestDB.count({
    where: {
      sender_id: sender_id,
      receiver_id: receiver_id,
    },
  }).then((count) => {
    if (count != 0) {
      return false;
    }
    return true;
  });
}

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
      include: [
        {
          model: UsersDB,
          as: "SenderId",
        },
      ],
    })
      .then((frReq) => {
        res.status(200).send(frReq);
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
    if (await isIdUnique(req.body.sender_id, req.body.receiver_id))
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
