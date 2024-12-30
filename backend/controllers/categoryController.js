// controllers/categoryController.js

import { Category } from "../models/Category.model.js"; // Ensure to include the .js extension
import mongoose from "mongoose"; // Import mongoose to create ObjectIds

// Function to add dummy categories
export const addDummyCategories = async (req, res) => {
  try {
    // Step 1: Create parent categories
    const parentCategories = [
      {
        name: "Electronics",
        description: "Devices, gadgets, and electronic accessories",
        parentCategoryId: null,
      },
      {
        name: "Home Appliances",
        description: "Kitchen and home appliances",
        parentCategoryId: null,
      },
      {
        name: "Furniture",
        description: "Home and office furniture",
        parentCategoryId: null,
      },
    ];

    const createdParents = await Category.insertMany(parentCategories);

    // Extract ObjectIds for use in child categories
    const electronicsId = createdParents.find(
      (cat) => cat.name === "Electronics"
    )._id;

    // Step 2: Create child categories
    const childCategories = [
      {
        name: "Computers",
        description: "Desktops, laptops, and peripherals",
        parentCategoryId: electronicsId,
      },
      {
        name: "Mobile Phones",
        description: "Smartphones and accessories",
        parentCategoryId: electronicsId,
      },
    ];

    await Category.insertMany(childCategories);

    res.status(201).json({
      message: "Dummy categories added successfully",
      data: { parentCategories: createdParents, childCategories },
    });
  } catch (error) {
    console.error("Error adding dummy categories:", error);
    res.status(500).json({
      message: "Failed to add dummy categories",
      error: error.message,
    });
  }
};

// Function to get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("parentCategoryId"); // Populate to get parent category details if needed
    res.status(200).json({
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    console.error("Error retrieving categories:", error);
    res.status(500).json({
      message: "Failed to retrieve categories",
      error: error.message,
    });
  }
};
