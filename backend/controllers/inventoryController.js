// controllers/productController.js

import { Inventory } from "../models/Inventory.model.js";

// Function to add dummy products
export const addDummyProducts = async (req, res) => {
  try {
    const dummyProducts = [
      {
        productName: "Smart TV",
        stock: 20,
        category: "66b35802de72896ff59d8790", // Replace with valid category ID
        stockStatus: "high",
        price: 499,
      },
      {
        productName: "Bluetooth Speaker",
        stock: 50,
        category: "66b35802de72896ff59d8790", // Replace with valid category ID
        stockStatus: "high",
        price: 79,
      },
      {
        productName: "Gaming Laptop",
        stock: 15,
        category: "66b35802de72896ff59d8794", // Replace with valid category ID
        stockStatus: "high",
        price: 1499,
      },
      {
        productName: "Wireless Mouse",
        stock: 100,
        category: "66b35802de72896ff59d8794", // Replace with valid category ID
        stockStatus: "high",
        price: 29,
      },
      {
        productName: "Smartphone Case",
        stock: 200,
        category: "66b35802de72896ff59d8795", // Replace with valid category ID
        stockStatus: "high",
        price: 19,
      },
      {
        productName: "Portable Charger",
        stock: 75,
        category: "66b35802de72896ff59d8795", // Replace with valid category ID
        stockStatus: "high",
        price: 39,
      },
      {
        productName: "Blender",
        stock: 30,
        category: "66b35802de72896ff59d8791", // Replace with valid category ID
        stockStatus: "high",
        price: 89,
      },
      {
        productName: "Microwave Oven",
        stock: 25,
        category: "66b35802de72896ff59d8791", // Replace with valid category ID
        stockStatus: "high",
        price: 299,
      },
      {
        productName: "Office Chair",
        stock: 10,
        category: "66b35802de72896ff59d8792", // Replace with valid category ID
        stockStatus: "high",
        price: 149,
      },
      {
        productName: "Dining Table",
        stock: 8,
        category: "66b35802de72896ff59d8792", // Replace with valid category ID
        stockStatus: "high",
        price: 499,
      },
    ];

    await Inventory.insertMany(dummyProducts);

    res.status(201).json({
      message: "Dummy products added successfully",
      data: dummyProducts,
    });
  } catch (error) {
    console.error("Error adding dummy products:", error);
    res.status(500).json({
      message: "Failed to add dummy products",
      error: error.message,
    });
  }
};

// Function to get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Inventory.find().populate("category");
    res.status(200).json({
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({
      message: "Failed to retrieve products",
      error: error.message,
    });
  }
};

// Function to get a product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Inventory.findById(req.params.id).populate(
      "category"
    );
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error retrieving product by ID:", error);
    res.status(500).json({
      message: "Failed to retrieve product",
      error: error.message,
    });
  }
};

// Function to update a product by ID
export const updateProductById = async (req, res) => {
  try {
    const product = await Inventory.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Update the product with new data
    Object.assign(product, req.body);

    // Save the updated product
    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error updating product by ID:", error);
    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// Function to delete a product by ID
export const deleteProductById = async (req, res) => {
  try {
    const product = await Inventory.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error deleting product by ID:", error);
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};
