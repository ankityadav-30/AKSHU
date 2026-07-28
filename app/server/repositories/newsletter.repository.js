import BaseRepository from "./base.repository.js";
import Newsletter from "../models/newsletter.model.js";

class NewsletterRepository extends BaseRepository {
    constructor() {
        super(Newsletter);
    }

    /**
     * Find subscriber by email
     */
    async findByEmail(email) {
        return this.model.findOne({
            email: email.toLowerCase(),
        });
    }

    /**
     * Check if email already exists
     */
    async emailExists(email) {
        return this.model.exists({
            email: email.toLowerCase(),
        });
    }

    /**
     * Get active subscribers
     */
    async findSubscribed() {
        return this.model
            .find({
                status: "SUBSCRIBED",
            })
            .sort({
                subscribedAt: -1,
            });
    }

    /**
     * Get unsubscribed users
     */
    async findUnsubscribed() {
        return this.model
            .find({
                status: "UNSUBSCRIBED",
            })
            .sort({
                unsubscribedAt: -1,
            });
    }

    /**
     * Find by unsubscribe token
     */
    async findByUnsubscribeToken(token) {
        return this.model.findOne({
            unsubscribeToken: token,
        });
    }

    /**
     * Subscribe
     */
    async subscribe(data) {
        return this.model.create(data);
    }

    /**
     * Unsubscribe
     */
    async unsubscribe(id) {
        return this.model.findByIdAndUpdate(
            id,
            {
                status: "UNSUBSCRIBED",
                unsubscribedAt: new Date(),
            },
            {
                new: true,
                runValidators: true,
            }
        );
    }

    /**
     * Reactivate subscription
     */
    async resubscribe(id) {
        return this.model.findByIdAndUpdate(
            id,
            {
                status: "SUBSCRIBED",
                subscribedAt: new Date(),
                unsubscribedAt: null,
            },
            {
                new: true,
                runValidators: true,
            }
        );
    }

    /**
     * Count active subscribers
     */
    async countSubscribed() {
        return this.model.countDocuments({
            status: "SUBSCRIBED",
        });
    }

    
    // Count unsubscribed users
    
    async countUnsubscribed() {
        return this.model.countDocuments({
            status: "UNSUBSCRIBED",
        });
    }
}

export default new NewsletterRepository();