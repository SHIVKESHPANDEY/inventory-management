// routes/productRoutes.js

import express from 'express';
import {
  addDummyProducts,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById
} from '../controllers/inventoryController.js'; // Ensure to include the .js extension

const router = express.Router();

// Route to add dummy products
router.post('/add-dummy-products', addDummyProducts);

// Route to get all products
router.get('/', getAllProducts);

// Route to get a product by ID
router.get('/:id', getProductById);

// Route to update a product by ID
router.put('/:id', updateProductById);

// Route to delete a product by ID
router.delete('/:id', deleteProductById);

export default router;
