import { z } from "zod";

/**
 * Mongo ObjectId
 */
const objectIdSchema = z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    "Invalid MongoDB ObjectId."
);

/**
 * Create Member
 */
export const createMemberSchema = z.object({

    name: z
        .string()
        .min(2)
        .max(100),

    designation: z
        .string()
        .min(2)
        .max(100),

    department: z
        .string()
        .min(2)
        .max(100)
        .optional(),

    bio: z
        .string()
        .max(1000)
        .optional(),

    image: z
        .string()
        .optional(),

    email: z
        .string()
        .email()
        .optional(),

    phone: z
        .string()
        .optional(),

    linkedin: z
        .string()
        .url()
        .optional(),

    github: z
        .string()
        .url()
        .optional(),

    portfolio: z
        .string()
        .url()
        .optional(),

    skills: z
        .array(z.string())
        .optional(),

    order: z
        .number()
        .int()
        .nonnegative()
        .optional(),

    isActive: z
        .boolean()
        .optional(),

});

/**
 * Update Member
 */
export const updateMemberSchema =
    createMemberSchema.partial();

/**
 * Params
 */
export const memberIdSchema = z.object({

    id: objectIdSchema,

});

/**
 * Search
 */
export const searchMemberSchema = z.object({

    keyword: z
        .string()
        .optional()
        .default(""),

});