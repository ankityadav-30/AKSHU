// APP/client/src/admin/pages/projects/ProjectList.jsx

import { useEffect, useState } from "react";
import { HiCollection, HiRefresh } from "react-icons/hi";
import api from "../../../services/api.js";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = () => {
        setLoading(true);
        api.get("/projects")
            .then((res) => setProjects(res.data?.data?.projects || res.data?.data || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="admin-page">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)", flexWrap: "wrap", gap: "var(--space-4)" }}>
                <div>
                    <h1 style={{ fontSize: "var(--font-size-2xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-1)" }}>
                        Project Management
                    </h1>
                    <p style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
                        Manage AKSHU portfolio items and case studies.
                    </p>
                </div>
                <button type="button" className="btn btn--outline" onClick={fetchProjects}>
                    <HiRefresh /> Refresh
                </button>
            </div>

            <div style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "var(--font-size-sm)" }}>
                        <thead>
                            <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid var(--color-border)" }}>
                                <th style={{ padding: "var(--space-4)", color: "var(--color-text-tertiary)", fontWeight: "bold" }}>Project Title</th>
                                <th style={{ padding: "var(--space-4)", color: "var(--color-text-tertiary)", fontWeight: "bold" }}>Category</th>
                                <th style={{ padding: "var(--space-4)", color: "var(--color-text-tertiary)", fontWeight: "bold" }}>Featured</th>
                                <th style={{ padding: "var(--space-4)", color: "var(--color-text-tertiary)", fontWeight: "bold" }}>Technologies</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} style={{ padding: "var(--space-8)", textAlign: "center", color: "var(--color-text-secondary)" }}>
                                        Loading projects...
                                    </td>
                                </tr>
                            ) : projects.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ padding: "var(--space-8)", textAlign: "center", color: "var(--color-text-secondary)" }}>
                                        <HiCollection size={32} style={{ opacity: 0.3, marginBottom: "var(--space-2)" }} />
                                        <p>No projects published yet.</p>
                                    </td>
                                </tr>
                            ) : (
                                projects.map((p) => (
                                    <tr key={p._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                                        <td style={{ padding: "var(--space-4)", fontWeight: "bold", color: "var(--color-text-primary)" }}>{p.title}</td>
                                        <td style={{ padding: "var(--space-4)", color: "var(--color-accent)" }}>{p.category || "WEB"}</td>
                                        <td style={{ padding: "var(--space-4)" }}>
                                            {p.featured ? (
                                                <span style={{ padding: "2px 8px", background: "rgba(34,211,238,0.1)", borderRadius: "var(--radius-sm)", color: "var(--color-accent)", fontSize: "var(--font-size-xs)" }}>
                                                    FEATURED
                                                </span>
                                            ) : (
                                                <span style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-xs)" }}>Standard</span>
                                            )}
                                        </td>
                                        <td style={{ padding: "var(--space-4)", color: "var(--color-text-secondary)", fontSize: "var(--font-size-xs)" }}>
                                            {p.technologies?.slice(0, 3).join(", ") || "–"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProjectList;
