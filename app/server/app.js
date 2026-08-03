import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import routes from "./routes/index.js";
import { swaggerUi, swaggerSpec } from "./docs/swagger.js";

import requestLogger from "./middleware/requestLogger.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";
import notFoundMiddleware from "./middleware/not-found.middleware.js";

const app = express();

/* ==========================================
   Security Middleware
========================================== */

app.use(helmet());

const allowedOrigins = (process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : [])
    .concat(["http://localhost:5173", "http://localhost:4173"])
    .map(url => url.trim());

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`CORS policy violation for origin: ${origin}`));
            }
        },
        credentials: true,
    })
);

/* ==========================================
   Compression
========================================== */

app.use(compression());

//   Body Parsers

app.use(
    express.json({
        limit: "10mb",
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "10mb",
    })
);

app.use(cookieParser());


//   Rate Limiter

const limiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 100,

    standardHeaders: true,

    legacyHeaders: false,

    message: {

        success: false,

        message:
            "Too many requests. Please try again later.",

    },

});

app.use(limiter);


//   Request Logger

app.use(requestLogger);

//   Swagger Docs

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//   API Routes

app.use("/api/v1", routes);


// 404 Handler

app.use(notFoundMiddleware);

//   Global Error Handler

app.use(errorMiddleware);

export default app;