import { Router } from "express";

import authRoutes from "./auth.routes.js";
import profileRoutes from "./profile.routes.js";
import projectRoutes from "./project.routes.js";
import uploadRoutes from "./upload.routes.js";
import teamRoutes from "./team.routes.js";
import blogRoutes from "./blog.routes.js";
import contactRoutes from "./contact.routes.js";
import newsletterRoutes from "./newsletter.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import analyticsRoutes from "./analytics.routes.js";

const router = Router();

/* ==============================
   Health Check
============================== */

router.get("/health", (req, res) => {

    return res.status(200).json({

        success: true,

        message: "AKSHU Technologies API is running."

    });

});

/* ==============================
   Authentication
============================== */

router.use("/auth", authRoutes);

/* ==============================
   Profile
============================== */

router.use("/profile", profileRoutes);

/* ==============================
   Projects
============================== */

router.use("/projects", projectRoutes);

/* ==============================
   Upload
============================== */

router.use("/upload", uploadRoutes);

/* ==============================
   Team
============================== */

router.use("/team", teamRoutes);

/* ==============================
   Blogs
============================== */

router.use("/blogs", blogRoutes);

/* ==============================
   Contact
============================== */

router.use("/contact", contactRoutes);

/* ==============================
   Newsletter
============================== */

router.use("/newsletter", newsletterRoutes);

/* ==============================
   Dashboard
============================== */

router.use("/dashboard", dashboardRoutes);

/* ==============================
   Analytics
============================== */

router.use("/analytics", analyticsRoutes);

export default router;