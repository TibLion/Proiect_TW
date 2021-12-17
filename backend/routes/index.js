const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const itemsRouter = require("./items");
const friendshipRequestRouter = require("./friendshipRequest");

router.use("/user", userRouter);
router.use("/item", itemsRouter);
router.use("/friendshipRequest", friendshipRequestRouter);

module.exports = router;
