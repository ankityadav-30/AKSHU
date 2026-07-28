import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    publishBlog,
    archiveBlog,
    deleteBlog,
    getFeaturedBlogs,
    getLatestBlogs,
    searchBlogs,
} from "../controllers/blog.controller.js";

import {
    createBlogSchema,
    updateBlogSchema,
    blogIdSchema,
    blogSlugSchema,
    searchBlogSchema,
    limitQuerySchema,
} from "../validators/blog.validator.js";

import { ROLES } from "../utils/constants.js";

const router = Router();

/* ====================================
   Public Routes
==================================== */

/**
 * GET /api/v1/blogs
 */
router.get(
    "/",
    getBlogs
);

/**
 * GET /api/v1/blogs/featured
 */
router.get(
    "/featured",
    validate(limitQuerySchema, "query"),
    getFeaturedBlogs
);

/**
 * GET /api/v1/blogs/latest
 */
router.get(
    "/latest",
    validate(limitQuerySchema, "query"),
    getLatestBlogs
);

/**
 * GET /api/v1/blogs/search
 */
router.get(
    "/search",
    validate(searchBlogSchema, "query"),
    searchBlogs
);

/**
 * GET /api/v1/blogs/:slug
 */
router.get(
    "/:slug",
    validate(blogSlugSchema, "params"),
    getBlog
);

/* ====================================
   Protected Routes
==================================== */

/**
 * POST /api/v1/blogs
 */
router.post(
    "/",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR
    ),
    validate(createBlogSchema),
    createBlog
);

/**
 * PATCH /api/v1/blogs/:id
 */
router.patch(
    "/:id",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR
    ),
    validate(blogIdSchema, "params"),
    validate(updateBlogSchema),
    updateBlog
);

/**
 * PATCH /api/v1/blogs/:id/publish
 */
router.patch(
    "/:id/publish",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR
    ),
    validate(blogIdSchema, "params"),
    publishBlog
);

/**
 * PATCH /api/v1/blogs/:id/archive
 */
router.patch(
    "/:id/archive",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(blogIdSchema, "params"),
    archiveBlog
);

/**
 * DELETE /api/v1/blogs/:id
 */
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN
    ),
    validate(blogIdSchema, "params"),
    deleteBlog
);

export default router;