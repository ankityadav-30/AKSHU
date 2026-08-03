import crypto from "crypto";
import ApiError from "../utils/ApiError.js";
import newsletterRepository from "../repositories/newsletter.repository.js";

class NewsletterService {
    /**
     * Subscribe to newsletter
     */
    async subscribe(data) {
        const email = data.email.toLowerCase().trim();

        const existingSubscriber =
            await newsletterRepository.findByEmail(email);

        /*
         * New subscriber
         */
        if (!existingSubscriber) {
            const unsubscribeToken =
                crypto.randomBytes(32).toString("hex");

            return newsletterRepository.create({
                ...data,
                email,
                unsubscribeToken,
                status: "SUBSCRIBED",
                subscribedAt: new Date(),
                unsubscribedAt: null,
            });
        }

        /*
         * Already subscribed
         */
        if (existingSubscriber.status === "SUBSCRIBED") {
            throw new ApiError(
                409,
                "Email is already subscribed to the newsletter."
            );
        }

        /*
         * Previously unsubscribed.
         * Reactivate the existing subscription instead
         * of creating another document.
         */
        if (existingSubscriber.status === "UNSUBSCRIBED") {
            const unsubscribeToken =
                crypto.randomBytes(32).toString("hex");

            return newsletterRepository.updateById(
                existingSubscriber._id,
                {
                    status: "SUBSCRIBED",
                    unsubscribeToken,
                    subscribedAt: new Date(),
                    unsubscribedAt: null,

                    ...(data.source && {
                        source: data.source,
                    }),

                    ...(data.ipAddress && {
                        ipAddress: data.ipAddress,
                    }),

                    ...(data.userAgent && {
                        userAgent: data.userAgent,
                    }),
                }
            );
        }

        throw new ApiError(
            400,
            "Unable to process newsletter subscription."
        );
    }

    /**
     * Unsubscribe using unsubscribe token
     */
    async unsubscribe(token) {
        if (!token) {
            throw new ApiError(
                400,
                "Unsubscribe token is required."
            );
        }

        const subscriber =
            await newsletterRepository.findByUnsubscribeToken(
                token
            );

        if (!subscriber) {
            throw new ApiError(
                404,
                "Invalid unsubscribe token."
            );
        }

        if (subscriber.status === "UNSUBSCRIBED") {
            throw new ApiError(
                409,
                "Email is already unsubscribed."
            );
        }

        return newsletterRepository.updateById(
            subscriber._id,
            {
                status: "UNSUBSCRIBED",
                unsubscribedAt: new Date(),
                unsubscribeToken: "",
            }
        );
    }

    /**
     * Unsubscribe subscriber by ID
     *
     * Intended for authenticated admin operations.
     */
    async unsubscribeById(id) {
        const subscriber =
            await newsletterRepository.findById(id);

        if (!subscriber) {
            throw new ApiError(
                404,
                "Newsletter subscriber not found."
            );
        }

        if (subscriber.status === "UNSUBSCRIBED") {
            throw new ApiError(
                409,
                "Subscriber is already unsubscribed."
            );
        }

        return newsletterRepository.unsubscribe(id);
    }

    /**
     * Resubscribe subscriber by ID
     *
     * Intended for authenticated admin operations.
     */
    async resubscribe(id) {
        const subscriber =
            await newsletterRepository.findById(id);

        if (!subscriber) {
            throw new ApiError(
                404,
                "Newsletter subscriber not found."
            );
        }

        if (subscriber.status === "SUBSCRIBED") {
            throw new ApiError(
                409,
                "Subscriber is already active."
            );
        }

        const unsubscribeToken =
            crypto.randomBytes(32).toString("hex");

        return newsletterRepository.updateById(
            subscriber._id,
            {
                status: "SUBSCRIBED",
                unsubscribeToken,
                subscribedAt: new Date(),
                unsubscribedAt: null,
            }
        );
    }

    /**
     * Get subscriber by ID
     */
    async getSubscriberById(id) {
        const subscriber =
            await newsletterRepository.findById(id);

        if (!subscriber) {
            throw new ApiError(
                404,
                "Newsletter subscriber not found."
            );
        }

        return subscriber;
    }

    /**
     * Get all subscribers
     */
    async getSubscribers(filter = {}, options = {}) {
        return newsletterRepository.findAll(
            filter,
            options
        );
    }

    /**
     * Get active subscribers
     */
    async getSubscribed() {
        return newsletterRepository.findSubscribed();
    }

    /**
     * Get unsubscribed subscribers
     */
    async getUnsubscribed() {
        return newsletterRepository.findUnsubscribed();
    }

    /**
     * Get newsletter statistics
     */
    async getStatistics() {
        const [
            total,
            subscribed,
            unsubscribed,
        ] = await Promise.all([
            newsletterRepository.count(),
            newsletterRepository.countSubscribed(),
            newsletterRepository.countUnsubscribed(),
        ]);

        return {
            total,
            subscribed,
            unsubscribed,
        };
    }

    /**
     * Delete subscriber permanently
     *
     * Intended for authenticated admin operations.
     */
    async deleteSubscriber(id) {
        const subscriber =
            await newsletterRepository.findById(id);

        if (!subscriber) {
            throw new ApiError(
                404,
                "Newsletter subscriber not found."
            );
        }

        await newsletterRepository.deleteById(id);

        return subscriber;
    }
}

export default new NewsletterService();