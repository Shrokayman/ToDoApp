import express from 'express';
import { userAuth } from "../middlewares/auth.js";
import {
    addTodo,
    getTodo,
    updateTodo,
    deleteTodo,
    getAllTodos
} from '../controllers/todoController.js';

const todoRouter = express.Router()

// Add new to do for specific user.
todoRouter.post("/", addTodo)

// Get to do information for specific user.
todoRouter.get("/", getTodo)

// Update an existing to do for specific user.
todoRouter.put("/", updateTodo)

// Delete an existing to do for specific user.
todoRouter.delete("/", deleteTodo)

// Get all to do for specific user.
todoRouter.get("/:userId", getAllTodos)

export { todoRouter };