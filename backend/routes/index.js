const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const itemsRouter = require("./items");
const friendshipRequestRouter = require("./friendshipRequest");
const itemRequestRouter = require("./itemRequest");
const FriendshipRelationship = require("./friendshipRelation");

router.use("/user", userRouter);
router.use("/item", itemsRouter);
router.use("/friendshipRequest", friendshipRequestRouter);
router.use("/itemRequest", itemRequestRouter);
router.use("/friendshipRelation", FriendshipRelationship);

module.exports = router;
