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
        "Slug can contain only lowercase letters, numbers and hyphens."
    );

/**
 * Cover Image
 */
const coverImageSchema = z.object({

    url: z
        .string()
        .url(),

    publicId: z
        .string()
        .min(1)

}).optional();

/**
 * SEO
 */
const seoSchema = z.object({

    metaTitle: z
        .string()
        .max(70)
        .optional(),

    metaDescription: z
        .string()
        .max(160)
        .optional(),

    keywords: z
        .array(
            z.string().trim()
        )
        .optional(),

}).optional();

/**
 * Create Blog
 */
export const createBlogSchema = z.object({

    title: z
        .string()
        .trim()
        .min(3)
        .max(200),

    slug: slugSchema.optional(),

    shortDescription: z
        .string()
        .trim()
        .min(20)
        .max(300),

    content: z
        .string()
        .min(50),

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
        .array(
            z.string().trim()
        )
        .optional(),

    featured: z
        .boolean()
        .optional(),

    seo: seoSchema

});

/**
 * Update Blog
 */
export const updateBlogSchema =
    createBlogSchema
        .partial()
        .refine(
            (data) =>
                Object.keys(data).length > 0,
            {
                message:
                    "At least one field is required."
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

    slug: slugSchema

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