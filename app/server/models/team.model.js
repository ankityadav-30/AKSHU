import mongoose from "mongoose";

const socialLinksSchema = new mongoose.Schema(
    {
        linkedin: { type: String, trim: true, default: "" },
        github: { type: String, trim: true, default: "" },
        portfolio: { type: String, trim: true, default: "" },
        twitter: { type: String, trim: true, default: "" },
        instagram: { type: String, trim: true, default: "" },
        behance: { type: String, trim: true, default: "" },
        dribbble: { type: String, trim: true, default: "" },
        website: { type: String, trim: true, default: "" },
    },
    { _id: false, timestamps: true }
);

const achievementSchema = new mongoose.Schema(
    {
        title: { type: String, trim: true, default: "" },
        organization: { type: String, trim: true, default: "" },
        year: { type: String, trim: true, default: "" },
        description: { type: String, trim: true, default: "" },
    },
    { _id: false }
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

        displayName: {
            type: String,
            trim: true,
            default: "",
        },

        slug: {
            type: String,
            trim: true,
            lowercase: true,
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

        location: {
            type: String,
            trim: true,
            default: "",
        },

        bio: {
            type: String,
            default: "",
        },

        detailedBio: {
            type: String,
            default: "",
        },

        profileImage: {
            type: String,
            default: "",
        },

        coverImage: {
            type: String,
            default: "",
        },

        skills: [
            {
                type: String,
                trim: true,
            },
        ],

        techStack: [
            {
                type: String,
                trim: true,
            },
        ],

        certifications: [
            {
                type: String,
                trim: true,
            },
        ],

        specialization: {
            type: String,
            trim: true,
            default: "",
        },

        education: {
            type: String,
            trim: true,
            default: "",
        },

        experience: {
            type: Number,
            default: 0,
        },

        projectsCompleted: {
            type: Number,
            default: 0,
        },

        happyClients: {
            type: Number,
            default: 0,
        },

        achievements: [achievementSchema],

        socialLinks: socialLinksSchema,

        featured: {
            type: Boolean,
            default: false,
        },

        cardSize: {
            type: String,
            enum: ["small", "medium", "large"],
            default: "medium",
        },

        displayPriority: {
            type: Number,
            default: 0,
        },

        showBio: {
            type: Boolean,
            default: true,
        },

        showSkills: {
            type: Boolean,
            default: true,
        },

        showSocialLinks: {
            type: Boolean,
            default: true,
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

teamSchema.index({ slug: 1 });
teamSchema.index({ featured: 1 });
teamSchema.index({ cardSize: 1 });
teamSchema.index({ isActive: 1 });
teamSchema.index({ displayPriority: -1 });
teamSchema.index({ displayOrder: 1 });
teamSchema.index({ designation: 1 });

const Team = mongoose.model("Team", teamSchema);

export default Team;
