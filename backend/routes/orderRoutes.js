// routes/orderRoutes.js

import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById
} from '../controllers/orderController.js'; // Ensure to include the .js extension

const router = express.Router();

// Route to create a new order
router.post('/', createOrder);

// Route to get all orders
router.get('/', getAllOrders);

// Route to get an order by ID
router.get('/:id', getOrderById);

// Route to update an order by ID
router.put('/:id', updateOrderById);

// Route to delete an order by ID
router.delete('/:id', deleteOrderById);

export default router;
