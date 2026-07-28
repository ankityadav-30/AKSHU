import mongoose from "mongoose";

const seoSchema = new mongoose.Schema(
    {
        metaTitle: {
            type: String,
            trim: true,
            default: "",
        },

        metaDescription: {
            type: String,
            trim: true,
            default: "",
        },

        keywords: [
            {
                type: String,
                trim: true,
            },
        ],
    },
    {
        _id: false,
    }
);

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        shortDescription: {
            type: String,
            required: true,
            maxlength: 300,
        },

        content: {
            type: String,
            required: true,
        },

        coverImage: {
            url: {
                type: String,
                default: "",
            },

            publicId: {
                type: String,
                default: "",
            },
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Technology",
                "Programming",
                "AI",
                "Tutorial",
                "Company",
                "Career",
                "News",
                "Other",
            ],
        },

        tags: [
            {
                type: String,
                trim: true,
            },
        ],

        readingTime: {
            type: Number,
            default: 1,
        },

        featured: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            enum: [
                "DRAFT",
                "PUBLISHED",
                "ARCHIVED",
            ],
            default: "DRAFT",
        },

        publishedAt: {
            type: Date,
            default: null,
        },

        seo: seoSchema,

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Indexes
 */

blogSchema.index({ status: 1 });

blogSchema.index({ featured: 1 });

blogSchema.index({ category: 1 });

blogSchema.index({ publishedAt: -1 });

blogSchema.index({ tags: 1 });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;