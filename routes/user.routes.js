import express from 'express';
import {
    signup,
    login
} from '../controllers/userController.js';

const userRouter = express.Router()

// Sign up
userRouter.post("/", signup)

// Login
userRouter.post("/login", login)

export { userRouter };