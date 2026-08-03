// APP/server/routes/lead.routes.js

import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import { ROLES } from "../utils/constants.js";
import {
  postCreateLead,
  getAdminLeads,
  patchAdminLeadStatus,
  removeAdminLead,
  exportLeadsCsv,
} from "../controllers/lead.controller.js";

const router = Router();

/* Public / Chatbot Route */
router.post("/", postCreateLead);

/* Protected Admin Routes */
router.use(authMiddleware, roleMiddleware(ROLES.SUPER_ADMIN, ROLES.ADMIN));
router.get("/", getAdminLeads);
router.get("/export", exportLeadsCsv);
router.patch("/:id", patchAdminLeadStatus);
router.delete("/:id", removeAdminLead);

export default router;
