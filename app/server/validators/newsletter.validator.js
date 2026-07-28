import { z } from "zod";

/**
 * MongoDB ObjectId validation
 */
const objectIdSchema = z
    .string()
    .trim()
    .regex(
        /^[0-9a-fA-F]{24}$/,
        "Invalid subscriber ID."
    );

/**
 * Newsletter subscription sources
 */
const newsletterSources = [
    "WEBSITE",
    "BLOG",
    "FOOTER",
    "LANDING_PAGE",
    "ADMIN",
];

/**
 * Newsletter subscription statuses
 */
const newsletterStatuses = [
    "SUBSCRIBED",
    "UNSUBSCRIBED",
];

/**
 * Subscribe
 *
 * POST /newsletter/subscribe
 */
const subscribeSchema = z.object({
    body: z
        .object({
            email: z
                .string({
                    required_error:
                        "Email is required.",
                })
                .trim()
                .email(
                    "Please provide a valid email address."
                )
                .max(
                    254,
                    "Email must not exceed 254 characters."
                )
                .transform((email) =>
                    email.toLowerCase()
                ),

            source: z
                .enum(newsletterSources, {
                    errorMap: () => ({
                        message:
                            "Invalid newsletter subscription source.",
                    }),
                })
                .optional()
                .default("WEBSITE"),
        })
        .strict(),
});

/**
 * Public unsubscribe using token
 *
 * GET /newsletter/unsubscribe/:token
 */
const unsubscribeSchema = z.object({
    params: z.object({
        token: z
            .string({
                required_error:
                    "Unsubscribe token is required.",
            })
            .trim()
            .length(
                64,
                "Invalid unsubscribe token."
            )
            .regex(
                /^[a-fA-F0-9]{64}$/,
                "Invalid unsubscribe token."
            ),
    }),
});

/**
 * Subscriber ID parameter
 *
 * Used by:
 * GET    /newsletter/:id
 * PATCH  /newsletter/:id/unsubscribe
 * PATCH  /newsletter/:id/resubscribe
 * DELETE /newsletter/:id
 */
const subscriberIdSchema = z.object({
    params: z.object({
        id: objectIdSchema,
    }),
});

/**
 * Get newsletter subscribers
 *
 * GET /newsletter
 */
const getSubscribersSchema = z.object({
    query: z.object({
        status: z
            .enum(newsletterStatuses, {
                errorMap: () => ({
                    message:
                        "Invalid newsletter status.",
                }),
            })
            .optional(),

        source: z
            .enum(newsletterSources, {
                errorMap: () => ({
                    message:
                        "Invalid newsletter subscription source.",
                }),
            })
            .optional(),

        page: z.coerce
            .number()
            .int(
                "Page must be an integer."
            )
            .min(
                1,
                "Page must be at least 1."
            )
            .default(1),

        limit: z.coerce
            .number()
            .int(
                "Limit must be an integer."
            )
            .min(
                1,
                "Limit must be at least 1."
            )
            .max(
                100,
                "Limit cannot exceed 100."
            )
            .default(20),
    }),
});

export {
    subscribeSchema,
    unsubscribeSchema,
    subscriberIdSchema,
    getSubscribersSchema,
};