const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const itemsRouter = require("./items");

router.use("/user", userRouter);
router.use("/item", itemsRouter);

module.exports = router;
