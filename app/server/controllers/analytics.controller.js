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
                    "Analytics overview retrieved successfully.",
                    analytics
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
                    "Analytics retrieved successfully.",
                    analytics
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
                    "Blog analytics retrieved successfully.",
                    analytics
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
                    "Contact analytics retrieved successfully.",
                    analytics
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
                    "Project analytics retrieved successfully.",
                    analytics
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
                    "User analytics retrieved successfully.",
                    analytics
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
                    "Newsletter analytics retrieved successfully.",
                    analytics
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