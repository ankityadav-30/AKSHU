// APP/client/src/admin/pages/newsletter/NewsletterList.jsx

import { useEffect, useState, useCallback, useMemo } from "react";
import { HiNewspaper, HiTrash, HiDownload, HiRefresh, HiBan, HiCheck } from "react-icons/hi";
import api from "../../../services/api.js";
import PageHeader from "../../components/PageHeader.jsx";
import SearchInput from "../../components/SearchInput.jsx";
import FilterDropdown from "../../components/FilterDropdown.jsx";
import DataTable from "../../components/DataTable.jsx";
import StatCard from "../../components/StatCard.jsx";
import Badge from "../../components/Badge.jsx";
import AdminChart, { CHART_COLORS } from "../../components/AdminChart.jsx";
import ConfirmModal from "../../components/ConfirmModal.jsx";
import { showSuccess, showError } from "../../components/Toast.jsx";

const NewsletterList = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [stats, setStats] = useState({});
    const [growth, setGrowth] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [selected, setSelected] = useState([]);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        try {
            const [subsRes, statsRes, analyticsRes] = await Promise.allSettled([
                api.get("/newsletter"),
                api.get("/newsletter/statistics"),
                api.get("/analytics/newsletter?months=6"),
            ]);
            if (subsRes.status === "fulfilled") setSubscribers(subsRes.value.data?.data?.subscribers || subsRes.value.data?.data || []);
            if (statsRes.status === "fulfilled") setStats(statsRes.value.data?.data || {});
            if (analyticsRes.status === "fulfilled") setGrowth(analyticsRes.value.data?.data?.monthlyGrowth || []);
        } catch (err) { showError(err?.message || "Failed to load"); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    const filtered = useMemo(() => {
        let result = subscribers;
        if (search) { const q = search.toLowerCase(); result = result.filter((s) => s.email?.toLowerCase().includes(q)); }
        if (statusFilter) result = result.filter((s) => s.status === statusFilter);
        return result;
    }, [subscribers, search, statusFilter]);

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try { await api.delete(`/newsletter/${deleteTarget}`); showSuccess("Subscriber deleted"); setSubscribers((p) => p.filter((s) => s._id !== deleteTarget)); } catch (err) { showError(err?.message || "Failed"); }
        finally { setDeleting(false); setDeleteTarget(null); }
    };

    const handleUnsubscribe = async (id) => {
        try { await api.patch(`/newsletter/${id}/unsubscribe`); showSuccess("Unsubscribed"); setSubscribers((p) => p.map((s) => s._id === id ? { ...s, status: "UNSUBSCRIBED" } : s)); } catch (err) { showError(err?.message || "Failed"); }
    };

    const handleResubscribe = async (id) => {
        try { await api.patch(`/newsletter/${id}/resubscribe`); showSuccess("Resubscribed"); setSubscribers((p) => p.map((s) => s._id === id ? { ...s, status: "SUBSCRIBED" } : s)); } catch (err) { showError(err?.message || "Failed"); }
    };

    const exportCSV = () => {
        const headers = ["Email", "Status", "Source", "Subscribed Date"];
        const rows = filtered.map((s) => [s.email, s.status, s.source || "", s.subscribedAt ? new Date(s.subscribedAt).toLocaleDateString() : ""]);
        const csv = [headers, ...rows].map((r) => r.map((v) => `"${(v || "").replace(/"/g, '""')}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = "subscribers.csv"; a.click();
        URL.revokeObjectURL(url);
    };

    const growthChart = growth.length > 0 ? {
        labels: growth.map((m) => m._id || m.month || ""),
        datasets: [{ label: "Subscribers", data: growth.map((m) => m.count), borderColor: CHART_COLORS[4], backgroundColor: `${CHART_COLORS[4]}20`, fill: true, tension: 0.4, pointRadius: 3 }],
    } : null;

    const columns = [
        { key: "email", label: "Email", sortable: true, render: (row) => <span style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>{row.email}</span> },
        { key: "status", label: "Status", sortable: true, render: (row) => <Badge status={row.status || "SUBSCRIBED"} /> },
        { key: "source", label: "Source", render: (row) => <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)" }}>{(row.source || "WEBSITE").replace(/_/g, " ")}</span> },
        { key: "subscribedAt", label: "Date", sortable: true, render: (row) => <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)" }}>{row.subscribedAt ? new Date(row.subscribedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : row.createdAt ? new Date(row.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "–"}</span> },
        {
            key: "actions", label: "Actions", width: "100px",
            render: (row) => (
                <div style={{ display: "flex", gap: "var(--space-1)" }}>
                    {row.status === "SUBSCRIBED" ? (
                        <button className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm" title="Unsubscribe" onClick={() => handleUnsubscribe(row._id)}><HiBan size={15} /></button>
                    ) : (
                        <button className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm" title="Resubscribe" onClick={() => handleResubscribe(row._id)}><HiCheck size={15} /></button>
                    )}
                    <button className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm" title="Delete" onClick={() => setDeleteTarget(row._id)} style={{ color: "var(--color-danger)" }}><HiTrash size={15} /></button>
                </div>
            ),
        },
    ];

    return (
        <div className="admin-page">
            <PageHeader title="Newsletter Subscribers" subtitle="Manage AKSHU Insights newsletter subscribers." actions={<><button className="admin-btn admin-btn--ghost" onClick={fetchAll}><HiRefresh size={16} /> Refresh</button><button className="admin-btn admin-btn--secondary" onClick={exportCSV}><HiDownload size={16} /> Export</button></>} />

            {/* Stats */}
            <div className="admin-stats-grid" style={{ marginBottom: "var(--space-6)" }}>
                <StatCard label="Total Subscribers" value={stats.total ?? subscribers.length} icon={<HiNewspaper size={18} />} color="#EC4899" />
                <StatCard label="Subscribed" value={stats.subscribed ?? 0} icon={<HiCheck size={18} />} color="#10B981" />
                <StatCard label="Unsubscribed" value={stats.unsubscribed ?? 0} icon={<HiBan size={18} />} color="#F59E0B" />
            </div>

            {/* Growth chart */}
            {growthChart && (
                <div className="admin-card" style={{ marginBottom: "var(--space-6)" }}>
                    <div className="admin-card__header"><h3 className="admin-card__title">Subscriber Growth</h3></div>
                    <div className="admin-card__body"><AdminChart type="line" data={growthChart} height="220px" /></div>
                </div>
            )}

            <div style={{ display: "flex", gap: "var(--space-3)", marginBottom: "var(--space-4)", flexWrap: "wrap" }}>
                <SearchInput value={search} onChange={setSearch} placeholder="Search subscribers..." />
                <FilterDropdown label="Status" options={[{ value: "SUBSCRIBED", label: "Subscribed" }, { value: "UNSUBSCRIBED", label: "Unsubscribed" }]} value={statusFilter} onChange={setStatusFilter} />
            </div>

            <DataTable columns={columns} data={filtered} loading={loading} selectable selected={selected} onSelect={setSelected} emptyIcon={<HiNewspaper size={48} />} emptyTitle="No subscribers yet" emptyMessage="Newsletter subscribers will appear here." bulkActions={<button className="admin-btn admin-btn--danger admin-btn--sm" onClick={async () => { for (const i of selected) { try { await api.delete(`/newsletter/${i}`); } catch {} } showSuccess("Deleted"); setSelected([]); fetchAll(); }}><HiTrash size={14} /> Delete</button>} />
            <ConfirmModal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Subscriber" message="Are you sure? This action cannot be undone." confirmText="Delete" danger loading={deleting} />
        </div>
    );
};

export default NewsletterList;
