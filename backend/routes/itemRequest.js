const express = require("express");
const router = express.Router();
const itemRequestController = require("./../controllers").itemRequest;

router.get(
  "/getAllByReceiverId/:userId",
  itemRequestController.getAllByReceiverId
);
router.get("/getAllBySenderId/:userId", itemRequestController.getAllBySenderId);
router.post("/postItemRequest", itemRequestController.postItemRequest);

module.exports = router;
