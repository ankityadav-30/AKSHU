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
 * Slug Schema
 */
const slugSchema = z
    .string()
    .trim()
    .min(1)
    .max(150)
    .optional()
    .or(z.literal(""));

/**
 * SEO Schema
 */
const seoSchema = z
    .object({
        metaTitle: z.string().max(100).optional().or(z.literal("")),
        metaDescription: z.string().max(300).optional().or(z.literal("")),
        keywords: z.array(z.string().trim()).optional(),
    })
    .optional()
    .nullable();

/**
 * Create Project Schema
 */
export const createProjectSchema = z.object({
    title: z
        .string()
        .trim()
        .min(2, "Title must be at least 2 characters.")
        .max(150),

    slug: slugSchema,

    shortDescription: z
        .string()
        .trim()
        .min(5, "Short description must be at least 5 characters.")
        .max(500),

    description: z
        .string()
        .trim()
        .min(1, "Description is required."),

    thumbnail: z
        .string()
        .url()
        .optional()
        .or(z.literal("")),

    gallery: z
        .array(z.string())
        .optional(),

    technologies: z
        .array(z.string().trim())
        .optional(),

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
        .optional()
        .or(z.literal("")),

    githubUrl: z
        .string()
        .url()
        .optional()
        .or(z.literal("")),

    featured: z
        .boolean()
        .optional(),

    status: z
        .enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
        .optional(),

    seo: seoSchema,
});

/**
 * Update Project Schema
 */
export const updateProjectSchema = createProjectSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field is required.",
        }
    );

/**
 * Params Schema
 */
export const projectIdSchema = z.object({
    id: objectIdSchema,
});

export const projectSlugSchema = z.object({
    slug: z.string().min(1),
});