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
        res.status(200).send(items);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  getAllItemsAvailableByUserId: async (req, res) => {
    const { userId } = req.params;
    if (userId < 0) {
      res.status(400).send({ message: "Item doesn't exist" });
    }
    ItemsDB.findAll({
      where: {
        user_id: userId,
        isAvailable: true,
      },
    })
      .then((items) => {
        res.status(200).send(items);
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
        res.status(200).send(items);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  getAllItemsByNameAndUserId: async (req, res) => {
    const { name, userId } = req.params;
    ItemsDB.findAll({
      where: {
        name: name,
        user_id: userId,
      },
    })
      .then((items) => {
        res.status(200).send(items);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  getAllItems: async (req, res) => {
    ItemsDB.findAll({})
      .then((items) => {
        res.status(200).send({ items });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  deleteItemById: async (req, res) => {
    const { itemId, userId } = req.params;
    if (itemId < 0 && userId < 0) {
      res.status(400).send({ message: "Item doesn't exist" });
    }
    ItemsDB.destroy({
      where: {
        id: itemId,
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
  postItem: async (req, res) => {
    ItemsDB.create({
      user_id: req.body.user_id,
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      category: req.body.category,
      expirationDate: req.body.expirationDate,
      isAvailable: req.body.isAvailable,
      photo: req.body.photo,
    })
      .then((item) => {
        res.status(200).send({ item });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  putItems: async (req, res) => {
    ItemsDB.update(
      {
        user_id: req.body.user_id,
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        category: req.body.category,
        expirationDate: req.body.expirationDate,
        isAvailable: req.body.isAvailable,
        photo: req.body.photo,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then((item) => {
        res.status(200).send({ item });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
};
module.exports = controller;
