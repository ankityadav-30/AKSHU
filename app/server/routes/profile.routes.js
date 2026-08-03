import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    getProfile,
    updateProfile,
    changePassword,
} from "../controllers/profile.controller.js";

import {
    updateProfileSchema,
    changePasswordSchema,
} from "../validators/profile.validator.js";

const router = Router();

/**
 * GET /api/v1/profile
 */
router.get(
    "/",
    authMiddleware,
    getProfile
);

/**
 * PATCH /api/v1/profile
 */
router.patch(
    "/",
    authMiddleware,
    validate(updateProfileSchema),
    updateProfile
);

/**
 * PATCH /api/v1/profile/password
 */
router.patch(
    "/password",
    authMiddleware,
    validate(changePasswordSchema),
    changePassword
);

export default router;