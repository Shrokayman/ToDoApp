import express from 'express';
import { userAuth } from "../middlewares/auth.js";
import {
    addTodo,
    getTodo,
    updateTodo,
    deleteTodo,
} from '../controllers/todoController.js';

const todoRouter = express.Router()

// Add new to do for specific user.
todoRouter.post("/", userAuth, addTodo)

// Get to do information for specific user.
todoRouter.get("/", userAuth, getTodo)

// Update an existing to do for specific user.
todoRouter.put("/", userAuth, updateTodo)

// Delete an existing to do for specific user.
todoRouter.delete("/", userAuth, deleteTodo)

export { todoRouter };