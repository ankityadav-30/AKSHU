import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import analyticsService from "../services/analytics.service.js";

/**
 * Get Analytics Overview
 *
 * Protected
 */
const getAnalyticsOverview = asyncHandler(
    async (req, res) => {
        const analytics =
            await analyticsService.getOverview();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    analytics,
                    "Analytics overview retrieved successfully."
                )
            );
    }
);

/**
 * Get Complete Analytics
 *
 * Protected
 */
const getAnalytics = asyncHandler(
    async (req, res) => {
        const months =
            req.query.months ?? 12;

        const analytics =
            await analyticsService.getAnalytics(
                months
            );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    analytics,
                    "Analytics retrieved successfully."
                )
            );
    }
);

/**
 * Get Blog Analytics
 *
 * Protected
 */
const getBlogAnalytics = asyncHandler(
    async (req, res) => {
        const months =
            req.query.months ?? 12;

        const analytics =
            await analyticsService.getBlogAnalytics(
                months
            );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    analytics,
                    "Blog analytics retrieved successfully."
                )
            );
    }
);

/**
 * Get Contact Analytics
 *
 * Protected
 */
const getContactAnalytics = asyncHandler(
    async (req, res) => {
        const months =
            req.query.months ?? 12;

        const analytics =
            await analyticsService.getContactAnalytics(
                months
            );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    analytics,
                    "Contact analytics retrieved successfully."
                )
            );
    }
);

/**
 * Get Project Analytics
 *
 * Protected
 */
const getProjectAnalytics = asyncHandler(
    async (req, res) => {
        const months =
            req.query.months ?? 12;

        const analytics =
            await analyticsService.getProjectAnalytics(
                months
            );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    analytics,
                    "Project analytics retrieved successfully."
                )
            );
    }
);

/**
 * Get User Analytics
 *
 * Protected
 */
const getUserAnalytics = asyncHandler(
    async (req, res) => {
        const months =
            req.query.months ?? 12;

        const analytics =
            await analyticsService.getUserAnalytics(
                months
            );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    analytics,
                    "User analytics retrieved successfully."
                )
            );
    }
);

/**
 * Get Newsletter Analytics
 *
 * Protected
 */
const getNewsletterAnalytics = asyncHandler(
    async (req, res) => {
        const months =
            req.query.months ?? 12;

        const analytics =
            await analyticsService.getNewsletterAnalytics(
                months
            );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    analytics,
                    "Newsletter analytics retrieved successfully."
                )
            );
    }
);

export {
    getAnalytics,
    getAnalyticsOverview,
    getBlogAnalytics,
    getContactAnalytics,
    getProjectAnalytics,
    getUserAnalytics,
    getNewsletterAnalytics,
};