// APP/client/src/admin/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { HiCollection, HiDocumentText, HiUsers, HiMail } from "react-icons/hi";
import api from "../../services/api.js";

const STAT_CARDS = [
    { key: "projects", label: "Projects", icon: <HiCollection size={24} />, color: "#6366F1" },
    { key: "blogs", label: "Blog Posts", icon: <HiDocumentText size={24} />, color: "#8B5CF6" },
    { key: "team", label: "Team Members", icon: <HiUsers size={24} />, color: "#22D3EE" },
    { key: "contacts", label: "Messages", icon: <HiMail size={24} />, color: "#10B981" },
];

const Dashboard = () => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        api.get("/dashboard/stats")
            .then((res) => setStats(res.data?.data || {}))
            .catch(() => {});
    }, []);

    return (
        <div>
            <h1 style={{ fontSize: "var(--font-size-2xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-6)" }}>
                Dashboard
            </h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-5)" }}>
                {STAT_CARDS.map((card) => (
                    <div key={card.key} style={{
                        padding: "var(--space-6)",
                        background: "var(--color-bg-surface)",
                        border: "1px solid rgba(99,102,241,0.08)",
                        borderRadius: "var(--radius-lg)",
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-3)" }}>
                            <span style={{ color: card.color }}>{card.icon}</span>
                        </div>
                        <div style={{ fontSize: "var(--font-size-3xl)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)" }}>
                            {stats[card.key] ?? "–"}
                        </div>
                        <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)", marginTop: "var(--space-1)" }}>
                            {card.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
