import dns from "node:dns";
import app from "./app.js";
import connectDB from "./config/database.js";
import env from "./config/env.js";
import logger from "./utils/logger.js";

/**
 * Use Google Public DNS
 * Helps in environments where the default DNS
 * server fails to resolve MongoDB Atlas SRV records.
 */
dns.setServers([
    "8.8.8.8",
    "8.8.4.4",
]);

const PORT = env.app.port || 5000;

let server;

/**
 * Start Application
 */
const startServer = async () => {
    try {

        logger.info("Starting AKSHU Technologies API...");

        // Connect Database
        await connectDB();

        logger.info("MongoDB connected successfully.");

        // Start Express Server
        server = app.listen(PORT, () => {

            logger.info(
                `🚀 Server running at http://localhost:${PORT}`
            );

            logger.info(
                `📚 Swagger Docs: http://localhost:${PORT}/api/docs`
            );

            logger.info(
                `🌍 Environment: ${env.app.env}`
            );

        });

    } catch (error) {

        logger.error("Failed to start server.", {
            message: error.message,
            stack: error.stack,
        });

        process.exit(1);

    }
};

startServer();

/**
 * Graceful Shutdown
 */
const gracefulShutdown = (signal) => {

    logger.info(`${signal} received. Shutting down...`);

    if (!server) {
        process.exit(0);
    }

    server.close(() => {

        logger.info("HTTP Server Closed.");

        process.exit(0);

    });

};

/**
 * Process Events
 */
process.on(
    "SIGINT",
    () => gracefulShutdown("SIGINT")
);

process.on(
    "SIGTERM",
    () => gracefulShutdown("SIGTERM")
);

process.on(
    "uncaughtException",
    (error) => {

        logger.error("Uncaught Exception.", {
            message: error.message,
            stack: error.stack,
        });

        process.exit(1);

    }
);

process.on(
    "unhandledRejection",
    (reason) => {

        logger.error("Unhandled Rejection.", {
            reason,
        });

        process.exit(1);

    }
);