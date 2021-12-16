const UserDB = require("./../models").User;

const controller = {
  login: async (req, res) => {
    const { email, password } = req.params;
    if (!email && !password) {
      res.status(400).send({ message: "Accound doesn't exist" });
    }
    UserDB.findAll({
      where: {
        email: email,
        password: password,
      },
    })
      .then((user) => {
        res.status(200).send({ user });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  findById: async (req, res) => {
    const { userId } = req.params;
    if (userId < 0) {
      res.status(400).send({ message: "Accound doesn't exist" });
    }
    UserDB.findAll({
      where: {
        id: userId,
      },
    })
      .then((user) => {
        res.status(200).send({ user });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  findByName: async (req, res) => {
    const { name } = req.params;

    UserDB.findAll({
      where: {
        name: name,
      },
    })
      .then((user) => {
        res.status(200).send({ user });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
};

module.exports = controller;
