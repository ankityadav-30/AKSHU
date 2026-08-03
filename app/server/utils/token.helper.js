import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiError from "./ApiError.js";

class TokenHelper {
    /**
     * Generate Access Token
     * @param {Object} payload
     * @returns {string}
     */
    generateAccessToken(payload) {
        return jwt.sign(payload, env.jwt.secret, {
            expiresIn: env.jwt.expiresIn,
        });
    }

    /**
     * Generate Refresh Token
     * @param {Object} payload
     * @returns {string}
     */
    generateRefreshToken(payload) {
        return jwt.sign(payload, env.jwt.refreshSecret, {
            expiresIn: env.jwt.refreshExpiresIn,
        });
    }

    /**
     * Verify Access Token
     * @param {string} token
     * @returns {Object}
     */
    verifyAccessToken(token) {
        try {
            return jwt.verify(token, env.jwt.secret);
        } catch (error) {
            throw new ApiError(401, "Invalid or expired access token.");
        }
    }

    /**
     * Verify Refresh Token
     * @param {string} token
     * @returns {Object}
     */
    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, env.jwt.refreshSecret);
        } catch (error) {
            throw new ApiError(401, "Invalid or expired refresh token.");
        }
    }

    /**
     * Decode JWT without verification
     * @param {string} token
     * @returns {Object|null}
     */
    decodeToken(token) {
        return jwt.decode(token);
    }

    /**
     * Extract Bearer token from Authorization header
     * @param {string} authorization
     * @returns {string}
     */
    extractBearerToken(authorization) {
        if (!authorization) {
            throw new ApiError(
                401,
                "Authorization header is missing."
            );
        }

        if (!authorization.startsWith("Bearer ")) {
            throw new ApiError(
                401,
                "Invalid authorization header format."
            );
        }

        return authorization.split(" ")[1];
    }

    /**
     * Get token expiration date
     * @param {string} token
     * @returns {Date|null}
     */
    getExpirationDate(token) {
        const decoded = jwt.decode(token);

        if (!decoded || !decoded.exp) {
            return null;
        }

        return new Date(decoded.exp * 1000);
    }

    /**
     * Check whether token is expired
     * @param {string} token
     * @returns {boolean}
     */
    isTokenExpired(token) {
        const expiry = this.getExpirationDate(token);

        if (!expiry) {
            return true;
        }

        return expiry.getTime() <= Date.now();
    }
}

export default new TokenHelper();