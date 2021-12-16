const express = require("express");
const router = express.Router();
const itemController = require("./../controllers").item;

router.get("/getAllItemsByUserId/:userId", itemController.getAllItemsByUserId);
router.get("/getAllItemsByItemId/:itemId", itemController.getAllItemsByItemId);
router.get("/getAllItemsByName/:name", itemController.getAllItemsByName);
router.get("/getAllItems", itemController.getAllItems);

module.exports = router;
