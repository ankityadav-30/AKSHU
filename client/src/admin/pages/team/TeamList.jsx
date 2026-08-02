// APP/client/src/admin/pages/team/TeamList.jsx

import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { HiUsers, HiPlus, HiPencil, HiTrash, HiCheck, HiBan } from "react-icons/hi";
import api from "../../../services/api.js";
import { ROUTES } from "../../../utils/constants.js";
import PageHeader from "../../components/PageHeader.jsx";
import SearchInput from "../../components/SearchInput.jsx";
import DataTable from "../../components/DataTable.jsx";
import Badge from "../../components/Badge.jsx";
import ConfirmModal from "../../components/ConfirmModal.jsx";
import { showSuccess, showError } from "../../components/Toast.jsx";

const TeamList = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState([]);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    const fetchTeam = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/team");
            setTeam(data?.data?.members || data?.data || []);
        } catch (err) { showError(err?.message || "Failed to load team"); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchTeam(); }, [fetchTeam]);

    const filtered = useMemo(() => {
        if (!search) return team;
        const q = search.toLowerCase();
        return team.filter((m) => {
            const name = `${m.firstName || ""} ${m.lastName || ""}`.toLowerCase();
            return name.includes(q) || m.designation?.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q);
        });
    }, [team, search]);

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await api.delete(`/team/${deleteTarget}`);
            showSuccess("Team member deleted");
            setTeam((prev) => prev.filter((m) => m._id !== deleteTarget));
        } catch (err) { showError(err?.message || "Failed to delete"); }
        finally { setDeleting(false); setDeleteTarget(null); }
    };

    const toggleActive = async (member) => {
        const action = member.isActive ? "deactivate" : "activate";
        try {
            await api.patch(`/team/${member._id}/${action}`);
            showSuccess(`Member ${action}d`);
            setTeam((prev) => prev.map((m) => m._id === member._id ? { ...m, isActive: !m.isActive } : m));
        } catch (err) { showError(err?.message || `Failed to ${action}`); }
    };

    const columns = [
        {
            key: "name", label: "Member", sortable: true,
            render: (row) => {
                const name = `${row.firstName || ""} ${row.lastName || ""}`.trim() || "Member";
                return (
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                        {row.profileImage ? (
                            <img src={row.profileImage} alt="" style={{ width: 36, height: 36, borderRadius: "var(--radius-full)", objectFit: "cover", flexShrink: 0 }} />
                        ) : (
                            <div style={{ width: 36, height: 36, borderRadius: "var(--radius-full)", background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-white)", fontSize: "var(--font-size-xs)", fontWeight: "var(--font-weight-bold)", flexShrink: 0 }}>
                                {(row.firstName?.[0] || "") + (row.lastName?.[0] || "")}
                            </div>
                        )}
                        <div>
                            <div style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>{name}</div>
                            <div style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)" }}>{row.email}</div>
                        </div>
                    </div>
                );
            },
        },
        { key: "designation", label: "Role", sortable: true, render: (row) => <span style={{ color: "var(--color-primary-light)" }}>{row.designation || "–"}</span> },
        {
            key: "display", label: "Display", render: (row) => (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                    <Badge status={row.cardSize === "large" ? "INFO" : row.cardSize === "small" ? "MUTED" : "SUCCESS"}>
                        {(row.cardSize || "medium").toUpperCase()}
                    </Badge>
                    {row.featured && (
                        <span style={{ fontSize: "0.68rem", fontWeight: "700", color: "var(--color-accent)", background: "rgba(6, 182, 212, 0.12)", border: "1px solid rgba(6, 182, 212, 0.2)", padding: "1px 6px", borderRadius: "4px" }}>
                            ★ FEATURED
                        </span>
                    )}
                </div>
            )
        },
        { key: "department", label: "Department", render: (row) => <span style={{ color: "var(--color-text-secondary)" }}>{row.department || "Engineering"}</span> },
        { key: "experience", label: "Exp", render: (row) => <span style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-xs)" }}>{row.experience ? `${row.experience} yrs` : "–"}</span> },
        { key: "isActive", label: "Status", render: (row) => <Badge status={row.isActive !== false ? "ACTIVE" : "INACTIVE"}>{row.isActive !== false ? "Active" : "Inactive"}</Badge> },
        {
            key: "actions", label: "Actions", width: "120px",
            render: (row) => (
                <div style={{ display: "flex", gap: "var(--space-1)" }}>
                    <button className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm" title="Edit" onClick={() => navigate(ROUTES.ADMIN_TEAM_EDIT(row._id))}><HiPencil size={15} /></button>
                    <button className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm" title={row.isActive !== false ? "Deactivate" : "Activate"} onClick={() => toggleActive(row)}>{row.isActive !== false ? <HiBan size={15} /> : <HiCheck size={15} />}</button>
                    <button className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm" title="Delete" onClick={() => setDeleteTarget(row._id)} style={{ color: "var(--color-danger)" }}><HiTrash size={15} /></button>
                </div>
            ),
        },
    ];

    return (
        <div className="admin-page">
            <PageHeader title="Team Management" subtitle="Manage AKSHU team members and roles." actions={<button className="admin-btn admin-btn--primary" onClick={() => navigate(ROUTES.ADMIN_TEAM_NEW)}><HiPlus size={16} /> Add Member</button>} />
            <div style={{ marginBottom: "var(--space-4)" }}><SearchInput value={search} onChange={setSearch} placeholder="Search members..." /></div>
            <DataTable columns={columns} data={filtered} loading={loading} selectable selected={selected} onSelect={setSelected} emptyIcon={<HiUsers size={48} />} emptyTitle="No team members yet" emptyMessage="Add your first team member to get started." emptyAction={<button className="admin-btn admin-btn--primary" onClick={() => navigate(ROUTES.ADMIN_TEAM_NEW)}><HiPlus size={16} /> Add Member</button>} bulkActions={<button className="admin-btn admin-btn--danger admin-btn--sm" onClick={async () => { for (const i of selected) { try { await api.delete(`/team/${i}`); } catch {} } showSuccess("Deleted"); setSelected([]); fetchTeam(); }}><HiTrash size={14} /> Delete</button>} />
            <ConfirmModal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Team Member" message="Are you sure? This action cannot be undone." confirmText="Delete" danger loading={deleting} />
        </div>
    );
};

export default TeamList;
