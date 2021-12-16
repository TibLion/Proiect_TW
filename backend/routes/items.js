const express = require("express");
const router = express.Router();
const itemController = require("./../controllers").item;

router.get("/getAllItemsByUserId/:userId", itemController.getAllItemsByUserId);

module.exports = router;
