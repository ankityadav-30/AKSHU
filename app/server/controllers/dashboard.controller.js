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
                    summary,
                    "Dashboard summary retrieved successfully."
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
                    statistics,
                    "Dashboard statistics retrieved successfully."
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
                    activity,
                    "Recent activity retrieved successfully."
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
                    dashboard,
                    "Dashboard data retrieved successfully."
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