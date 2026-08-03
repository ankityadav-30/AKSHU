// APP/server/routes/chat.routes.js

import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import { ROLES } from "../utils/constants.js";
import {
  postChatMessage,
  getChatHistory,
  getAdminSessions,
  removeAdminSession,
  getAdminAnalytics,
} from "../controllers/chat.controller.js";

const router = Router();

/* Public Routes */
router.post("/message", postChatMessage);
router.get("/history/:sessionId", getChatHistory);

/* Protected Admin Routes */
router.use(authMiddleware, roleMiddleware(ROLES.SUPER_ADMIN, ROLES.ADMIN));
router.get("/sessions", getAdminSessions);
router.get("/analytics", getAdminAnalytics);
router.delete("/sessions/:id", removeAdminSession);

export default router;
