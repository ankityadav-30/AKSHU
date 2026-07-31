// APP/client/src/admin/pages/blogs/BlogList.jsx

import { useEffect, useState } from "react";
import { HiDocumentText, HiRefresh } from "react-icons/hi";
import api from "../../../services/api.js";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = () => {
        setLoading(true);
        api.get("/blogs")
            .then((res) => setBlogs(res.data?.data?.blogs || res.data?.data || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="admin-page">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)", flexWrap: "wrap", gap: "var(--space-4)" }}>
                <div>
                    <h1 style={{ fontSize: "var(--font-size-2xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-1)" }}>
                        Blog Management
                    </h1>
                    <p style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
                        Manage articles, technical insights, and published posts.
                    </p>
                </div>
                <button type="button" className="btn btn--outline" onClick={fetchBlogs}>
                    <HiRefresh /> Refresh
                </button>
            </div>

            <div style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "var(--font-size-sm)" }}>
                        <thead>
                            <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid var(--color-border)" }}>
                                <th style={{ padding: "var(--space-4)", color: "var(--color-text-tertiary)", fontWeight: "bold" }}>Article Title</th>
                                <th style={{ padding: "var(--space-4)", color: "var(--color-text-tertiary)", fontWeight: "bold" }}>Category</th>
                                <th style={{ padding: "var(--space-4)", color: "var(--color-text-tertiary)", fontWeight: "bold" }}>Status</th>
                                <th style={{ padding: "var(--space-4)", color: "var(--color-text-tertiary)", fontWeight: "bold" }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} style={{ padding: "var(--space-8)", textAlign: "center", color: "var(--color-text-secondary)" }}>
                                        Loading articles...
                                    </td>
                                </tr>
                            ) : blogs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ padding: "var(--space-8)", textAlign: "center", color: "var(--color-text-secondary)" }}>
                                        <HiDocumentText size={32} style={{ opacity: 0.3, marginBottom: "var(--space-2)" }} />
                                        <p>No blog posts published yet.</p>
                                    </td>
                                </tr>
                            ) : (
                                blogs.map((blog) => (
                                    <tr key={blog._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                                        <td style={{ padding: "var(--space-4)", fontWeight: "bold", color: "var(--color-text-primary)" }}>{blog.title}</td>
                                        <td style={{ padding: "var(--space-4)", color: "var(--color-accent)" }}>{blog.category || "General"}</td>
                                        <td style={{ padding: "var(--space-4)" }}>
                                            <span style={{ padding: "2px 8px", background: "rgba(16,185,129,0.1)", borderRadius: "var(--radius-sm)", color: "var(--color-success)", fontSize: "var(--font-size-xs)" }}>
                                                {blog.status || "PUBLISHED"}
                                            </span>
                                        </td>
                                        <td style={{ padding: "var(--space-4)", color: "var(--color-text-tertiary)", fontSize: "var(--font-size-xs)" }}>
                                            {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "Recent"}
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

export default BlogList;
