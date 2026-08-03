import logger from "../utils/logger.js";

/**
 * Request Logger Middleware
 */
const requestLogger = (req, res, next) => {

    const start = Date.now();

    res.on("finish", () => {

        const duration = Date.now() - start;

        logger.info("HTTP Request", {

            method: req.method,

            url: req.originalUrl,

            statusCode: res.statusCode,

            responseTime: `${duration} ms`,

            ip: req.ip,

            userId: req.user?._id || null,

            userAgent: req.get("user-agent"),

        });

    });

    next();

};

export default requestLogger;