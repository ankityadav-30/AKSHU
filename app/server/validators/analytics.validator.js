import { z } from "zod";

/**
 * Analytics Query
 *
 * Controls the number of months included
 * in time-based analytics.
 */
export const analyticsQuerySchema = z.object({
    months: z
        .coerce
        .number()
        .int(
            "Months must be an integer."
        )
        .min(
            1,
            "Months must be at least 1."
        )
        .max(
            60,
            "Months cannot exceed 60."
        )
        .optional()
        .default(12),
});