import "dotenv/config.js";
import express from "express";
import cors from "cors";
import { connectDB } from "./databases/index.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { Order } from "./models/Order.model.js"; // Import Order model
import { Inventory } from "./models/Inventory.model.js"; // Import Inventory model
import { User } from "./models/User.model.js"; // Import User model

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/inventory", inventoryRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// Dummy route to add dummy orders
app.get("/api/seed/orders", async (req, res) => {
  try {
    // Fetch users and products
    const users = await User.find();
    const products = await Inventory.find();

    if (users.length === 0 || products.length === 0) {
      return res
        .status(400)
        .json({ message: "No users or products found to create orders." });
    }

    // Create dummy orders
    const orders = [
      {
        user: users[0]._id,
        products: [
          { product: products[0]._id, quantity: 1, price: products[0].price },
          { product: products[1]._id, quantity: 2, price: products[1].price },
        ],
        orderStatus: "pending",
      },
      {
        user: users[1]._id,
        products: [
          { product: products[2]._id, quantity: 1, price: products[2].price },
          { product: products[3]._id, quantity: 1, price: products[3].price },
        ],
        orderStatus: "accepted",
      },
      {
        user: users[2]._id,
        products: [
          { product: products[4]._id, quantity: 3, price: products[4].price },
          { product: products[5]._id, quantity: 1, price: products[5].price },
        ],
        orderStatus: "delivered",
      },
      {
        user: users[3]._id,
        products: [
          { product: products[6]._id, quantity: 2, price: products[6].price },
          { product: products[7]._id, quantity: 1, price: products[7].price },
        ],
        orderStatus: "returned",
      },
    ];

    // Insert dummy orders into the database
    await Order.insertMany(orders);

    res.status(201).json({
      message: "Dummy orders added successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Error seeding orders:", error);
    res.status(500).json({
      message: "Failed to add dummy orders",
      error: error.message,
    });
  }
});

connectDB().then(() => {
  app.on("error", (err) => {
    console.log(`Server starting failed:`, err);
    process.exit(1);
  });

  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});
