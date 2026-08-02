// APP/client/src/admin/pages/leads/LeadsManagement.jsx

import { useEffect, useState } from "react";
import { HiUserGroup, HiDownload, HiTrash, HiSearch, HiMail, HiPhone, HiBriefcase } from "react-icons/hi";
import api from "../../../services/api.js";
import { showSuccess, showError } from "../../components/Toast.jsx";
import DataTable from "../../components/DataTable.jsx";
import ConfirmModal from "../../components/ConfirmModal.jsx";
import "./LeadsManagement.css";

const LeadsManagement = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [deleteTargetId, setDeleteTargetId] = useState(null);

    const fetchLeads = () => {
        setLoading(true);
        api.get("/leads", { params: { search, status: statusFilter } })
            .then((res) => {
                setLeads(res.data?.data?.leads || []);
            })
            .catch(() => showError("Failed to load leads"))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchLeads();
    }, [statusFilter]);

    const handleStatusChange = async (leadId, newStatus) => {
        try {
            await api.patch(`/leads/${leadId}`, { status: newStatus });
            showSuccess(`Lead status updated to ${newStatus}`);
            fetchLeads();
        } catch (err) {
            showError("Failed to update status");
        }
    };

    const handleDelete = async () => {
        if (!deleteTargetId) return;
        try {
            await api.delete(`/leads/${deleteTargetId}`);
            showSuccess("Lead record deleted");
            setDeleteTargetId(null);
            fetchLeads();
        } catch (err) {
            showError("Failed to delete lead");
        }
    };

    const handleExportCsv = () => {
        window.open("/api/v1/leads/export", "_blank");
    };

    const columns = [
        {
            key: "name",
            label: "Lead Contact",
            render: (row) => (
                <div>
                    <div style={{ fontWeight: 800, color: "#ffffff" }}>{row.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--color-accent)", display: "flex", alignItems: "center", gap: 4 }}>
                        <HiMail /> {row.email}
                    </div>
                    {row.phone && (
                        <div style={{ fontSize: "0.75rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: 4 }}>
                            <HiPhone /> {row.phone}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: "projectType",
            label: "Project Interest",
            render: (row) => (
                <div>
                    <span className="admin-badge admin-badge--primary">{row.projectType}</span>
                    {row.company && <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: 4 }}><HiBriefcase style={{ verticalAlign: "middle" }} /> {row.company}</div>}
                </div>
            ),
        },
        {
            key: "budget",
            label: "Budget / Timeline",
            render: (row) => (
                <div style={{ fontSize: "0.82rem", color: "#cbd5e1" }}>
                    <div><strong>Budget:</strong> {row.budget}</div>
                    <div><strong>Timeline:</strong> {row.timeline}</div>
                </div>
            ),
        },
        {
            key: "status",
            label: "Pipeline Status",
            render: (row) => (
                <select
                    value={row.status}
                    onChange={(e) => handleStatusChange(row._id, e.target.value)}
                    className="leads-status-select"
                >
                    <option value="new">🆕 New Lead</option>
                    <option value="contacted">📞 Contacted</option>
                    <option value="in_discussion">💬 In Discussion</option>
                    <option value="closed_won">✅ Closed (Won)</option>
                    <option value="closed_lost">❌ Closed (Lost)</option>
                </select>
            ),
        },
        {
            key: "createdAt",
            label: "Captured Date",
            render: (row) => <span>{new Date(row.createdAt).toLocaleDateString()}</span>,
        },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <button
                    type="button"
                    className="btn btn--danger btn--sm"
                    onClick={() => setDeleteTargetId(row._id)}
                    title="Delete Lead"
                >
                    <HiTrash />
                </button>
            ),
        },
    ];

    return (
        <div className="admin-leads-page">
            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">
                        <HiUserGroup style={{ verticalAlign: "middle", marginRight: 8, color: "var(--color-accent)" }} />
                        Captured Sales Leads
                    </h1>
                    <p className="admin-page-desc">Manage project estimation leads captured automatically by AKSHU AI.</p>
                </div>
                <div className="leads-header-actions">
                    <button type="button" className="btn btn--primary" onClick={handleExportCsv}>
                        <HiDownload /> Export CSV
                    </button>
                </div>
            </div>

            {/* SEARCH & FILTERS */}
            <div className="admin-card" style={{ padding: 24, marginTop: 24 }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                    <input
                        type="text"
                        placeholder="Search leads by name, email, company, type..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="admin-input"
                        style={{ maxWidth: 360 }}
                    />
                    <button type="button" className="btn btn--primary" onClick={fetchLeads}>
                        <HiSearch /> Search
                    </button>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="admin-input"
                        style={{ maxWidth: 200 }}
                    >
                        <option value="">All Statuses</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_discussion">In Discussion</option>
                        <option value="closed_won">Closed Won</option>
                        <option value="closed_lost">Closed Lost</option>
                    </select>
                </div>

                <DataTable columns={columns} data={leads} loading={loading} emptyMessage="No captured leads found." />
            </div>

            {/* CONFIRM DELETE MODAL */}
            <ConfirmModal
                isOpen={!!deleteTargetId}
                title="Delete Lead Record"
                message="Are you sure you want to delete this lead record? This action cannot be undone."
                onConfirm={handleDelete}
                onCancel={() => setDeleteTargetId(null)}
            />
        </div>
    );
};

export default LeadsManagement;
