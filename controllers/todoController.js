import { asyncHandler } from "../middlewares/async.js"; // This "asyncHandler" is used for handling try and catch
import { messageResponse, dataResponse } from "../utils/successResponses.js";
import { ErrorResponse } from "../utils/errorResponse.js";
import { Todo } from "../models/Todo.js";


// Add new to do for specific user.
export const addTodo = asyncHandler(async (req, res, next) => {
    const { userId } = req.body
    if(!userId){
        return next(new ErrorResponse("Please specify specific user", 400))
    }
    const todo = new Todo(req.body)
    await todo.save()
    messageResponse(res, 200, "Todo added successfully")
})

// Get to do information for specific user.
export const getTodo = asyncHandler(async (req, res, next) => {
    const { todoId } = req.query
    const todo = await Todo.findById(todoId)
    dataResponse(res, 200, todo)
})

// Update an existing to do for specific user.
export const updateTodo = asyncHandler(async (req, res, next) => {
    const { todoId } = req.query
    const todo = await Todo.findByIdAndUpdate(todoId, req.body)
    if (!todo) {
        return next(new ErrorResponse("This todo is not found", 404))
    }
    messageResponse(res, 200, "Todo updated successfully")
})

// Delete an existing to do for specific user.
export const deleteTodo = asyncHandler(async (req, res, next) => {
    const { todoId } = req.query
    const todo = await Todo.findByIdAndDelete(todoId)
    if (!todo) {
        return next(new ErrorResponse("This todo is not found", 404))
    }
    messageResponse(res, 200, "Todo deleted successfully")
})