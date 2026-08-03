// APP/server/controllers/chat.controller.js

import { v4 as uuidv4 } from "uuid";
import {
  findBySessionId,
  updateSessionMessages,
  listSessions,
  deleteSession,
  getChatAnalytics,
} from "../repositories/chatSession.repository.js";
import { generateChatResponse } from "../services/aiChat.service.js";

/**
 * Send a message to AKSHU AI Chatbot
 * POST /api/v1/chat/message
 */
export const postChatMessage = async (req, res) => {
  try {
    const { message, sessionId: reqSessionId, visitorInfo } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message content cannot be empty",
      });
    }

    const sessionId = reqSessionId || uuidv4();
    let session = await findBySessionId(sessionId);

    const history = session ? session.messages : [];

    // User message object
    const userMsg = {
      sender: "user",
      content: message.trim(),
      timestamp: new Date(),
    };

    const updatedHistory = [...history, userMsg];

    // Generate AI response
    const { reply, isLeadIntent, source } = await generateChatResponse({
      message: message.trim(),
      conversationHistory: history,
      visitorInfo: visitorInfo || (session ? session.visitorInfo : {}),
    });

    // Assistant message object
    const assistantMsg = {
      sender: "assistant",
      content: reply,
      timestamp: new Date(),
    };

    const finalHistory = [...updatedHistory, assistantMsg];

    // Update database
    await updateSessionMessages(sessionId, finalHistory, visitorInfo);

    return res.status(200).json({
      success: true,
      data: {
        sessionId,
        reply,
        isLeadIntent,
        source,
        timestamp: assistantMsg.timestamp,
      },
    });
  } catch (error) {
    console.error("Error in postChatMessage:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error processing chat message",
    });
  }
};

/**
 * Fetch chat history for a session
 * GET /api/v1/chat/history/:sessionId
 */
export const getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await findBySessionId(sessionId);

    return res.status(200).json({
      success: true,
      data: {
        sessionId,
        messages: session ? session.messages : [],
        visitorInfo: session ? session.visitorInfo : {},
        status: session ? session.status : "active",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving chat history",
    });
  }
};

/**
 * Admin: List all chat sessions
 * GET /api/v1/chat/sessions
 */
export const getAdminSessions = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const { sessions, total } = await listSessions({
      search,
      status,
      limit: parseInt(limit, 10),
      skip,
    });

    return res.status(200).json({
      success: true,
      data: {
        sessions,
        total,
        page: parseInt(page, 10),
        totalPages: Math.ceil(total / parseInt(limit, 10)),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching admin chat sessions",
    });
  }
};

/**
 * Admin: Delete a chat session
 * DELETE /api/v1/chat/sessions/:id
 */
export const removeAdminSession = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSession(id);
    return res.status(200).json({
      success: true,
      message: "Chat session deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting chat session",
    });
  }
};

/**
 * Admin: Get chatbot analytics
 * GET /api/v1/chat/analytics
 */
export const getAdminAnalytics = async (req, res) => {
  try {
    const analytics = await getChatAnalytics();
    return res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching chat analytics",
    });
  }
};
