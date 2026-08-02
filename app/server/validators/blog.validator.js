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
    .max(200)
    .optional()
    .or(z.literal(""));

/**
 * Cover Image Schema (Allows empty strings or omitted values)
 */
const coverImageSchema = z
    .object({
        url: z.string().url().optional().or(z.literal("")),
        publicId: z.string().optional().or(z.literal("")),
    })
    .optional()
    .nullable();

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
 * Create Blog Schema
 */
export const createBlogSchema = z.object({
    title: z
        .string()
        .trim()
        .min(2, "Title must be at least 2 characters.")
        .max(200),

    slug: slugSchema,

    shortDescription: z
        .string()
        .trim()
        .min(5, "Short description must be at least 5 characters.")
        .max(500),

    content: z
        .string()
        .min(1, "Content is required."),

    coverImage: coverImageSchema,

    category: z.enum([
        "Technology",
        "Programming",
        "AI",
        "Tutorial",
        "Company",
        "Career",
        "News",
        "Other"
    ]),

    tags: z
        .array(z.string().trim())
        .optional(),

    featured: z
        .boolean()
        .optional(),

    status: z
        .enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
        .optional(),

    seo: seoSchema,
});

/**
 * Update Blog Schema
 */
export const updateBlogSchema = createBlogSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field is required."
        }
    );

/**
 * Blog Id
 */
export const blogIdSchema = z.object({
    id: objectIdSchema
});

/**
 * Blog Slug
 */
export const blogSlugSchema = z.object({
    slug: z.string().min(1)
});

/**
 * Search Query
 */
export const searchBlogSchema = z.object({
    keyword: z
        .string()
        .trim()
        .min(1)
});

/**
 * Featured / Latest Query
 */
export const limitQuerySchema = z.object({
    limit: z
        .coerce
        .number()
        .int()
        .positive()
        .max(100)
        .optional()
});