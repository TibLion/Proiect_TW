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
};

module.exports = controller;
