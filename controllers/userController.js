import { asyncHandler } from "../middlewares/async.js"; // This "asyncHandler" is used for handling try and catch
import { messageResponse, dataResponse } from "../utils/successResponses.js";
import { ErrorResponse } from "../utils/errorResponse.js";
import { User } from "../models/User.js"
import jwt from 'jsonwebtoken'


// Sign up
export const signup = asyncHandler(async (req, res, next) => {
    const {
        name,
        email,
        password,
    } = req.body
    if (!name || !email || !password) {
        return next(new ErrorResponse("Please provide all the information", 400))
    }
    const user = new User(req.body)
    await user.save()
    user.token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE,
        }
    )
    const data = {
        name: user.name,
        email: user.email,
        token: user.token,
    }
    dataResponse(res, 200, data)
})

// Login
export const login = asyncHandler(async (req, res, next) => {
    const {
        email,
        password,
    } = req.body
    if (!email || !password) {
        return next(new ErrorResponse("Please provide all the information", 400))
    }
    const user = await User.CheckUserCredentials(
        email,
        password,
        next
    )
    dataResponse(res, 200, user)
})