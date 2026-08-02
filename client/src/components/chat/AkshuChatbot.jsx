// APP/client/src/components/chat/AkshuChatbot.jsx

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    HiChatBubbleLeftRight,
    HiPaperAirplane as HiSend,
    HiXMark,
    HiArrowsPointingOut,
    HiSparkles as HiSpark,
} from "react-icons/hi2";
import api from "../../services/api.js";
import { showSuccess, showError } from "../../admin/components/Toast.jsx";
import "./AkshuChatbot.css";

const STARTER_QUESTIONS = [
    "Tell me about AKSHU",
    "What services do you provide?",
    "Show latest projects",
    "I need an ecommerce website",
    "I want an AI chatbot",
    "Who are your developers?",
    "Contact AKSHU",
];

const AkshuChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [sessionId, setSessionId] = useState("");
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showLeadForm, setShowLeadForm] = useState(false);

    // Lead Form State
    const [leadName, setLeadName] = useState("");
    const [leadEmail, setLeadEmail] = useState("");
    const [leadPhone, setLeadPhone] = useState("");
    const [leadProjectType, setLeadProjectType] = useState("Custom Web App");
    const [leadBudget, setLeadBudget] = useState("$5,000 - $15,000");
    const [leadSubmitting, setLeadSubmitting] = useState(false);

    const messagesEndRef = useRef(null);

    // Initialize or load session ID
    useEffect(() => {
        let storedId = localStorage.getItem("akshu_chat_session_id");
        if (!storedId) {
            storedId = "session_" + Math.random().toString(36).substring(2, 11);
            localStorage.setItem("akshu_chat_session_id", storedId);
        }
        setSessionId(storedId);

        // Welcome message initialization
        setMessages([
            {
                sender: "assistant",
                content: `### Hello! I am AKSHU AI 👋\n\nI am the official AI assistant of **AKSHU Technologies**. How can I assist you with your software development requirements today?`,
                timestamp: new Date(),
            },
        ]);
    }, []);

    // Auto scroll to bottom
    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping, isOpen]);

    const handleSendMessage = async (customText = "") => {
        const textToSend = customText || input;
        if (!textToSend.trim()) return;

        const userMsg = {
            sender: "user",
            content: textToSend.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        if (!customText) setInput("");
        setIsTyping(true);

        try {
            const res = await api.post("/chat/message", {
                message: textToSend.trim(),
                sessionId,
            });

            const data = res.data?.data;
            const assistantMsg = {
                sender: "assistant",
                content: data?.reply || "How else can I assist you?",
                timestamp: new Date(data?.timestamp || Date.now()),
            };

            setMessages((prev) => [...prev, assistantMsg]);

            if (data?.isLeadIntent) {
                setShowLeadForm(true);
            }
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    content: "I am having trouble connecting right now. Please feel free to reach out to our team via our [Contact Page](/contact)!",
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        if (!leadName || !leadEmail) {
            showError("Please enter your name and email.");
            return;
        }
        setLeadSubmitting(true);
        try {
            await api.post("/leads", {
                name: leadName,
                email: leadEmail,
                phone: leadPhone,
                projectType: leadProjectType,
                budget: leadBudget,
                sessionId,
                description: `Captured via AKSHU AI Chatbot for ${leadProjectType}`,
            });

            showSuccess("Project details submitted successfully!");
            setShowLeadForm(false);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    content: `### 🎉 Requirement Received!\n\nThank you **${leadName}**! Our software architecture team has received your project details for **${leadProjectType}**. We will contact you at **${leadEmail}** within 24 hours with a custom project proposal.`,
                    timestamp: new Date(),
                },
            ]);
        } catch (err) {
            showError("Failed to submit project estimation request.");
        } finally {
            setLeadSubmitting(false);
        }
    };

    return (
        <div className="akshu-chat-widget">
            {/* FLOATING TRIGGER BUTTON */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        type="button"
                        className="akshu-chat-trigger"
                        onClick={() => setIsOpen(true)}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        aria-label="Open AKSHU AI Chatbot"
                    >
                        <HiChatBubbleLeftRight />
                        <span className="akshu-chat-badge" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* CHAT WINDOW MODAL */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`akshu-chat-window ${isExpanded ? "akshu-chat-window--expanded" : ""}`}
                        initial={{ y: 50, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 220 }}
                    >
                        {/* WINDOW HEADER */}
                        <div className="akshu-chat-header">
                            <div className="akshu-chat-header__info">
                                <div className="akshu-chat-avatar-ring">
                                    <div className="akshu-chat-avatar">AI</div>
                                </div>
                                <div className="akshu-chat-header__title-box">
                                    <span className="akshu-chat-header__title">
                                        AKSHU AI <HiSpark className="text-amber-400" />
                                    </span>
                                    <span className="akshu-chat-header__status">
                                        <span className="akshu-chat-status-dot" /> Live Company Assistant
                                    </span>
                                </div>
                            </div>
                            <div className="akshu-chat-header__actions">
                                <button
                                    type="button"
                                    className="akshu-chat-header-btn"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    title={isExpanded ? "Restore Size" : "Expand Window"}
                                >
                                    <HiArrowsPointingOut />
                                </button>
                                <button
                                    type="button"
                                    className="akshu-chat-header-btn"
                                    onClick={() => setIsOpen(false)}
                                    title="Close Chat"
                                >
                                    <HiXMark />
                                </button>
                            </div>
                        </div>

                        {/* MESSAGES BODY */}
                        <div className="akshu-chat-body">
                            {messages.map((msg, index) => (
                                <div key={index} className={`akshu-chat-msg akshu-chat-msg--${msg.sender}`}>
                                    <div className="akshu-chat-bubble">
                                        {formatChatMessage(msg.content)}
                                    </div>
                                    <span className="akshu-chat-time">
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                </div>
                            ))}

                            {/* STARTER QUESTION CHIPS (When only initial message exists) */}
                            {messages.length === 1 && (
                                <div className="akshu-chat-starters">
                                    {STARTER_QUESTIONS.map((q) => (
                                        <button
                                            key={q}
                                            type="button"
                                            className="akshu-chat-chip"
                                            onClick={() => handleSendMessage(q)}
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* TYPING INDICATOR */}
                            {isTyping && (
                                <div className="akshu-chat-msg akshu-chat-msg--assistant">
                                    <div className="akshu-chat-typing">
                                        <div className="akshu-chat-typing-dot" />
                                        <div className="akshu-chat-typing-dot" />
                                        <div className="akshu-chat-typing-dot" />
                                    </div>
                                </div>
                            )}

                            {/* INLINE LEAD CAPTURE FORM */}
                            {showLeadForm && (
                                <div className="akshu-lead-card">
                                    <div className="akshu-lead-title">
                                        <HiSpark className="text-cyan-400" /> Start Your Project Quote
                                    </div>
                                    <form onSubmit={handleLeadSubmit} className="akshu-lead-form">
                                        <input
                                            type="text"
                                            placeholder="Your Full Name *"
                                            value={leadName}
                                            onChange={(e) => setLeadName(e.target.value)}
                                            className="akshu-lead-input"
                                            required
                                        />
                                        <input
                                            type="email"
                                            placeholder="Your Email Address *"
                                            value={leadEmail}
                                            onChange={(e) => setLeadEmail(e.target.value)}
                                            className="akshu-lead-input"
                                            required
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number (Optional)"
                                            value={leadPhone}
                                            onChange={(e) => setLeadPhone(e.target.value)}
                                            className="akshu-lead-input"
                                        />
                                        <select
                                            value={leadProjectType}
                                            onChange={(e) => setLeadProjectType(e.target.value)}
                                            className="akshu-lead-input"
                                            style={{ color: "#ffffff", background: "#0f172a" }}
                                        >
                                            <option value="Custom Web App">Custom Web Application</option>
                                            <option value="Mobile App (iOS/Android)">Mobile Application</option>
                                            <option value="AI Chatbot & Automation">AI Chatbot & Automation</option>
                                            <option value="E-Commerce Platform">E-Commerce Platform</option>
                                            <option value="Healthcare / Hospital ERP">Healthcare / Hospital ERP</option>
                                        </select>
                                        <button type="submit" className="akshu-lead-submit" disabled={leadSubmitting}>
                                            {leadSubmitting ? "Submitting..." : "Request Proposal →"}
                                        </button>
                                    </form>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* INPUT FOOTER */}
                        <div className="akshu-chat-footer">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendMessage();
                                }}
                                className="akshu-chat-input-row"
                            >
                                <input
                                    type="text"
                                    placeholder="Ask AKSHU AI anything..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="akshu-chat-input"
                                    disabled={isTyping}
                                />
                                <button
                                    type="submit"
                                    className="akshu-chat-send-btn"
                                    disabled={!input.trim() || isTyping}
                                    title="Send Message"
                                >
                                    <HiSend />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Helper function to format basic Markdown in assistant message text
function formatChatMessage(text = "") {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
        if (line.startsWith("### ")) {
            return <h3 key={idx}>{line.replace("### ", "")}</h3>;
        }
        if (line.startsWith("#### ")) {
            return <h4 key={idx}>{line.replace("#### ", "")}</h4>;
        }
        if (line.startsWith("- ")) {
            return <li key={idx}>{line.replace("- ", "")}</li>;
        }
        if (line.trim() === "") {
            return <br key={idx} />;
        }
        return <p key={idx}>{parseLinksAndBold(line)}</p>;
    });
}

// Parses bold text (**text**) and Markdown links ([text](url))
function parseLinksAndBold(text = "") {
    // Simple inline link parsing
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
            return (
                <a key={i} href={linkMatch[2]}>
                    {linkMatch[1]}
                </a>
            );
        }
        return part;
    });
}

export default AkshuChatbot;
