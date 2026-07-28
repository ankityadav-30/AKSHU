import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import newsletterService from "../services/newsletter.service.js";

/**
 * Subscribe to newsletter
 * Public
 */
const subscribe = asyncHandler(async (req, res) => {
    const subscriptionData = {
        ...req.body,

        ipAddress: req.ip,

        userAgent:
            req.get("user-agent") || "",
    };

    const subscriber =
        await newsletterService.subscribe(
            subscriptionData
        );

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                subscriber,
                "Successfully subscribed to the newsletter."
            )
        );
});

/**
 * Unsubscribe using unsubscribe token
 * Public
 */
const unsubscribe = asyncHandler(async (req, res) => {
    const { token } = req.params;

    const subscriber =
        await newsletterService.unsubscribe(token);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                subscriber,
                "Successfully unsubscribed from the newsletter."
            )
        );
});

/**
 * Unsubscribe subscriber by ID
 * Admin
 */
const unsubscribeById = asyncHandler(
    async (req, res) => {
        const { id } = req.params;

        const subscriber =
            await newsletterService.unsubscribeById(
                id
            );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    subscriber,
                    "Subscriber unsubscribed successfully."
                )
            );
    }
);

/**
 * Resubscribe subscriber
 * Admin
 */
const resubscribe = asyncHandler(
    async (req, res) => {
        const { id } = req.params;

        const subscriber =
            await newsletterService.resubscribe(id);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    subscriber,
                    "Subscriber reactivated successfully."
                )
            );
    }
);

/**
 * Get subscriber by ID
 * Admin
 */
const getSubscriberById = asyncHandler(
    async (req, res) => {
        const { id } = req.params;

        const subscriber =
            await newsletterService.getSubscriberById(
                id
            );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    subscriber,
                    "Subscriber retrieved successfully."
                )
            );
    }
);

/**
 * Get all subscribers
 * Admin
 */
const getSubscribers = asyncHandler(
    async (req, res) => {
        const {
            status,
            source,
            page = 1,
            limit = 20,
        } = req.query;

        const filter = {};

        if (status) {
            filter.status = status;
        }

        if (source) {
            filter.source = source;
        }

        const parsedPage = Number(page);
        const parsedLimit = Number(limit);

        const skip =
            (parsedPage - 1) * parsedLimit;

        const subscribers =
            await newsletterService.getSubscribers(
                filter,
                {
                    sort: {
                        createdAt: -1,
                    },
                    skip,
                    limit: parsedLimit,
                }
            );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    subscribers,
                    "Newsletter subscribers retrieved successfully."
                )
            );
    }
);

/**
 * Get active subscribers
 * Admin
 */
const getSubscribed = asyncHandler(
    async (req, res) => {
        const subscribers =
            await newsletterService.getSubscribed();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    subscribers,
                    "Active newsletter subscribers retrieved successfully."
                )
            );
    }
);

/**
 * Get unsubscribed subscribers
 * Admin
 */
const getUnsubscribed = asyncHandler(
    async (req, res) => {
        const subscribers =
            await newsletterService.getUnsubscribed();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    subscribers,
                    "Unsubscribed newsletter subscribers retrieved successfully."
                )
            );
    }
);

/**
 * Get newsletter statistics
 * Admin
 */
const getStatistics = asyncHandler(
    async (req, res) => {
        const statistics =
            await newsletterService.getStatistics();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    statistics,
                    "Newsletter statistics retrieved successfully."
                )
            );
    }
);

/**
 * Permanently delete subscriber
 * Admin
 */
const deleteSubscriber = asyncHandler(
    async (req, res) => {
        const { id } = req.params;

        const subscriber =
            await newsletterService.deleteSubscriber(
                id
            );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    subscriber,
                    "Newsletter subscriber deleted successfully."
                )
            );
    }
);

export {
    subscribe,
    unsubscribe,
    unsubscribeById,
    resubscribe,
    getSubscriberById,
    getSubscribers,
    getSubscribed,
    getUnsubscribed,
    getStatistics,
    deleteSubscriber,
};