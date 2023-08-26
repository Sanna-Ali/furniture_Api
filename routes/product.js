const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProductById,
  addProductToCart,
  getCartCost,
  deleteProductById,
  updateProductById,
} = require("../controllers/product");
const photoupload = require("../middleware/photoupload");
const router = express.Router();

router
  .route("/")
  .post(photoupload.single("image"), addProduct)
  .get(getAllProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(deleteProductById)
  .post(updateProductById);

module.exports = router;
//648608b6d25d18e6374c739
