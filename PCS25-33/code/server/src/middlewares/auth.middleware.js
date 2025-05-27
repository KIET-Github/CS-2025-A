import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {

            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})

export const verifyAdmin = asyncHandler(async (req, _, next) => {
    /*
        1. Ensure the user is authenticated (use verifyJWT middleware before this one)
        2. Check if the user's username and email match the admin credentials
    */


    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")

    if (!token) {
        throw new ApiError(401, "Unauthorized request")
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET
    )

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminEmail = process.env.ADMIN_EMAIL;


    if (user.username === adminUsername && user.email === adminEmail) {
        // User has admin rights
        next();  // Proceed to the next middleware or route handler
    } else {
        // User does not have admin rights
        throw new ApiError(403, "Access denied: Admins only");
    }
});
