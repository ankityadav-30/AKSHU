import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    createProject,
    getProjects,
    getProject,
    updateProject,
    publishProject,
    archiveProject,
    deleteProject,
} from "../controllers/project.controller.js";

import {
    createProjectSchema,
    updateProjectSchema,
    projectIdSchema,
    projectSlugSchema,
} from "../validators/project.validator.js";

import { ROLES } from "../utils/constants.js";

const router = Router();

/**
 * ==========================
 * Public Routes
 * ==========================
 */

/**
 * GET /api/v1/projects
 */
router.get(
    "/",
    getProjects
);

/**
 * GET /api/v1/projects/:slug
 */
router.get(
    "/:slug",
    validate(projectSlugSchema, "params"),
    getProject
);

/**
 * ==========================
 * Protected Routes
 * ==========================
 */

/**
 * POST /api/v1/projects
 */
router.post(
    "/",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(createProjectSchema),
    createProject
);

/**
 * PATCH /api/v1/projects/:id
 */
router.patch(
    "/:id",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(projectIdSchema, "params"),
    validate(updateProjectSchema),
    updateProject
);

/**
 * PATCH /api/v1/projects/:id/publish
 */
router.patch(
    "/:id/publish",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(projectIdSchema, "params"),
    publishProject
);

/**
 * PATCH /api/v1/projects/:id/archive
 */
router.patch(
    "/:id/archive",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(projectIdSchema, "params"),
    archiveProject
);

/**
 * DELETE /api/v1/projects/:id
 */
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN
    ),
    validate(projectIdSchema, "params"),
    deleteProject
);

export default router;