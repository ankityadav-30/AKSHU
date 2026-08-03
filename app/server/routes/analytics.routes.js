import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    getAnalytics,
    getAnalyticsOverview,
    getBlogAnalytics,
    getContactAnalytics,
    getProjectAnalytics,
    getUserAnalytics,
    getNewsletterAnalytics,
} from "../controllers/analytics.controller.js";

import {
    analyticsQuerySchema,
} from "../validators/analytics.validator.js";

import { ROLES } from "../utils/constants.js";

const router = Router();

/* ====================================
   Protected Routes
==================================== */

/**
 * GET /api/v1/analytics
 *
 * Complete analytics
 */
router.get(
    "/",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(
        analyticsQuerySchema,
        "query"
    ),
    getAnalytics
);

/**
 * GET /api/v1/analytics/overview
 *
 * Analytics summary
 */
router.get(
    "/overview",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    getAnalyticsOverview
);

/**
 * GET /api/v1/analytics/blogs
 *
 * Blog analytics
 */
router.get(
    "/blogs",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR
    ),
    validate(
        analyticsQuerySchema,
        "query"
    ),
    getBlogAnalytics
);

/**
 * GET /api/v1/analytics/contacts
 *
 * Contact analytics
 */
router.get(
    "/contacts",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(
        analyticsQuerySchema,
        "query"
    ),
    getContactAnalytics
);

/**
 * GET /api/v1/analytics/projects
 *
 * Project analytics
 */
router.get(
    "/projects",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(
        analyticsQuerySchema,
        "query"
    ),
    getProjectAnalytics
);

/**
 * GET /api/v1/analytics/users
 *
 * User analytics
 */
router.get(
    "/users",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(
        analyticsQuerySchema,
        "query"
    ),
    getUserAnalytics
);

/**
 * GET /api/v1/analytics/newsletter
 *
 * Newsletter analytics
 */
router.get(
    "/newsletter",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(
        analyticsQuerySchema,
        "query"
    ),
    getNewsletterAnalytics
);

export default router;