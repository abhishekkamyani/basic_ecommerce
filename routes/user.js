const express = require("express");
const router = express.Router();
const usersController = require("../controller/user");

router
  .get("/", usersController.getAll)
  .get("/:id", usersController.get)
  .put("/:id", usersController.replace)
  .patch("/:id", usersController.update)
  .delete("/:id", usersController.deleteIt);

exports.router = router;