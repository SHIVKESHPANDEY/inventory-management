// controllers/orderController.js

import { Order } from '../models/Order.model.js';
import { Inventory } from '../models/Inventory.model.js';

// Function to add a new order
export const createOrder = async (req, res) => {
  try {
    const { user, products, orderStatus } = req.body;

    // Validate user and products
    if (!user || !products || products.length === 0) {
      return res.status(400).json({ message: 'User and products are required' });
    }

    // Check if all products are available in the inventory
    for (const item of products) {
      const product = await Inventory.findById(item.product);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: `Product ${item.product} is not available in sufficient quantity` });
      }
    }

    // Create the order
    const order = new Order({ user, products, orderStatus });
    await order.save();

    // Update product stock
    for (const item of products) {
      await Inventory.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }

    res.status(201).json({
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      message: 'Failed to create order',
      error: error.message,
    });
  }
};

// Function to get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products.product');
    res.status(200).json({
      message: 'Orders retrieved successfully',
      data: orders,
    });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({
      message: 'Failed to retrieve orders',
      error: error.message,
    });
  }
};

// Function to get an order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user').populate('products.product');
    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }
    res.status(200).json({
      message: 'Order retrieved successfully',
      data: order,
    });
  } catch (error) {
    console.error('Error retrieving order by ID:', error);
    res.status(500).json({
      message: 'Failed to retrieve order',
      error: error.message,
    });
  }
};

// Function to update an order by ID
export const updateOrderById = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    // Update the order status
    if (orderStatus) {
      order.orderStatus = orderStatus;
    }

    await order.save();

    res.status(200).json({
      message: 'Order updated successfully',
      data: order,
    });
  } catch (error) {
    console.error('Error updating order by ID:', error);
    res.status(500).json({
      message: 'Failed to update order',
      error: error.message,
    });
  }
};

// Function to delete an order by ID
export const deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    // Restore the stock if needed
    for (const item of order.products) {
      await Inventory.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } });
    }

    res.status(200).json({
      message: 'Order deleted successfully',
      data: order,
    });
  } catch (error) {
    console.error('Error deleting order by ID:', error);
    res.status(500).json({
      message: 'Failed to delete order',
      error: error.message,
    });
  }
};
