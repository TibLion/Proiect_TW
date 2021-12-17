const express = require("express");
const router = express.Router();
const friendRequestController = require("./../controllers").friendshipRequest;

router.get(
  "/getAllReceivedFriendRequests/:userId",
  friendRequestController.getAllReceivedFriendRequests
);
router.post("/postFrRequest", friendRequestController.postFrRequest);
router.delete(
  "/deleteFriendRequests/:id",
  friendRequestController.deleteFriendRequests
);

module.exports = router;
