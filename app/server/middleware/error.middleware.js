import { ZodError } from "zod";
import mongoose from "mongoose";

import ApiError from "../utils/ApiError.js";
import logger from "../utils/logger.js";

const errorMiddleware = (
    err,
    req,
    res,
    next
) => {

    logger.error({

        message: err.message,

        stack: err.stack,

        method: req.method,

        url: req.originalUrl,

        user: req.user?._id,

    });

    /**
     * Custom ApiError
     */
    if (err instanceof ApiError) {

        return res.status(err.statusCode).json({

            success: false,

            statusCode: err.statusCode,

            message: err.message,

            errors: err.errors || [],

            stack:

                process.env.NODE_ENV === "development"

                    ? err.stack

                    : undefined,

        });

    }

    /**
     * Zod Validation Error
     */
    if (err instanceof ZodError) {

        return res.status(422).json({

            success: false,

            statusCode: 422,

            message: "Validation failed.",

            errors: err.errors.map(error => ({

                path: error.path.join("."),

                message: error.message,

            })),

        });

    }

    /**
     * Duplicate Key Error
     */
    if (err.code === 11000) {

        const field =
            Object.keys(err.keyValue)[0];

        return res.status(409).json({

            success: false,

            statusCode: 409,

            message:
                `${field} already exists.`,

        });

    }

    /**
     * Mongoose Validation
     */
    if (
        err instanceof
        mongoose.Error.ValidationError
    ) {

        return res.status(400).json({

            success: false,

            statusCode: 400,

            message: err.message,

        });

    }

    /**
     * Invalid ObjectId
     */
    if (
        err instanceof
        mongoose.Error.CastError
    ) {

        return res.status(400).json({

            success: false,

            statusCode: 400,

            message: "Invalid resource id.",

        });

    }

    /**
     * JWT Errors
     */
    if (err.name === "JsonWebTokenError") {

        return res.status(401).json({

            success: false,

            statusCode: 401,

            message: "Invalid token.",

        });

    }

    if (err.name === "TokenExpiredError") {

        return res.status(401).json({

            success: false,

            statusCode: 401,

            message: "Token expired.",

        });

    }

    /**
     * Unknown Error
     */
    return res.status(500).json({

        success: false,

        statusCode: 500,

        message: "Internal Server Error.",

        stack:

            process.env.NODE_ENV ===
            "development"

                ? err.stack

                : undefined,

    });

};

export default errorMiddleware;