// APP/server/models/lead.model.js

import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lead name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Lead email is required"],
      trim: true,
      lowercase: true,
      index: true,
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
    projectType: {
      type: String,
      default: "Other",
      trim: true,
    },
    budget: {
      type: String,
      default: "Not Specified",
    },
    timeline: {
      type: String,
      default: "Flexible",
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    source: {
      type: String,
      default: "AKSHU AI Chatbot",
    },
    sessionId: {
      type: String,
      default: "",
      index: true,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "in_discussion", "closed_won", "closed_lost"],
      default: "new",
      index: true,
    },
    notes: [
      {
        content: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

leadSchema.index({ createdAt: -1 });

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
