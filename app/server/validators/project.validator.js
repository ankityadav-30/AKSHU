import { z } from "zod";

/**
 * MongoDB ObjectId
 */
const objectIdSchema = z
    .string()
    .regex(
        /^[0-9a-fA-F]{24}$/,
        "Invalid MongoDB ObjectId."
    );

/**
 * Slug
 */
const slugSchema = z
    .string()
    .trim()
    .min(3)
    .max(150)
    .regex(
        /^[a-z0-9-]+$/,
        "Slug may only contain lowercase letters, numbers and hyphens."
    );

/**
 * Create Project
 */
export const createProjectSchema = z.object({

    title: z
        .string()
        .trim()
        .min(3)
        .max(150),

    slug: slugSchema,

    shortDescription: z
        .string()
        .trim()
        .min(10)
        .max(300),

    description: z
        .string()
        .trim()
        .min(30),

    thumbnail: z
        .string()
        .url()
        .optional(),

    gallery: z
        .array(z.string().url())
        .optional(),

    technologies: z
        .array(
            z.string().trim().min(1)
        )
        .min(1),

    category: z.enum([
        "WEB",
        "MOBILE",
        "AI",
        "DESKTOP",
        "OTHER",
    ]),

    liveDemoUrl: z
        .string()
        .url()
        .optional(),

    githubUrl: z
        .string()
        .url()
        .optional(),

    featured: z
        .boolean()
        .optional(),

});

/**
 * Update Project
 */
export const updateProjectSchema =
    createProjectSchema
        .partial()
        .refine(
            (data) =>
                Object.keys(data).length > 0,
            {
                message:
                    "At least one field is required.",
            }
        );

/**
 * Params
 */
export const projectIdSchema = z.object({
    id: objectIdSchema,
});

export const projectSlugSchema = z.object({
    slug: slugSchema,
});