import jwt from "jsonwebtoken";
import env from "../config/env.js";

/**
 * Generate Access Token
 */
export const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        env.JWT_SECRET,
        {
            expiresIn: "15m",
        }
    );
};

/**
 * Generate Refresh Token
 */
export const generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

/**
 * Verify Access Token
 */
export const verifyAccessToken = (token) => {
    return jwt.verify(
        token,
        env.JWT_SECRET
    );
};

/**
 * Verify Refresh Token
 */
export const verifyRefreshToken = (token) => {
    return jwt.verify(
        token,
        env.JWT_SECRET
    );
};