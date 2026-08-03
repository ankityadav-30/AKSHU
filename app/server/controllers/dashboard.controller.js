import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import dashboardService from "../services/dashboard.service.js";

/**
 * Get Dashboard Summary
 *
 * Protected
 */
const getDashboardSummary = asyncHandler(
    async (req, res) => {
        const summary =
            await dashboardService.getSummary();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Dashboard summary retrieved successfully.",
                    summary
                )
            );
    }
);

/**
 * Get Dashboard Statistics
 *
 * Protected
 */
const getDashboardStatistics = asyncHandler(
    async (req, res) => {
        const statistics =
            await dashboardService.getStatistics();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Dashboard statistics retrieved successfully.",
                    statistics
                )
            );
    }
);

/**
 * Get Recent Activity
 *
 * Protected
 */
const getRecentActivity = asyncHandler(
    async (req, res) => {
        const limit =
            req.query.limit ?? 5;

        const activity =
            await dashboardService.getRecentActivity(
                limit
            );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Recent activity retrieved successfully.",
                    activity
                )
            );
    }
);

/**
 * Get Complete Dashboard
 *
 * Protected
 */
const getDashboard = asyncHandler(
    async (req, res) => {
        const limit =
            req.query.limit ?? 5;

        const dashboard =
            await dashboardService.getDashboard(
                limit
            );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Dashboard data retrieved successfully.",
                    dashboard
                )
            );
    }
);

export {
    getDashboard,
    getDashboardSummary,
    getDashboardStatistics,
    getRecentActivity,
};