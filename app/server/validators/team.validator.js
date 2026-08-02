import { z } from "zod";

/**
 * Create/Update Member Base Schema
 */
const baseMemberSchema = z.object({
    firstName: z.string().min(2).max(100).optional(),
    lastName: z.string().max(100).optional(),
    name: z.string().min(2).max(100).optional(),
    displayName: z.string().max(100).optional(),
    slug: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    designation: z.string().min(2).max(100).optional(),
    department: z.string().min(2).max(100).optional(),
    location: z.string().optional(),
    bio: z.string().max(1000).optional(),
    detailedBio: z.string().max(5000).optional(),
    profileImage: z.string().optional(),
    image: z.string().optional(),
    coverImage: z.string().optional(),
    specialization: z.string().optional(),
    education: z.string().optional(),
    experience: z.number().int().nonnegative().optional(),
    projectsCompleted: z.number().int().nonnegative().optional(),
    happyClients: z.number().int().nonnegative().optional(),

    skills: z.array(z.string()).optional(),
    techStack: z.array(z.string()).optional(),
    certifications: z.array(z.string()).optional(),

    achievements: z
        .array(
            z.object({
                title: z.string().optional(),
                organization: z.string().optional(),
                year: z.string().optional(),
                description: z.string().optional(),
            })
        )
        .optional(),

    socialLinks: z
        .object({
            linkedin: z.string().url().optional().or(z.literal("")),
            github: z.string().url().optional().or(z.literal("")),
            portfolio: z.string().url().optional().or(z.literal("")),
            twitter: z.string().url().optional().or(z.literal("")),
            instagram: z.string().url().optional().or(z.literal("")),
            behance: z.string().url().optional().or(z.literal("")),
            dribbble: z.string().url().optional().or(z.literal("")),
            website: z.string().url().optional().or(z.literal("")),
        })
        .optional(),

    linkedin: z.string().url().optional().or(z.literal("")),
    github: z.string().url().optional().or(z.literal("")),
    portfolio: z.string().url().optional().or(z.literal("")),
    twitter: z.string().url().optional().or(z.literal("")),
    instagram: z.string().url().optional().or(z.literal("")),
    behance: z.string().url().optional().or(z.literal("")),
    dribbble: z.string().url().optional().or(z.literal("")),
    website: z.string().url().optional().or(z.literal("")),

    displayOrder: z.number().int().optional(),
    order: z.number().int().optional(),
    displayPriority: z.number().int().optional(),
    priority: z.number().int().optional(),
    cardSize: z.enum(["small", "medium", "large"]).optional(),
    showBio: z.boolean().optional(),
    showSkills: z.boolean().optional(),
    showSocialLinks: z.boolean().optional(),
    featured: z.boolean().optional(),
    isActive: z.boolean().optional(),
});

/**
 * Create Member Schema
 */
export const createMemberSchema = baseMemberSchema.refine(
    (data) => (data.firstName || data.name) && data.email && data.designation,
    {
        message: "First name (or name), email, and designation are required.",
        path: ["firstName"],
    }
);

/**
 * Update Member Schema
 */
export const updateMemberSchema = baseMemberSchema.partial();

/**
 * Member Params Schema (permits Mongo ObjectId OR slug string)
 */
export const memberIdSchema = z.object({
    id: z.string().min(1, "Identifier is required."),
});

/**
 * Search Schema
 */
export const searchMemberSchema = z.object({
    keyword: z.string().optional().default(""),
});