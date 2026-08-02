// APP/server/models/chatSession.model.js

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      enum: ["user", "assistant", "system"],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  { _id: false }
);

const chatSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    messages: [messageSchema],
    visitorInfo: {
      name: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      company: { type: String, default: "" },
    },
    status: {
      type: String,
      enum: ["active", "completed", "lead_captured"],
      default: "active",
      index: true,
    },
    metadata: {
      ip: { type: String, default: "" },
      userAgent: { type: String, default: "" },
      messageCount: { type: Number, default: 0 },
      lastActiveAt: { type: Date, default: Date.now },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for analytical search
chatSessionSchema.index({ createdAt: -1 });
chatSessionSchema.index({ "visitorInfo.email": 1 });

const ChatSession = mongoose.model("ChatSession", chatSessionSchema);

export default ChatSession;
