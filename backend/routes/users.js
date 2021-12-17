const express = require("express");
const router = express.Router();
const userController = require("./../controllers").user;

router.get("/verifyUser/:email/:password", userController.login);
router.get("/findById/:userId", userController.findById);
router.get("/findByName/:name", userController.findByName);
router.post("/createNewUser", userController.createNewUser);

module.exports = router;
