import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        status: {
            type: String,
            enum: [
                "SUBSCRIBED",
                "UNSUBSCRIBED",
            ],
            default: "SUBSCRIBED",
        },

        unsubscribeToken: {
            type: String,
            default: "",
        },

        subscribedAt: {
            type: Date,
            default: Date.now,
        },

        unsubscribedAt: {
            type: Date,
            default: null,
        },

        source: {
            type: String,
            enum: [
                "WEBSITE",
                "BLOG",
                "FOOTER",
                "LANDING_PAGE",
                "ADMIN",
            ],
            default: "WEBSITE",
        },

        ipAddress: {
            type: String,
            default: "",
        },

        userAgent: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Indexes
 */

newsletterSchema.index({ status: 1 });

newsletterSchema.index({ subscribedAt: -1 });

newsletterSchema.index({ source: 1 });

const Newsletter = mongoose.model(
    "Newsletter",
    newsletterSchema
);

export default Newsletter;