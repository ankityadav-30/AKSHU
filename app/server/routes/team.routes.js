import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    createMember,
    getMembers,
    getMember,
    updateMember,
    activateMember,
    deactivateMember,
    deleteMember,
    searchMembers,
} from "../controllers/team.controller.js";

import {
    createMemberSchema,
    updateMemberSchema,
    memberIdSchema,
    searchMemberSchema,
} from "../validators/team.validator.js";

import { ROLES } from "../utils/constants.js";

const router = Router();

/**
 * ==========================
 * Public Routes
 * ==========================
 */

/**
 * GET /api/v1/team
 */
router.get(
    "/",
    getMembers
);

/**
 * GET /api/v1/team/search
 */
router.get(
    "/search",
    validate(searchMemberSchema, "query"),
    searchMembers
);

/**
 * GET /api/v1/team/:id
 */
router.get(
    "/:id",
    validate(memberIdSchema, "params"),
    getMember
);

/**
 * ==========================
 * Protected Routes
 * ==========================
 */

/**
 * POST /api/v1/team
 */
router.post(
    "/",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(createMemberSchema),
    createMember
);

/**
 * PATCH /api/v1/team/:id
 */
router.patch(
    "/:id",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(memberIdSchema, "params"),
    validate(updateMemberSchema),
    updateMember
);

/**
 * PATCH /api/v1/team/:id/activate
 */
router.patch(
    "/:id/activate",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(memberIdSchema, "params"),
    activateMember
);

/**
 * PATCH /api/v1/team/:id/deactivate
 */
router.patch(
    "/:id/deactivate",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(memberIdSchema, "params"),
    deactivateMember
);

/**
 * DELETE /api/v1/team/:id
 */
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN
    ),
    validate(memberIdSchema, "params"),
    deleteMember
);

export default router;