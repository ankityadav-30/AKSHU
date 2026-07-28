import { z } from "zod";

/**
 * Dashboard Query
 *
 * Used for:
 * - Recent Activity
 * - Complete Dashboard
 */
export const dashboardQuerySchema = z.object({
    limit: z
        .coerce
        .number()
        .int()
        .positive()
        .max(
            100,
            "Limit cannot exceed 100."
        )
        .optional()
        .default(5),
});