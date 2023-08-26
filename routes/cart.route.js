const router = require("express").Router();
const {
  addProductToCart,
  getUserCart,
} = require("../controllers/cart.controller");

router.route("/").post(getUserCart);
router.route("/addtocart").post(addProductToCart);

module.exports = router;
