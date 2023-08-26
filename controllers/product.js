const Product = require("../models/product");
exports.addProduct = async (req, res, next) => {
  try {
    // 1. Validation for image
    if (!req.file) {
      return res.status(400).json({ message: "no image provided" });
    }
    // 2. Add product
    const newProduct = new Product({
      category: req.body.category,
      subCategory: req.body.category,
      productName: req.body.productName,
      description: req.body.description,
      location: req.body.location,
      quantity: req.body.quantity,
      image: req.file.filename,
      price: req.body.price,
      //user: req.user._id,
      user: req.body.user,
    });

    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
exports.getAllProducts = async (req, res, next) => {
  try {
    const PRODCUT_PER_PAGE = 3;
    const { pageNumber, category, price } = req.query;
    let products;

    if (pageNumber) {
      products = await Product.find()
        .skip((pageNumber - 1) * PRODCUT_PER_PAGE)
        .limit(PRODCUT_PER_PAGE)
        .sort({ createdAt: -1 })
        .populate("user", ["-password"]);
    } else if (category) {
      products = await Product.find({ category })
        .sort({ createdAt: -1 })
        .populate("user", ["-password"]);
    } else if (price) {
      products = await Product.find({ category })
        .sort({ createdAt: -1 })
        .populate("user", ["-password"]);
    } else {
      products = await Product.find()
        .sort({ createdAt: -1 })
        .populate("user", ["-password"]);
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("user", [
      "-password",
    ]);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json("Product not found");
    }
  } catch (error) {
    next(error);
  }
};
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.status(200).json("product deleted");
    } else {
      res.status(404).json("Product not found");
    }
  } catch (error) {
    next(error);
  }
};
exports.updateProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    ///yyyyyyyyyyyyyyyyyytt
    // if (req.user.id !== product.user.toString()) {
    //   return res
    //     .status(403)
    //     .json({ message: "access denied, you are not allowed" });
    // }

    // 4. Update product
    const updatedproduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("user", ["-password"]);

    // 5. Send response to the client
    res.status(200).json(updatedproduct);
  } catch (error) {
    next(error);
  }
};
