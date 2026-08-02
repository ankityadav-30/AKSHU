import { z } from "zod";

/**
 * Update Profile
 */
export const updateProfileSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters.")
        .max(50)
        .optional(),

    lastName: z
        .string()
        .trim()
        .min(1)
        .max(50)
        .optional()
        .or(z.literal("")),

    avatar: z
        .string()
        .optional()
        .or(z.literal("")),
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field is required for update.",
    }
);

/**
 * Change Password
 */
export const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(8, "Current password is required."),

    newPassword: z
        .string()
        .min(8, "New password must be at least 8 characters."),

    confirmPassword: z
        .string()
        .min(8, "Confirm password is required."),
}).refine(
    (data) => data.newPassword === data.confirmPassword,
    {
        path: ["confirmPassword"],
        message: "Passwords do not match.",
    }
);

/**
 * Update Avatar
 */
export const updateAvatarSchema = z.object({
    avatar: z
        .string()
        .min(1, "Avatar URL is required.")
});