import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false,
        },

        avatar: {
            type: String,
            default: "",
        },

        role: {
            type: String,
            enum: [
                "SUPER_ADMIN",
                "ADMIN",
                "EDITOR",
                "HR",
                "TEAM_MEMBER",
            ],
            default: "TEAM_MEMBER",
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        lastLogin: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (
    password
) {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken =
function () {
    return jwt.sign(
        {
            id: this._id,
            role: this.role,
        },
        env.jwt.secret,
        {
            expiresIn: env.jwt.expiresIn,
        }
    );
};

const User = mongoose.model(
    "User",
    userSchema
);

export default User;