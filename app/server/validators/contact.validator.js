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
 * Contact Form
 */
export const createContactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters.")
        .max(100),

    email: z
        .string()
        .trim()
        .email("Invalid email address."),

    phone: z
        .string()
        .trim()
        .max(30)
        .optional()
        .or(z.literal("")),

    company: z
        .string()
        .trim()
        .max(100)
        .optional()
        .or(z.literal("")),

    inquiryType: z.enum([
        "GENERAL",
        "PROJECT",
        "CAREER",
        "SUPPORT",
        "PARTNERSHIP"
    ]).optional().or(z.literal("")),

    subject: z
        .string()
        .trim()
        .min(2, "Subject must be at least 2 characters.")
        .max(200),

    message: z
        .string()
        .trim()
        .min(5, "Message must be at least 5 characters.")
        .max(5000),
});

/**
 * Contact ID
 */
export const contactIdSchema = z.object({
    id: objectIdSchema
});

/**
 * Assign Contact
 */
export const assignContactSchema = z.object({
    adminId: objectIdSchema
});

/**
 * Update Status
 */
export const updateStatusSchema = z.object({
    status: z.enum([
        "NEW",
        "IN_PROGRESS",
        "REPLIED",
        "CLOSED"
    ])
});

/**
 * Add Internal Note
 */
export const addNoteSchema = z.object({
    message: z
        .string()
        .trim()
        .min(1, "Note cannot be empty.")
        .max(2000)
});

/**
 * Search
 */
export const searchContactSchema = z.object({
    keyword: z
        .string()
        .trim()
        .min(1)
        .optional()
        .or(z.literal(""))
});

/**
 * Recent Contacts Query
 */
export const recentQuerySchema = z.object({
    limit: z.coerce
        .number()
        .int()
        .positive()
        .max(100)
        .optional()
});