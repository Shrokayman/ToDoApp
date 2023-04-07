import jwt from "jsonwebtoken";
import { asyncHandler } from "../async.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import { User } from "../../models/User.js";

// Protect routes for users
export const userAuth = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    // Make sure token exists
    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    if (!req.user) {
        return next(new ErrorResponse("The user is not exist here, maybe deleted!", 401));
    }

    next();
})

