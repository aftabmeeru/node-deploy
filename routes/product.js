const express = require("express");
const productController = require("../controllers/product");
const router = express.Router();

router
  .post("/", productController.createProduct)
  // .get("/ssr", productController.getAllProductsSSR)
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getProduct)
  .put("/:id", productController.replaceProduct)
  .patch("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

exports.router = router;
