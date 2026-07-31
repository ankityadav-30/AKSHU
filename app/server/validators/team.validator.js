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
const baseMemberSchema = z.object({

    firstName: z
        .string()
        .min(2)
        .max(100)
        .optional(),

    lastName: z
        .string()
        .max(100)
        .optional(),

    name: z
        .string()
        .min(2)
        .max(100)
        .optional(),

    email: z
        .string()
        .email()
        .optional(),

    designation: z
        .string()
        .min(2)
        .max(100)
        .optional(),

    department: z
        .string()
        .min(2)
        .max(100)
        .optional(),

    bio: z
        .string()
        .max(1000)
        .optional(),

    profileImage: z
        .string()
        .optional(),

    image: z
        .string()
        .optional(),

    phone: z
        .string()
        .optional(),

    socialLinks: z
        .object({
            linkedin: z.string().url().optional().or(z.literal("")),
            github: z.string().url().optional().or(z.literal("")),
            portfolio: z.string().url().optional().or(z.literal("")),
            twitter: z.string().url().optional().or(z.literal("")),
            instagram: z.string().url().optional().or(z.literal("")),
        })
        .optional(),

    linkedin: z
        .string()
        .url()
        .optional()
        .or(z.literal("")),

    github: z
        .string()
        .url()
        .optional()
        .or(z.literal("")),

    portfolio: z
        .string()
        .url()
        .optional()
        .or(z.literal("")),

    skills: z
        .array(z.string())
        .optional(),

    displayOrder: z
        .number()
        .int()
        .nonnegative()
        .optional(),

    order: z
        .number()
        .int()
        .nonnegative()
        .optional(),

    featured: z
        .boolean()
        .optional(),

    isActive: z
        .boolean()
        .optional(),

});

/**
 * Create Member
 */
export const createMemberSchema = baseMemberSchema.refine(
    (data) => (data.firstName || data.name) && data.email && data.designation,
    {
        message: "First name (or name), email, and designation are required.",
        path: ["firstName"],
    }
);

/**
 * Update Member
 */
export const updateMemberSchema = baseMemberSchema.partial();

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