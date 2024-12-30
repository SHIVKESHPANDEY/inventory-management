// controllers/userController.js

import { User } from '../models/User.model.js'; // Ensure to include the .js extension

// Function to add dummy users
export const addDummyUsers = async (req, res) => {
  try {
    const dummyUsers = [
      {
        username: 'john_doe',
        email: 'john@example.com',
        name: 'John Doe',
        totalOrdersByUser: 60,
        totalReturnedByUser: 5,
        address: '123 Elm Street',
        phoneNumber: '123-456-7890',
        userCategory: 'gold',
      },
      {
        username: 'jane_doe',
        email: 'jane@example.com',
        name: 'Jane Doe',
        totalOrdersByUser: 10,
        totalReturnedByUser: 1,
        address: '456 Oak Avenue',
        phoneNumber: '098-765-4321',
        userCategory: 'regular',
      },
      {
        username: 'bob_smith',
        email: 'bob@example.com',
        name: 'Bob Smith',
        totalOrdersByUser: 30,
        totalReturnedByUser: 15,
        address: '789 Pine Road',
        phoneNumber: '555-123-4567',
        userCategory: 'iron',
      },
      {
        username: 'alice_johnson',
        email: 'alice@example.com',
        name: 'Alice Johnson',
        totalOrdersByUser: 40,
        totalReturnedByUser: 2,
        address: '101 Maple Street',
        phoneNumber: '555-987-6543',
        userCategory: 'regular',
      },
      {
        username: 'charlie_brown',
        email: 'charlie@example.com',
        name: 'Charlie Brown',
        totalOrdersByUser: 5,
        totalReturnedByUser: 0,
        address: '202 Cedar Lane',
        phoneNumber: '555-321-7654',
        userCategory: 'regular',
      },
    ];

    await User.insertMany(dummyUsers);

    res.status(201).json({
      message: 'Dummy users added successfully',
      data: dummyUsers,
    });
  } catch (error) {
    console.error('Error adding dummy users:', error);
    res.status(500).json({
      message: 'Failed to add dummy users',
      error: error.message,
    });
  }
};

// Function to get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: 'Users retrieved successfully',
      data: users,
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({
      message: 'Failed to retrieve users',
      error: error.message,
    });
  }
};

// Function to get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    res.status(200).json({
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (error) {
    console.error('Error retrieving user by ID:', error);
    res.status(500).json({
      message: 'Failed to retrieve user',
      error: error.message,
    });
  }
};

// Function to update a user by ID
export const updateUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // Update the user with new data
    Object.assign(user, req.body);

    // Call the updateUserCategory method to update the userCategory
    user.updateUserCategory();

    await user.save();

    res.status(200).json({
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    console.error('Error updating user by ID:', error);
    res.status(500).json({
      message: 'Failed to update user',
      error: error.message,
    });
  }
};

// Function to delete a user by ID
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    res.status(200).json({
      message: 'User deleted successfully',
      data: user,
    });
  } catch (error) {
    console.error('Error deleting user by ID:', error);
    res.status(500).json({
      message: 'Failed to delete user',
      error: error.message,
    });
  }
};
