// APP/server/repositories/chatSession.repository.js

import ChatSession from "../models/chatSession.model.js";

export const findBySessionId = async (sessionId) => {
  return await ChatSession.findOne({ sessionId });
};

export const createSession = async (sessionData) => {
  return await ChatSession.create(sessionData);
};

export const updateSessionMessages = async (sessionId, messages, visitorInfo = {}) => {
  const updateData = {
    messages,
    "metadata.messageCount": messages.length,
    "metadata.lastActiveAt": new Date(),
  };

  if (visitorInfo && Object.keys(visitorInfo).length > 0) {
    updateData.visitorInfo = visitorInfo;
  }

  return await ChatSession.findOneAndUpdate(
    { sessionId },
    { $set: updateData },
    { new: true, upsert: true }
  );
};

export const listSessions = async ({ search, status, limit = 50, skip = 0 }) => {
  const query = {};

  if (status) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { sessionId: { $regex: search, $options: "i" } },
      { "visitorInfo.name": { $regex: search, $options: "i" } },
      { "visitorInfo.email": { $regex: search, $options: "i" } },
      { "messages.content": { $regex: search, $options: "i" } },
    ];
  }

  const [sessions, total] = await Promise.all([
    ChatSession.find(query).sort({ updatedAt: -1 }).skip(skip).limit(limit),
    ChatSession.countDocuments(query),
  ]);

  return { sessions, total };
};

export const deleteSession = async (sessionId) => {
  return await ChatSession.findOneAndDelete({ sessionId });
};

export const getChatAnalytics = async () => {
  const totalChats = await ChatSession.countDocuments();
  const leadCapturedChats = await ChatSession.countDocuments({ status: "lead_captured" });

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const dailyChats = await ChatSession.aggregate([
    { $match: { createdAt: { $gte: thirtyDaysAgo } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return {
    totalChats,
    leadCapturedChats,
    dailyChats,
  };
};
