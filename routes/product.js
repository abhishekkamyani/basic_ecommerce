const express = require("express");
const router = express.Router();
const productController = require("../controller/product");

router
  .get("/", productController.getAll)
  .get("/:id", productController.get)
  .post("/", productController.create)
  .put("/:id", productController.replace)
  .patch("/:id", productController.update)
  .delete("/:id", productController.deleteIt);

exports.router = router;