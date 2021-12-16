const ItemsDB = require("./../models").Item;

const controller = {
  getAllItemsByUserId: async (req, res) => {
    const { userId } = req.params;
    if (userId < 0) {
      res.status(400).send({ message: "Item doesn't exist" });
    }
    ItemsDB.findAll({
      where: {
        user_id: userId,
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
  getAllItemsByItemId: async (req, res) => {
    const { itemId } = req.params;
    if (itemId < 0) {
      res.status(400).send({ message: "Item doesn't exist" });
    }
    ItemsDB.findAll({
      where: {
        id: itemId,
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
  getAllItemsByName: async (req, res) => {
    const { name } = req.params;

    ItemsDB.findAll({
      where: {
        name: name,
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
  getAllItems: async (req, res) => {
    ItemsDB.findAll({
      // where: {
      //   name: name,
      // },
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
