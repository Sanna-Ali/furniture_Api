const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
// // const colors = require('colors')
// // const morgan = require('morgan')
// const { notFound, errorHandler } = require("./Middlewares/errorMiddleware");
const connectDB = require("./config/db.js");

//const productRoutes = require("./routes/shop.js");
//const userRoutes = require("./routes/user.route");
//\const orderRoutes = require("./routes/order.route");
const authRoute = require("./routes/auth.js");
const productRoute = require("./routes/product.js");
const cartRoute = require("./routes/cart.route.js");
// // const uploadRoutes = require('./routes/uploadRoutes.js')

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "images")));
//app.use("/api/products", productRoutes);
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
//app.use("/api/orders", orderRoutes);
// app.use('/api/upload', uploadRoutes)

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running....");
//   });
// }

// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//############################

// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const connectToDb = require("./config/db");
// const { Cart } = require("./models/cart");
// const { Order } = require("./models/order");
// const app = express();
// const dotenv = require("dotenv");
// dotenv.config();
// app.use(bodyParser.json());
// // Connect to MongoDB
// connectToDb();
// // mongoose.connect("mongodb://localhost::1:27017/myapp", {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });
// // const db = mongoose.connection;
// // db.on("error", console.error.bind(console, "MongoDB connection error:"));

// // Create a new cart
// app.post("/carts", async (req, res) => {
//   try {
//     const { items } = req.body;
//     const cart = new Cart({ items });
//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ error: "Could not create cart" });
//   }
// });

// // Get a cart by ID
// app.get("/carts/:cartId", async (req, res) => {
//   try {
//     const { cartId } = req.params;
//     const cart = await Cart.findById(cartId);
//     res.json(cart);
//   } catch (err) {
//     res.status(404).json({ error: "Cart not found" });
//   }
// });

// // Create a new order
// app.post("/orders", async (req, res) => {
//   try {
//     const { items, total } = req.body;
//     const order = new Order({ items, total });
//     await order.save();
//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ error: "Could not create order" });
//   }
// });

// // Get an order by ID
// app.get("/orders/:orderId", async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const order = await Order.findById(orderId);
//     res.json(order);
//   } catch (err) {
//     res.status(404).json({ error: "Order not found" });
//   }
// });

// // Start the server
// app.listen(3000, () => {
//   console.log("Server started on port 3000");
// });

