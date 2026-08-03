import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
            trim: true,
        },

        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        _id: false,
    }
);

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            default: "",
            trim: true,
        },

        company: {
            type: String,
            default: "",
            trim: true,
        },

        inquiryType: {
            type: String,
            enum: [
                "GENERAL",
                "PROJECT",
                "CAREER",
                "SUPPORT",
                "PARTNERSHIP",
            ],
            default: "GENERAL",
        },

        subject: {
            type: String,
            required: true,
            trim: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: [
                "NEW",
                "IN_PROGRESS",
                "REPLIED",
                "CLOSED",
            ],
            default: "NEW",
        },

        isRead: {
            type: Boolean,
            default: false,
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        repliedAt: {
            type: Date,
            default: null,
        },

        notes: [noteSchema],

        isSpam: {
            type: Boolean,
            default: false,
        },

        isArchived: {
            type: Boolean,
            default: false,
        },

        ipAddress: {
            type: String,
            default: "",
        },

        userAgent: {
            type: String,
            default: "",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Indexes
 */

contactSchema.index({ email: 1 });

contactSchema.index({ status: 1 });

contactSchema.index({ inquiryType: 1 });

contactSchema.index({ isRead: 1 });

contactSchema.index({ assignedTo: 1 });

contactSchema.index({ isSpam: 1 });

contactSchema.index({ createdAt: -1 });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;