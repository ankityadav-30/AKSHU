// APP/client/src/admin/pages/chat/ChatManagement.jsx

import { useEffect, useState } from "react";
import { HiChatAlt2, HiTrash, HiEye, HiSparkles, HiSearch, HiX } from "react-icons/hi";
import api from "../../../services/api.js";
import { showSuccess, showError } from "../../components/Toast.jsx";
import DataTable from "../../components/DataTable.jsx";
import ConfirmModal from "../../components/ConfirmModal.jsx";
import "./ChatManagement.css";

const ChatManagement = () => {
    const [sessions, setSessions] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedSession, setSelectedSession] = useState(null);
    const [deleteTargetId, setDeleteTargetId] = useState(null);

    const fetchSessions = () => {
        setLoading(true);
        api.get("/chat/sessions", { params: { search } })
            .then((res) => {
                setSessions(res.data?.data?.sessions || []);
            })
            .catch(() => showError("Failed to load chat sessions"))
            .finally(() => setLoading(false));
    };

    const fetchAnalytics = () => {
        api.get("/chat/analytics")
            .then((res) => setAnalytics(res.data?.data || null))
            .catch(() => {});
    };

    useEffect(() => {
        fetchSessions();
        fetchAnalytics();
    }, []);

    const handleDelete = async () => {
        if (!deleteTargetId) return;
        try {
            await api.delete(`/chat/sessions/${deleteTargetId}`);
            showSuccess("Chat session deleted");
            setDeleteTargetId(null);
            fetchSessions();
        } catch (err) {
            showError("Failed to delete chat session");
        }
    };

    const columns = [
        {
            key: "sessionId",
            label: "Session ID",
            render: (row) => <code style={{ fontSize: "0.8rem", color: "#a5b4fc" }}>{row.sessionId.substring(0, 14)}...</code>,
        },
        {
            key: "visitorInfo",
            label: "Visitor",
            render: (row) => (
                <div>
                    <div style={{ fontWeight: 700, color: "#ffffff" }}>{row.visitorInfo?.name || "Anonymous Visitor"}</div>
                    <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>{row.visitorInfo?.email || "No email provided"}</div>
                </div>
            ),
        },
        {
            key: "messageCount",
            label: "Messages",
            render: (row) => <span>{row.messages?.length || 0} msgs</span>,
        },
        {
            key: "status",
            label: "Status",
            render: (row) => (
                <span className={`admin-badge ${row.status === "lead_captured" ? "admin-badge--success" : "admin-badge--info"}`}>
                    {row.status}
                </span>
            ),
        },
        {
            key: "createdAt",
            label: "Started At",
            render: (row) => <span>{new Date(row.createdAt).toLocaleDateString()}</span>,
        },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <div style={{ display: "flex", gap: 8 }}>
                    <button
                        type="button"
                        className="btn btn--outline btn--sm"
                        onClick={() => setSelectedSession(row)}
                        title="View Conversation"
                    >
                        <HiEye />
                    </button>
                    <button
                        type="button"
                        className="btn btn--danger btn--sm"
                        onClick={() => setDeleteTargetId(row.sessionId)}
                        title="Delete Session"
                    >
                        <HiTrash />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="admin-chat-page">
            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">
                        <HiChatAlt2 style={{ verticalAlign: "middle", marginRight: 8, color: "var(--color-accent)" }} />
                        AKSHU AI Chat Conversations
                    </h1>
                    <p className="admin-page-desc">Monitor live visitor AI interactions, query topics, and lead generation logs.</p>
                </div>
            </div>

            {/* METRICS CARDS */}
            {analytics && (
                <div className="chat-metrics-grid">
                    <div className="chat-metric-card">
                        <div className="chat-metric-icon">
                            <HiChatAlt2 />
                        </div>
                        <div className="chat-metric-info">
                            <span className="chat-metric-val">{analytics.totalChats || 0}</span>
                            <span className="chat-metric-lbl">Total Conversations</span>
                        </div>
                    </div>

                    <div className="chat-metric-card">
                        <div className="chat-metric-icon" style={{ color: "#34d399", background: "rgba(52,211,153,0.12)" }}>
                            <HiSparkles />
                        </div>
                        <div className="chat-metric-info">
                            <span className="chat-metric-val">{analytics.leadCapturedChats || 0}</span>
                            <span className="chat-metric-lbl">Leads Captured</span>
                        </div>
                    </div>
                </div>
            )}

            {/* SEARCH & DATATABLE */}
            <div className="admin-card" style={{ padding: 24, marginTop: 24 }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 20, maxWidth: 400 }}>
                    <input
                        type="text"
                        placeholder="Search conversations by email, text, or ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="admin-input"
                    />
                    <button type="button" className="btn btn--primary" onClick={fetchSessions}>
                        <HiSearch />
                    </button>
                </div>

                <DataTable columns={columns} data={sessions} loading={loading} emptyMessage="No chat sessions found." />
            </div>

            {/* VIEW DIALOG MODAL */}
            {selectedSession && (
                <div className="chat-dialog-modal">
                    <div className="chat-dialog-card">
                        <div className="chat-dialog-header">
                            <div>
                                <h3 style={{ margin: 0, color: "#ffffff" }}>
                                    Conversation Transcript ({selectedSession.sessionId.substring(0, 10)})
                                </h3>
                                <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                                    Visitor: {selectedSession.visitorInfo?.email || "Anonymous"}
                                </span>
                            </div>
                            <button
                                type="button"
                                className="btn btn--outline btn--sm"
                                onClick={() => setSelectedSession(null)}
                            >
                                <HiX />
                            </button>
                        </div>

                        <div className="chat-dialog-body">
                            {selectedSession.messages?.map((m, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                                        maxWidth: "85%",
                                        padding: "10px 16px",
                                        borderRadius: 14,
                                        background: m.sender === "user" ? "var(--color-primary)" : "rgba(255,255,255,0.06)",
                                        color: "#ffffff",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    <div style={{ fontSize: "0.7rem", color: "#94a3b8", marginBottom: 2 }}>{m.sender.toUpperCase()}</div>
                                    <div>{m.content}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* CONFIRM DELETE MODAL */}
            <ConfirmModal
                isOpen={!!deleteTargetId}
                title="Delete Chat Session"
                message="Are you sure you want to delete this chat session log? This action cannot be undone."
                onConfirm={handleDelete}
                onCancel={() => setDeleteTargetId(null)}
            />
        </div>
    );
};

export default ChatManagement;
