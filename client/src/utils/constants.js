// APP/client/src/utils/constants.js

export const API_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

export const TOKEN_KEY = "akshu_token";
export const USER_KEY = "akshu_user";

export const ROLES = {
    SUPER_ADMIN: "SUPER_ADMIN",
    ADMIN: "ADMIN",
    EDITOR: "EDITOR",
    HR: "HR",
    TEAM_MEMBER: "TEAM_MEMBER",
};

export const ROUTES = {
    HOME: "/",
    ABOUT: "/about",
    SERVICES: "/services",
    PROJECTS: "/projects",
    PROJECT_DETAIL: (slug = ":slug") => `/projects/${slug}`,
    BLOG: "/blog",
    BLOG_DETAIL: (slug = ":slug") => `/blog/${slug}`,
    TEAM: "/team",
    CONTACT: "/contact",
    LOGIN: "/login",

    // Admin routes
    ADMIN_DASHBOARD: "/admin",
    ADMIN_BLOGS: "/admin/blogs",
    ADMIN_BLOG_NEW: "/admin/blogs/new",
    ADMIN_BLOG_EDIT: (id = ":id") => `/admin/blogs/${id}/edit`,
    ADMIN_PROJECTS: "/admin/projects",
    ADMIN_PROJECT_NEW: "/admin/projects/new",
    ADMIN_PROJECT_EDIT: (id = ":id") => `/admin/projects/${id}/edit`,
    ADMIN_TEAM: "/admin/team",
    ADMIN_TEAM_NEW: "/admin/team/new",
    ADMIN_TEAM_EDIT: (id = ":id") => `/admin/team/${id}/edit`,
    ADMIN_CONTACTS: "/admin/contacts",
    ADMIN_NEWSLETTER: "/admin/newsletter",
    ADMIN_UPLOADS: "/admin/uploads",
    ADMIN_ANALYTICS: "/admin/analytics",
    ADMIN_PROFILE: "/admin/profile",
    ADMIN_CHAT: "/admin/chat",
    ADMIN_LEADS: "/admin/leads",
};

/** Blog categories (mirroring backend enum) */
export const BLOG_CATEGORIES = [
    "Technology",
    "Programming",
    "AI",
    "Tutorial",
    "Company",
    "Career",
    "News",
    "Other",
];

/** Project categories (mirroring backend enum) */
export const PROJECT_CATEGORIES = [
    "WEB",
    "MOBILE",
    "AI",
    "DESKTOP",
    "OTHER",
];

/** Status values */
export const STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"];

/** Contact inquiry types */
export const INQUIRY_TYPES = [
    "GENERAL",
    "PROJECT",
    "CAREER",
    "SUPPORT",
    "PARTNERSHIP",
];

/** Contact statuses */
export const CONTACT_STATUSES = [
    "NEW",
    "IN_PROGRESS",
    "REPLIED",
    "CLOSED",
];