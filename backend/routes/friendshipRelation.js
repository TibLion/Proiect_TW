const express = require("express");
const router = express.Router();
const friendReltController = require("./../controllers").friendRel;

router.get("/getFriendshipRel/:userId", friendReltController.getFriendshipRel);
router.get(
  "/getFriendshipRel/:userId/:userName",
  friendReltController.getFriendshipRelByName
);
router.post("/postFriendShip", friendReltController.postFriendShip);
router.delete("/deleteFriend/:friendID", friendReltController.deleteFriend);
router.put("/putFriendShip", friendReltController.putFriendShip);

module.exports = router;
