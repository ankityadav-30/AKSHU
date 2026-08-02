// APP/client/src/admin/pages/blogs/BlogList.jsx

import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { HiDocumentText, HiPlus, HiPencil, HiTrash, HiDuplicate, HiCheck, HiArchive } from "react-icons/hi";
import api from "../../../services/api.js";
import { ROUTES, BLOG_CATEGORIES, STATUSES } from "../../../utils/constants.js";
import PageHeader from "../../components/PageHeader.jsx";
import SearchInput from "../../components/SearchInput.jsx";
import FilterDropdown from "../../components/FilterDropdown.jsx";
import DataTable from "../../components/DataTable.jsx";
import Badge from "../../components/Badge.jsx";
import ConfirmModal from "../../components/ConfirmModal.jsx";
import { showSuccess, showError } from "../../components/Toast.jsx";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [selected, setSelected] = useState([]);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    const fetchBlogs = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/blogs");
            setBlogs(data?.data?.blogs || data?.data || []);
        } catch (err) {
            showError(err?.message || "Failed to load blogs");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

    // Client-side filtering
    const filtered = useMemo(() => {
        let result = blogs;
        if (search) {
            const q = search.toLowerCase();
            result = result.filter((b) =>
                b.title?.toLowerCase().includes(q) ||
                b.slug?.toLowerCase().includes(q) ||
                b.category?.toLowerCase().includes(q)
            );
        }
        if (statusFilter) {
            result = result.filter((b) => b.status === statusFilter);
        }
        if (categoryFilter) {
            result = result.filter((b) => b.category === categoryFilter);
        }
        return result;
    }, [blogs, search, statusFilter, categoryFilter]);

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await api.delete(`/blogs/${deleteTarget}`);
            showSuccess("Blog deleted successfully");
            setBlogs((prev) => prev.filter((b) => b._id !== deleteTarget));
            setSelected((prev) => prev.filter((id) => id !== deleteTarget));
        } catch (err) {
            showError(err?.message || "Failed to delete blog");
        } finally {
            setDeleting(false);
            setDeleteTarget(null);
        }
    };

    const handlePublish = async (id) => {
        try {
            await api.patch(`/blogs/${id}/publish`);
            showSuccess("Blog published");
            setBlogs((prev) => prev.map((b) => b._id === id ? { ...b, status: "PUBLISHED" } : b));
        } catch (err) {
            showError(err?.message || "Failed to publish blog");
        }
    };

    const handleArchive = async (id) => {
        try {
            await api.patch(`/blogs/${id}/archive`);
            showSuccess("Blog archived");
            setBlogs((prev) => prev.map((b) => b._id === id ? { ...b, status: "ARCHIVED" } : b));
        } catch (err) {
            showError(err?.message || "Failed to archive blog");
        }
    };

    const handleBulkDelete = async () => {
        for (const id of selected) {
            try { await api.delete(`/blogs/${id}`); } catch { /* skip errors */ }
        }
        showSuccess(`${selected.length} blogs deleted`);
        setSelected([]);
        fetchBlogs();
    };

    const handleBulkPublish = async () => {
        for (const id of selected) {
            try { await api.patch(`/blogs/${id}/publish`); } catch { /* skip */ }
        }
        showSuccess(`${selected.length} blogs published`);
        setSelected([]);
        fetchBlogs();
    };

    const columns = [
        {
            key: "title",
            label: "Title",
            sortable: true,
            render: (row) => (
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                    {row.coverImage?.url ? (
                        <img
                            src={row.coverImage.url}
                            alt=""
                            style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", objectFit: "cover", flexShrink: 0 }}
                        />
                    ) : (
                        <div style={{
                            width: 40, height: 40, borderRadius: "var(--radius-md)",
                            background: "rgba(99, 102, 241, 0.1)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "var(--color-primary-light)", flexShrink: 0,
                        }}>
                            <HiDocumentText size={18} />
                        </div>
                    )}
                    <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 240 }}>
                            {row.title}
                        </div>
                        <div style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)" }}>
                            /{row.slug}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: "category",
            label: "Category",
            sortable: true,
            render: (row) => (
                <span style={{ color: "var(--color-accent)", fontSize: "var(--font-size-sm)" }}>
                    {row.category || "General"}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            sortable: true,
            render: (row) => <Badge status={row.status || "DRAFT"} />,
        },
        {
            key: "createdAt",
            label: "Date",
            sortable: true,
            render: (row) => (
                <span style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-xs)" }}>
                    {row.createdAt ? new Date(row.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "–"}
                </span>
            ),
        },
        {
            key: "actions",
            label: "Actions",
            width: "140px",
            render: (row) => (
                <div style={{ display: "flex", gap: "var(--space-1)" }}>
                    <button
                        className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm"
                        title="Edit"
                        onClick={() => navigate(ROUTES.ADMIN_BLOG_EDIT(row._id))}
                    >
                        <HiPencil size={15} />
                    </button>
                    {row.status !== "PUBLISHED" && (
                        <button
                            className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm"
                            title="Publish"
                            onClick={() => handlePublish(row._id)}
                        >
                            <HiCheck size={15} />
                        </button>
                    )}
                    {row.status === "PUBLISHED" && (
                        <button
                            className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm"
                            title="Archive"
                            onClick={() => handleArchive(row._id)}
                        >
                            <HiArchive size={15} />
                        </button>
                    )}
                    <button
                        className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm"
                        title="Delete"
                        onClick={() => setDeleteTarget(row._id)}
                        style={{ color: "var(--color-danger)" }}
                    >
                        <HiTrash size={15} />
                    </button>
                </div>
            ),
        },
    ];

    const statusOptions = STATUSES.map((s) => ({ value: s, label: s }));
    const categoryOptions = BLOG_CATEGORIES.map((c) => ({ value: c, label: c }));

    return (
        <div className="admin-page">
            <PageHeader
                title="Blog Management"
                subtitle="Manage articles, technical insights, and published posts."
                actions={
                    <button className="admin-btn admin-btn--primary" onClick={() => navigate(ROUTES.ADMIN_BLOG_NEW)}>
                        <HiPlus size={16} /> New Blog
                    </button>
                }
            />

            {/* Toolbar */}
            <div style={{ display: "flex", gap: "var(--space-3)", marginBottom: "var(--space-4)", flexWrap: "wrap" }}>
                <SearchInput value={search} onChange={setSearch} placeholder="Search blogs..." />
                <FilterDropdown label="Status" options={statusOptions} value={statusFilter} onChange={setStatusFilter} />
                <FilterDropdown label="Category" options={categoryOptions} value={categoryFilter} onChange={setCategoryFilter} />
            </div>

            <DataTable
                columns={columns}
                data={filtered}
                loading={loading}
                selectable
                selected={selected}
                onSelect={setSelected}
                emptyIcon={<HiDocumentText size={48} />}
                emptyTitle="No blog posts yet"
                emptyMessage="Create your first blog post to get started."
                emptyAction={
                    <button className="admin-btn admin-btn--primary" onClick={() => navigate(ROUTES.ADMIN_BLOG_NEW)}>
                        <HiPlus size={16} /> Create Blog
                    </button>
                }
                bulkActions={
                    <>
                        <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={handleBulkPublish}>
                            <HiCheck size={14} /> Publish
                        </button>
                        <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={handleBulkDelete}>
                            <HiTrash size={14} /> Delete
                        </button>
                    </>
                }
            />

            <ConfirmModal
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                title="Delete Blog"
                message="Are you sure you want to delete this blog post? This action cannot be undone."
                confirmText="Delete"
                danger
                loading={deleting}
            />
        </div>
    );
};

export default BlogList;
