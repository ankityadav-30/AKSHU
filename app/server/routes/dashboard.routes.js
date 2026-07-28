import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    getDashboard,
    getDashboardSummary,
    getDashboardStatistics,
    getRecentActivity,
} from "../controllers/dashboard.controller.js";

import {
    dashboardQuerySchema,
} from "../validators/dashboard.validator.js";

import { ROLES } from "../utils/constants.js";

const router = Router();

/* ====================================
   Protected Routes
==================================== */

/**
 * GET /api/v1/dashboard
 *
 * Complete dashboard data
 */
router.get(
    "/",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(
        dashboardQuerySchema,
        "query"
    ),
    getDashboard
);

/**
 * GET /api/v1/dashboard/summary
 *
 * Dashboard summary counts
 */
router.get(
    "/summary",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    getDashboardSummary
);

/**
 * GET /api/v1/dashboard/statistics
 *
 * Dashboard statistics
 */
router.get(
    "/statistics",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    getDashboardStatistics
);

/**
 * GET /api/v1/dashboard/recent-activity
 *
 * Recent application activity
 */
router.get(
    "/recent-activity",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(
        dashboardQuerySchema,
        "query"
    ),
    getRecentActivity
);

export default router;