import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    uploadSingle,
    uploadMultiple,
    deleteUpload,
    deleteMultipleUploads,
    replaceUpload,
} from "../controllers/upload.controller.js";

import {
    uploadSingleSchema,
    uploadMultipleSchema,
    deleteUploadSchema,
    deleteMultipleUploadsSchema,
    replaceUploadSchema,
} from "../validators/upload.validator.js";

import {
    uploadSingle as uploadSingleMiddleware,
    uploadMultiple as uploadMultipleMiddleware,
    requireFile,
    requireFiles,
} from "../middleware/upload.middleware.js";

import { ROLES } from "../utils/constants.js";

const router = Router();

/* ====================================
   Protected Routes
==================================== */

/**
 * POST /api/v1/uploads/single
 */
router.post(
    "/single",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR
    ),
    uploadSingleMiddleware,
    requireFile,
    validate(uploadSingleSchema),
    uploadSingle
);

/**
 * POST /api/v1/uploads/multiple
 */
router.post(
    "/multiple",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR
    ),
    uploadMultipleMiddleware,
    requireFiles,
    validate(uploadMultipleSchema),
    uploadMultiple
);

/**
 * PATCH /api/v1/uploads/replace
 */
router.patch(
    "/replace",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR
    ),
    uploadSingleMiddleware,
    requireFile,
    validate(replaceUploadSchema),
    replaceUpload
);

/**
 * DELETE /api/v1/uploads
 */
router.delete(
    "/",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(deleteUploadSchema),
    deleteUpload
);

/**
 * DELETE /api/v1/uploads/multiple
 */
router.delete(
    "/multiple",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(deleteMultipleUploadsSchema),
    deleteMultipleUploads
);

export default router;