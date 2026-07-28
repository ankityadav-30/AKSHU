import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    subscribe,
    unsubscribe,
    unsubscribeById,
    resubscribe,
    getSubscriberById,
    getSubscribers,
    getSubscribed,
    getUnsubscribed,
    getStatistics,
    deleteSubscriber,
} from "../controllers/newsletter.controller.js";

import {
    subscribeSchema,
    unsubscribeSchema,
    subscriberIdSchema,
    getSubscribersSchema,
} from "../validators/newsletter.validator.js";

import { ROLES } from "../utils/constants.js";

const router = Router();

/* ====================================
   Public Routes
==================================== */

router.post(
    "/subscribe",
    validate(subscribeSchema),
    subscribe
);

router.get(
    "/unsubscribe/:token",
    validate(unsubscribeSchema, "params"),
    unsubscribe
);

/* ====================================
   Protected Routes
==================================== */

router.get(
    "/statistics",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    getStatistics
);

router.get(
    "/subscribed",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    getSubscribed
);

router.get(
    "/unsubscribed",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    getUnsubscribed
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(getSubscribersSchema, "query"),
    getSubscribers
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(subscriberIdSchema, "params"),
    getSubscriberById
);

router.patch(
    "/:id/unsubscribe",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(subscriberIdSchema, "params"),
    unsubscribeById
);

router.patch(
    "/:id/resubscribe",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    validate(subscriberIdSchema, "params"),
    resubscribe
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(
        ROLES.SUPER_ADMIN
    ),
    validate(subscriberIdSchema, "params"),
    deleteSubscriber
);

export default router;