const express = require("express");
const router = express.Router();
const userController = require("./../controllers").user;

router.get("/verifyUser/:email/:password", userController.login);

module.exports = router;
