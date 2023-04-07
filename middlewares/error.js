import { ErrorResponse } from "../utils/errorResponse.js";
import {LoggerService} from '../utils/loggerService.js'
export const errorHandler = (err, req, res, next) => {
  
  let error = { ...err };
  error.message = err.message;
  const logger = new LoggerService('Errors')
  logger.error(error.message,error)


  // Log to console for dev
  console.log("the error is: ", err);
  console.log(err.name)

  // Token expired or invalid
  if(err.name === "TokenExpiredError") {
    const message = "Please, make sure you are logged in recently.";
    error = new ErrorResponse(message, 400);
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)[0]} Duplicate field value entered - ${Object.values(err.keyValue)[0]}`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }


  res.status(error.statusCode || 500).json({
    isSuccess: false,
    error: error.message || "Server Error",
  });
};
