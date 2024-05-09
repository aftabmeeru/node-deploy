const express = require("express");
const usersController = require("../controllers/users");
const router = express.Router();

router
  .get("/", usersController.getAllUsers)
  .get("/:id", usersController.getUser)
  .put("/:id", usersController.replaceUser)
  .patch("/:id", usersController.updateUser)
  .delete("/:id", usersController.deleteUser);

exports.router = router;