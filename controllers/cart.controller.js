const { Cart } = require("../models/cart");
const Product = require("../models/product");
exports.addProductToCart = async (req, res) => {
  try {
    var nproduct = await Product.findById(req.body.productId);
    if (!nproduct) {
      return res.status(404).json("product not found");
    }
    const newItem = {
      productId: req.body.productId,
      qty: req.body.qty,
      //cost: +req.body.price * +req.body.qty,
      cost: nproduct.price * req.body.qty,
    };
    console.log(newItem.cost);
    console.log(newItem);
    let cart = await Cart.findOne({ user: req.body.user });

    if (!cart) {
      cart = new Cart({
        user: req.body.user,
        items: newItem,
      });
      await cart.save();
      return res.status(201).json(cart);
    }
    let product = cart.items.find((e) => e.productId == req.body.productId);
    // console.log(product)
    if (!product) {
      cart.items.push(newItem);
      await cart.save();
      return res.status(200).json(cart);
    }
    cart.items.map((r) => {
      if (r.productId == req.body.productId) {
        r.qty += req.body.qty;
        r.cost += nproduct.price * req.body.qty;
        //+req.body.price * +req.body.qty;
      }
    });
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
};
exports.getUserCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.body.user });
    if (!cart) {
      return res.status(404).json("no cart yet");
    }
    let total = cart.items.reduce((acc, curr) => {
      return acc + curr.cost;
    }, 0);

    res.status(200).json({ total });
  } catch (error) {
    console.log(error);
  }
};

//module.exports = { getUserCart, addProductToCart };
// 648f3f67b9b1593d2bdbaa70
