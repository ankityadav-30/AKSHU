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
    ADMIN_PROJECTS: "/admin/projects",
    ADMIN_TEAM: "/admin/team",
    ADMIN_CONTACTS: "/admin/contacts",
    ADMIN_NEWSLETTER: "/admin/newsletter",
    ADMIN_ANALYTICS: "/admin/analytics",
    ADMIN_PROFILE: "/admin/profile",
};