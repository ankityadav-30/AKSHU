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
        .min(2, "Last name must be at least 2 characters.")
        .max(50)
        .optional(),

    avatar: z
        .string()
        .url("Avatar must be a valid URL.")
        .optional(),
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
        .min(8, "Password must be at least 8 characters.")
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
            "Password must contain uppercase, lowercase, number and special character."
        ),

    confirmPassword: z
        .string()

}).refine(
    (data) =>
        data.newPassword === data.confirmPassword,
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
        .url("Avatar must be a valid URL.")

});