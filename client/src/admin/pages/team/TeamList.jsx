// APP/client/src/admin/pages/team/TeamList.jsx

import { useEffect, useState } from "react";
import { HiUsers, HiRefresh } from "react-icons/hi";
import api from "../../../services/api.js";

const TeamList = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTeam = () => {
        setLoading(true);
        api.get("/team")
            .then((res) => setTeam(res.data?.data?.members || res.data?.data || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    return (
        <div className="admin-page">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)", flexWrap: "wrap", gap: "var(--space-4)" }}>
                <div>
                    <h1 style={{ fontSize: "var(--font-size-2xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-1)" }}>
                        Team Management
                    </h1>
                    <p style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
                        Manage AKSHU team members and roles.
                    </p>
                </div>
                <button type="button" className="btn btn--outline" onClick={fetchTeam}>
                    <HiRefresh /> Refresh
                </button>
            </div>

            <div style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "var(--font-size-sm)" }}>
                        <thead>
                            <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid var(--color-border)" }}>
                                <th style={{ padding: "var(--space-4)", color: "var(--color-text-tertiary)", fontWeight: "bold" }}>Member Name</th>
                                <th style={{ padding: "var(--space-4)", color: "var(--color-text-tertiary)", fontWeight: "bold" }}>Designation</th>
                                <th style={{ padding: "var(--space-4)", color: "var(--color-text-tertiary)", fontWeight: "bold" }}>Department</th>
                                <th style={{ padding: "var(--space-4)", color: "var(--color-text-tertiary)", fontWeight: "bold" }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} style={{ padding: "var(--space-8)", textAlign: "center", color: "var(--color-text-secondary)" }}>
                                        Loading team members...
                                    </td>
                                </tr>
                            ) : team.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ padding: "var(--space-8)", textAlign: "center", color: "var(--color-text-secondary)" }}>
                                        <HiUsers size={32} style={{ opacity: 0.3, marginBottom: "var(--space-2)" }} />
                                        <p>No team members added yet.</p>
                                    </td>
                                </tr>
                            ) : (
                                team.map((m) => {
                                    const fullName = m.name || `${m.firstName || ""} ${m.lastName || ""}`.trim() || "Member";
                                    return (
                                        <tr key={m._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                                            <td style={{ padding: "var(--space-4)", fontWeight: "bold", color: "var(--color-text-primary)" }}>{fullName}</td>
                                            <td style={{ padding: "var(--space-4)", color: "var(--color-primary-light)" }}>{m.designation || m.role || "Engineer"}</td>
                                            <td style={{ padding: "var(--space-4)", color: "var(--color-text-secondary)" }}>{m.department || "Engineering"}</td>
                                            <td style={{ padding: "var(--space-4)" }}>
                                                <span style={{ padding: "2px 8px", background: "rgba(16,185,129,0.1)", borderRadius: "var(--radius-sm)", color: "var(--color-success)", fontSize: "var(--font-size-xs)" }}>
                                                    ACTIVE
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeamList;
