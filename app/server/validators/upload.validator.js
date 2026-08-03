import { z } from "zod";

/**
 * Cloudinary Public ID
 */
const publicIdSchema = z
    .string()
    .trim()
    .min(
        1,
        "Cloudinary public ID is required."
    )
    .max(
        500,
        "Cloudinary public ID is too long."
    );

/**
 * Upload Folder
 */
const folderSchema = z
    .string()
    .trim()
    .min(1)
    .max(150)
    .regex(
        /^[a-zA-Z0-9/_-]+$/,
        "Folder can contain only letters, numbers, slashes, underscores and hyphens."
    );

/**
 * Resource Type
 */
const resourceTypeSchema = z.enum([
    "image",
    "raw",
    "video",
    "auto",
]);

/**
 * Single Upload
 *
 * Validates req.body
 */
export const uploadSingleSchema = z.object({
    folder: folderSchema.optional(),

    resourceType: resourceTypeSchema
        .optional()
        .default("auto"),
});

/**
 * Multiple Upload
 *
 * Validates req.body
 */
export const uploadMultipleSchema = z.object({
    folder: folderSchema.optional(),

    resourceType: resourceTypeSchema
        .optional()
        .default("auto"),
});

/**
 * Delete Single Upload
 *
 * Validates req.body
 */
export const deleteUploadSchema = z.object({
    publicId: publicIdSchema,

    resourceType: resourceTypeSchema
        .optional()
        .default("image"),
});

/**
 * Delete Multiple Uploads
 *
 * Validates req.body
 */
export const deleteMultipleUploadsSchema = z.object({
    publicIds: z
        .array(publicIdSchema)
        .min(
            1,
            "At least one public ID is required."
        )
        .max(
            100,
            "Maximum 100 resources can be deleted at once."
        ),

    resourceType: resourceTypeSchema
        .optional()
        .default("image"),
});

/**
 * Replace Existing Upload
 *
 * Validates req.body
 */
export const replaceUploadSchema = z.object({
    publicId: publicIdSchema,

    resourceType: resourceTypeSchema
        .optional()
        .default("image"),

    folder: folderSchema.optional(),
});