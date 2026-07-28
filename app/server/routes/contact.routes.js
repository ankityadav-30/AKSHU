import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    createContact,
    getContact,
    getUnreadContacts,
    getRecentContacts,
    assignContact,
    markAsRead,
    markAsUnread,
    updateStatus,
    addNote,
    markSpam,
    archiveContact,
    searchContacts,
    dashboardStats,
    deleteContact,
} from "../controllers/contact.controller.js";

import {
    createContactSchema,
    contactIdSchema,
    assignContactSchema,
    updateStatusSchema,
    addNoteSchema,
    searchContactSchema,
    recentQuerySchema,
} from "../validators/contact.validator.js";

import { ROLES } from "../utils/constants.js";

const router = Router();

/* ===========================================
   Public Routes
=========================================== */

/**
 * POST /api/v1/contact
 */
router.post(
    "/",
    validate(createContactSchema),
    createContact
);

/* ===========================================
   Protected Routes
=========================================== */

/**
 * GET Dashboard Statistics
 */
router.get(
    "/dashboard",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    dashboardStats
);

/**
 * GET Unread Contacts
 */
router.get(
    "/unread",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    getUnreadContacts
);

/**
 * GET Recent Contacts
 */
router.get(
    "/recent",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(recentQuerySchema, "query"),
    getRecentContacts
);

/**
 * GET Search
 */
router.get(
    "/search",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(searchContactSchema, "query"),
    searchContacts
);

/**
 * GET Contact By Id
 */
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(contactIdSchema, "params"),
    getContact
);

/**
 * PATCH Assign
 */
router.patch(
    "/:id/assign",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(contactIdSchema, "params"),
    validate(assignContactSchema),
    assignContact
);

/**
 * PATCH Read
 */
router.patch(
    "/:id/read",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(contactIdSchema, "params"),
    markAsRead
);

/**
 * PATCH Unread
 */
router.patch(
    "/:id/unread",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(contactIdSchema, "params"),
    markAsUnread
);

/**
 * PATCH Status
 */
router.patch(
    "/:id/status",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(contactIdSchema, "params"),
    validate(updateStatusSchema),
    updateStatus
);

/**
 * PATCH Add Note
 */
router.patch(
    "/:id/note",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(contactIdSchema, "params"),
    validate(addNoteSchema),
    addNote
);

/**
 * PATCH Spam
 */
router.patch(
    "/:id/spam",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(contactIdSchema, "params"),
    markSpam
);

/**
 * PATCH Archive
 */
router.patch(
    "/:id/archive",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN
    ),
    validate(contactIdSchema, "params"),
    archiveContact
);

/**
 * DELETE Contact
 */
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN
    ),
    validate(contactIdSchema, "params"),
    deleteContact
);

export default router;