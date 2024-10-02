import { Request, Response } from 'express';

import User from '../models/userModel';
import { handleSuccess, handleError } from '../utils/responseHandler';

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return handleSuccess(res, 'Users fetched successfully', users);
  } catch (err) {
    return handleError(res, 'Failed to fetch users', err, 400);
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    return handleSuccess(res, 'User created successfully', newUser, 201);
  } catch (err) {
    return handleError(res, 'Failed to create user', err, 400);
  }
};

// Log in a user
export const loginUser = async (req: Request, res: Response) => {
  try {
    // Assuming you're checking credentials before saving or returning
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.comparePassword(password)) {
      return handleError(res, 'Invalid email or password', {}, 401);
    }

    return handleSuccess(res, 'User logged in successfully', user);
  } catch (err) {
    return handleError(res, 'Failed to log in', err, 400);
  }
};

// Log out a user (this usually involves clearing session or tokens)
export const logoutUser = async (req: Request, res: Response) => {
  try {
    // Perform logout actions (e.g., destroy session, invalidate JWT)
    return handleSuccess(res, 'User logged out successfully');
  } catch (err) {
    return handleError(res, 'Failed to log out', err, 400);
  }
};
