const express = require("express");
const router = express.Router();
const itemRequestController = require("./../controllers").itemRequest;

router.get(
  "/getAllByReceiverId/:userId",
  itemRequestController.getAllByReceiverId
);
router.get("/getAllBySenderId/:userId", itemRequestController.getAllBySenderId);
router.post("/postItemRequest", itemRequestController.postItemRequest);
// router.delete("/delete/:id/:item_id", itemRequestController.deleteRequest);
router.get("/accept/:id/:item_id", itemRequestController.acceptRequest);

module.exports = router;
