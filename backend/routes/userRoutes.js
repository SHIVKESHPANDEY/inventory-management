// routes/userRoutes.js

import express from 'express';
import { addDummyUsers, getAllUsers, getUserById, updateUserById, deleteUserById } from '../controllers/userController.js'; // Ensure to include the .js extension

const router = express.Router();


router.get('/add-dummy-users', addDummyUsers);

// Route to get all users
router.get('/', getAllUsers);

// Route to get a user by ID
router.get('/:id', getUserById);

// Route to update a user by ID
router.put('/:id', updateUserById);

// Route to delete a user by ID
router.delete('/:id', deleteUserById);

export default router;
