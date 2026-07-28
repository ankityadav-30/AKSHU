import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
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

        description: {
            type: String,
            required: true,
        },

        thumbnail: {
            type: String,
            default: "",
        },

        gallery: [
            {
                type: String,
            },
        ],

        technologies: [
            {
                type: String,
            },
        ],

        category: {
            type: String,
            enum: [
                "WEB",
                "MOBILE",
                "AI",
                "DESKTOP",
                "OTHER",
            ],
            default: "WEB",
        },

        liveDemoUrl: {
            type: String,
            default: "",
        },

        githubUrl: {
            type: String,
            default: "",
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

        seo: {
            metaTitle: {
                type: String,
                default: "",
            },

            metaDescription: {
                type: String,
                default: "",
            },

            keywords: [
                {
                    type: String,
                },
            ],
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
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

export default mongoose.model(
    "Project",
    projectSchema
);