/**
 * =====================================
 * USER ROLES
 * =====================================
 */
export const ROLES = Object.freeze({
    SUPER_ADMIN: "SUPER_ADMIN",
    ADMIN: "ADMIN",
    EDITOR: "EDITOR",
    HR: "HR",
    TEAM_MEMBER: "TEAM_MEMBER",
});

/**
 * =====================================
 * ACCOUNT STATUS
 * =====================================
 */
export const ACCOUNT_STATUS = Object.freeze({
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    SUSPENDED: "SUSPENDED",
});

/**
 * =====================================
 * TOKEN TYPES
 * =====================================
 */
export const TOKEN_TYPES = Object.freeze({
    ACCESS: "ACCESS",
    REFRESH: "REFRESH",
});

/**
 * =====================================
 * PAGINATION
 * =====================================
 */
export const PAGINATION = Object.freeze({
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
});

/**
 * =====================================
 * FILE UPLOADS
 * =====================================
 */
export const UPLOAD = Object.freeze({
    MAX_IMAGE_SIZE: 5 * 1024 * 1024,
    MAX_DOCUMENT_SIZE: 10 * 1024 * 1024,

    IMAGE_TYPES: [
        "image/jpeg",
        "image/png",
        "image/webp",
    ],

    DOCUMENT_TYPES: [
        "application/pdf",
    ],
});

/**
 * =====================================
 * API MESSAGES
 * =====================================
 */
export const MESSAGES = Object.freeze({
    LOGIN_SUCCESS: "Login successful.",
    REGISTER_SUCCESS: "User registered successfully.",
    LOGOUT_SUCCESS: "Logout successful.",

    UNAUTHORIZED: "Authentication required.",
    FORBIDDEN:
        "You do not have permission to access this resource.",

    USER_NOT_FOUND: "User not found.",

    VALIDATION_FAILED: "Validation failed.",
});