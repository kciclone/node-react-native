import express from 'express';
import { ApiError } from '../services/errorHandlingService';
import { userExists, createUser } from '../services/userService';
import { requireAuth } from '../services/authService';

const router = express.Router();

// Create a new user
router.get('/api/users', requireAuth, (req, res, next) => {
    res.status(200).json({msg: 'User is authenticated.'});
});

export default router;