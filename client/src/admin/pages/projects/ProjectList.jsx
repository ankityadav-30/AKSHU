// APP/client/src/admin/pages/projects/ProjectList.jsx

import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { HiCollection, HiPlus, HiPencil, HiTrash, HiCheck, HiArchive } from "react-icons/hi";
import api from "../../../services/api.js";
import { ROUTES, PROJECT_CATEGORIES, STATUSES } from "../../../utils/constants.js";
import PageHeader from "../../components/PageHeader.jsx";
import SearchInput from "../../components/SearchInput.jsx";
import FilterDropdown from "../../components/FilterDropdown.jsx";
import DataTable from "../../components/DataTable.jsx";
import Badge from "../../components/Badge.jsx";
import ConfirmModal from "../../components/ConfirmModal.jsx";
import { showSuccess, showError } from "../../components/Toast.jsx";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [selected, setSelected] = useState([]);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/projects");
            setProjects(data?.data?.projects || data?.data || []);
        } catch (err) {
            showError(err?.message || "Failed to load projects");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchProjects(); }, [fetchProjects]);

    const filtered = useMemo(() => {
        let result = projects;
        if (search) {
            const q = search.toLowerCase();
            result = result.filter((p) =>
                p.title?.toLowerCase().includes(q) ||
                p.slug?.toLowerCase().includes(q) ||
                p.technologies?.some((t) => t.toLowerCase().includes(q))
            );
        }
        if (statusFilter) result = result.filter((p) => p.status === statusFilter);
        if (categoryFilter) result = result.filter((p) => p.category === categoryFilter);
        return result;
    }, [projects, search, statusFilter, categoryFilter]);

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await api.delete(`/projects/${deleteTarget}`);
            showSuccess("Project deleted");
            setProjects((prev) => prev.filter((p) => p._id !== deleteTarget));
            setSelected((prev) => prev.filter((id) => id !== deleteTarget));
        } catch (err) {
            showError(err?.message || "Failed to delete project");
        } finally {
            setDeleting(false);
            setDeleteTarget(null);
        }
    };

    const handlePublish = async (id) => {
        try {
            await api.patch(`/projects/${id}/publish`);
            showSuccess("Project published");
            setProjects((prev) => prev.map((p) => p._id === id ? { ...p, status: "PUBLISHED" } : p));
        } catch (err) { showError(err?.message || "Failed to publish"); }
    };

    const handleArchive = async (id) => {
        try {
            await api.patch(`/projects/${id}/archive`);
            showSuccess("Project archived");
            setProjects((prev) => prev.map((p) => p._id === id ? { ...p, status: "ARCHIVED" } : p));
        } catch (err) { showError(err?.message || "Failed to archive"); }
    };

    const columns = [
        {
            key: "title", label: "Project", sortable: true,
            render: (row) => (
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                    {row.thumbnail ? (
                        <img src={row.thumbnail} alt="" style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", objectFit: "cover", flexShrink: 0 }} />
                    ) : (
                        <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary-light)", flexShrink: 0 }}>
                            <HiCollection size={18} />
                        </div>
                    )}
                    <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)", maxWidth: 220, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{row.title}</div>
                        <div style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)" }}>/{row.slug}</div>
                    </div>
                </div>
            ),
        },
        { key: "category", label: "Category", sortable: true, render: (row) => <span style={{ color: "var(--color-accent)" }}>{row.category || "WEB"}</span> },
        {
            key: "technologies", label: "Tech", render: (row) => (
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                    {(row.technologies || []).slice(0, 3).map((t) => (
                        <span key={t} className="admin-chip">{t}</span>
                    ))}
                    {(row.technologies || []).length > 3 && <span className="admin-chip">+{row.technologies.length - 3}</span>}
                </div>
            ),
        },
        { key: "featured", label: "Featured", render: (row) => row.featured ? <Badge status="FEATURED" /> : <span style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-xs)" }}>–</span> },
        { key: "status", label: "Status", sortable: true, render: (row) => <Badge status={row.status || "DRAFT"} /> },
        { key: "createdAt", label: "Date", sortable: true, render: (row) => <span style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-xs)" }}>{row.createdAt ? new Date(row.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "–"}</span> },
        {
            key: "actions", label: "Actions", width: "120px",
            render: (row) => (
                <div style={{ display: "flex", gap: "var(--space-1)" }}>
                    <button className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm" title="Edit" onClick={() => navigate(ROUTES.ADMIN_PROJECT_EDIT(row._id))}><HiPencil size={15} /></button>
                    {row.status !== "PUBLISHED" && <button className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm" title="Publish" onClick={() => handlePublish(row._id)}><HiCheck size={15} /></button>}
                    {row.status === "PUBLISHED" && <button className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm" title="Archive" onClick={() => handleArchive(row._id)}><HiArchive size={15} /></button>}
                    <button className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm" title="Delete" onClick={() => setDeleteTarget(row._id)} style={{ color: "var(--color-danger)" }}><HiTrash size={15} /></button>
                </div>
            ),
        },
    ];

    return (
        <div className="admin-page">
            <PageHeader title="Project Management" subtitle="Manage AKSHU portfolio items and case studies." actions={<button className="admin-btn admin-btn--primary" onClick={() => navigate(ROUTES.ADMIN_PROJECT_NEW)}><HiPlus size={16} /> New Project</button>} />
            <div style={{ display: "flex", gap: "var(--space-3)", marginBottom: "var(--space-4)", flexWrap: "wrap" }}>
                <SearchInput value={search} onChange={setSearch} placeholder="Search projects..." />
                <FilterDropdown label="Status" options={STATUSES.map((s) => ({ value: s, label: s }))} value={statusFilter} onChange={setStatusFilter} />
                <FilterDropdown label="Category" options={PROJECT_CATEGORIES.map((c) => ({ value: c, label: c }))} value={categoryFilter} onChange={setCategoryFilter} />
            </div>
            <DataTable columns={columns} data={filtered} loading={loading} selectable selected={selected} onSelect={setSelected} emptyIcon={<HiCollection size={48} />} emptyTitle="No projects yet" emptyMessage="Create your first project to get started." emptyAction={<button className="admin-btn admin-btn--primary" onClick={() => navigate(ROUTES.ADMIN_PROJECT_NEW)}><HiPlus size={16} /> Create Project</button>} bulkActions={<button className="admin-btn admin-btn--danger admin-btn--sm" onClick={async () => { for (const i of selected) { try { await api.delete(`/projects/${i}`); } catch {} } showSuccess("Deleted"); setSelected([]); fetchProjects(); }}><HiTrash size={14} /> Delete</button>} />
            <ConfirmModal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Project" message="Are you sure you want to delete this project? This action cannot be undone." confirmText="Delete" danger loading={deleting} />
        </div>
    );
};

export default ProjectList;
