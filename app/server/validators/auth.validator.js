import { z } from "zod";

/**
 * Register Validation
 */
export const registerSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters.")
        .max(50),

    lastName: z
        .string()
        .trim()
        .min(2, "Last name must be at least 2 characters.")
        .max(50),

    email: z
        .string()
        .trim()
        .email("Invalid email address."),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .max(100),

    role: z
        .enum([
            "SUPER_ADMIN",
            "ADMIN",
            "EDITOR",
            "HR",
            "TEAM_MEMBER",
        ])
        .optional(),
});

/**
 * Login Validation
 */
export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid email address."),

    password: z
        .string()
        .min(8, "Password is required."),
});

/**
 * Forgot Password Validation
 */
export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid email address."),
});

/**
 * Reset Password Validation
 */
export const resetPasswordSchema = z.object({
    token: z
        .string()
        .min(1, "Reset token is required."),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters."),
});

/**
 * Change Password Validation
 */
export const changePasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(8),

        newPassword: z
            .string()
            .min(8)
            .max(100),

        confirmPassword: z
            .string()
            .min(8),
    })
    .refine(
        (data) => data.newPassword === data.confirmPassword,
        {
            message: "Passwords do not match.",
            path: ["confirmPassword"],
        }
    );