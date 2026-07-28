import mongoose from "mongoose";

const socialLinksSchema = new mongoose.Schema(
    {
        linkedin: {
            type: String,
            trim: true,
            default: "",
        },

        github: {
            type: String,
            trim: true,
            default: "",
        },

        portfolio: {
            type: String,
            trim: true,
            default: "",
        },

        twitter: {
            type: String,
            trim: true,
            default: "",
        },

        instagram: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        _id: false,
    },
    {
        timestamps: true,
    }
);

const teamSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            trim: true,
            default: "",
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            trim: true,
            default: "",
        },

        designation: {
            type: String,
            required: true,
            trim: true,
        },

        department: {
            type: String,
            default: "Engineering",
            trim: true,
        },

        bio: {
            type: String,
            default: "",
        },

        profileImage: {
            type: String,
            default: "",
        },

        skills: [
            {
                type: String,
                trim: true,
            },
        ],

        experience: {
            type: Number,
            default: 0,
        },

        socialLinks: socialLinksSchema,

        featured: {
            type: Boolean,
            default: false,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        displayOrder: {
            type: Number,
            default: 0,
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

teamSchema.index({ featured: 1 });

teamSchema.index({ isActive: 1 });

teamSchema.index({ displayOrder: 1 });

teamSchema.index({ designation: 1 });

const Team = mongoose.model("Team", teamSchema);

export default Team;
