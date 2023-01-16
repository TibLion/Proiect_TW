const express = require("express");
const router = express.Router();
const itemController = require("./../controllers").item;

router.get("/getAllItemsByUserId/:userId", itemController.getAllItemsByUserId);
router.get(
  "/getAllItemsAvailableByUserId/:userId",
  itemController.getAllItemsAvailableByUserId
);
router.get("/getAllItemsByItemId/:itemId", itemController.getAllItemsByItemId);
router.get("/getAllItemsByName/:name", itemController.getAllItemsByName);
router.get(
  "/getAllItemsByName/:name/:userId",
  itemController.getAllItemsByNameAndUserId
);
router.get("/getAllItems", itemController.getAllItems);
router.delete("/deleteItemById/:itemId/:userId", itemController.deleteItemById);
router.post("/postItem", itemController.postItem);
router.put("/putItem", itemController.putItems);

module.exports = router;
