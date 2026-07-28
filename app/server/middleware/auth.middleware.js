import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/jwt.js";
import userRepository from "../repositories/user.repository.js";

const authMiddleware = asyncHandler(async (req, res, next) => {

    let token = null;

    /**
     * Authorization Header
     * Bearer <token>
     */
    const authorization = req.headers.authorization;

    if (
        authorization &&
        authorization.startsWith("Bearer ")
    ) {
        token = authorization.split(" ")[1];
    }

    /**
     * HTTP Only Cookie (Future Support)
     */
    if (!token && req.cookies?.accessToken) {
        token = req.cookies.accessToken;
    }

    if (!token) {
        throw new ApiError(
            401,
            "Authentication required."
        );
    }

    const payload = verifyAccessToken(token);

    const user = await userRepository.findById(payload.id);

    if (!user) {
        throw new ApiError(
            401,
            "User no longer exists."
        );
    }

    if (!user.isActive) {
        throw new ApiError(
            403,
            "Your account has been disabled."
        );
    }

    req.user = user;

    next();

});

export default authMiddleware;