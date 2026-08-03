// APP/client/src/admin/pages/contacts/ContactList.jsx

import { useEffect, useState, useCallback, useMemo } from "react";
import { HiMail, HiEye, HiTrash, HiCheck, HiArchive, HiDownload, HiX } from "react-icons/hi";
import api from "../../../services/api.js";
import { CONTACT_STATUSES, INQUIRY_TYPES } from "../../../utils/constants.js";
import PageHeader from "../../components/PageHeader.jsx";
import SearchInput from "../../components/SearchInput.jsx";
import FilterDropdown from "../../components/FilterDropdown.jsx";
import DataTable from "../../components/DataTable.jsx";
import Badge from "../../components/Badge.jsx";
import ConfirmModal from "../../components/ConfirmModal.jsx";
import { showSuccess, showError } from "../../components/Toast.jsx";

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [readFilter, setReadFilter] = useState("");
    const [selected, setSelected] = useState([]);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [viewing, setViewing] = useState(null);

    const fetchContacts = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/contact/search?q=");
            setContacts(data?.data?.contacts || data?.data || []);
        } catch {
            // fallback: try recent
            try {
                const { data } = await api.get("/contact/recent?limit=100");
                setContacts(data?.data?.contacts || data?.data || []);
            } catch (err) { showError(err?.message || "Failed to load contacts"); }
        }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchContacts(); }, [fetchContacts]);

    const filtered = useMemo(() => {
        let result = contacts;
        if (search) { const q = search.toLowerCase(); result = result.filter((c) => c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.subject?.toLowerCase().includes(q)); }
        if (statusFilter) result = result.filter((c) => c.status === statusFilter);
        if (readFilter === "unread") result = result.filter((c) => !c.isRead);
        if (readFilter === "read") result = result.filter((c) => c.isRead);
        if (readFilter === "archived") result = result.filter((c) => c.isArchived);
        return result;
    }, [contacts, search, statusFilter, readFilter]);

    const handleMarkRead = async (id) => {
        try { await api.patch(`/contact/${id}/read`); setContacts((p) => p.map((c) => c._id === id ? { ...c, isRead: true } : c)); } catch (err) { showError(err?.message || "Failed"); }
    };

    const handleArchive = async (id) => {
        try { await api.patch(`/contact/${id}/archive`); showSuccess("Archived"); setContacts((p) => p.map((c) => c._id === id ? { ...c, isArchived: true } : c)); } catch (err) { showError(err?.message || "Failed"); }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try { await api.delete(`/contact/${deleteTarget}`); showSuccess("Deleted"); setContacts((p) => p.filter((c) => c._id !== deleteTarget)); } catch (err) { showError(err?.message || "Failed"); }
        finally { setDeleting(false); setDeleteTarget(null); }
    };

    const handleView = async (contact) => {
        setViewing(contact);
        if (!contact.isRead) { handleMarkRead(contact._id); }
    };

    const exportCSV = () => {
        const headers = ["Name", "Email", "Phone", "Subject", "Inquiry Type", "Status", "Date"];
        const rows = filtered.map((c) => [c.name, c.email, c.phone || "", c.subject, c.inquiryType || "", c.status, c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ""]);
        const csv = [headers, ...rows].map((r) => r.map((v) => `"${(v || "").replace(/"/g, '""')}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = "contacts.csv"; a.click();
        URL.revokeObjectURL(url);
    };

    const columns = [
        {
            key: "name", label: "Contact", sortable: true,
            render: (row) => (
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                    {!row.isRead && <div className="admin-unread-dot" />}
                    <div>
                        <div style={{ fontWeight: row.isRead ? "var(--font-weight-medium)" : "var(--font-weight-bold)", color: "var(--color-text-primary)" }}>{row.name}</div>
                        <div style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)" }}>{row.email}</div>
                    </div>
                </div>
            ),
        },
        { key: "subject", label: "Subject", render: (row) => <span style={{ maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>{row.subject}</span> },
        { key: "inquiryType", label: "Type", render: (row) => <span style={{ color: "var(--color-accent)", fontSize: "var(--font-size-xs)" }}>{(row.inquiryType || "GENERAL").replace(/_/g, " ")}</span> },
        { key: "status", label: "Status", sortable: true, render: (row) => <Badge status={row.status || "NEW"} /> },
        { key: "createdAt", label: "Date", sortable: true, render: (row) => <span style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-xs)" }}>{row.createdAt ? new Date(row.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "–"}</span> },
        {
            key: "actions", label: "Actions", width: "120px",
            render: (row) => (
                <div style={{ display: "flex", gap: "var(--space-1)" }}>
                    <button className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm" title="View" onClick={() => handleView(row)}><HiEye size={15} /></button>
                    <button className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm" title="Archive" onClick={() => handleArchive(row._id)}><HiArchive size={15} /></button>
                    <button className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm" title="Delete" onClick={() => setDeleteTarget(row._id)} style={{ color: "var(--color-danger)" }}><HiTrash size={15} /></button>
                </div>
            ),
        },
    ];

    return (
        <div className="admin-page">
            <PageHeader title="Contact Messages" subtitle="View inquiry form submissions from potential clients." actions={<button className="admin-btn admin-btn--secondary" onClick={exportCSV}><HiDownload size={16} /> Export CSV</button>} />
            <div style={{ display: "flex", gap: "var(--space-3)", marginBottom: "var(--space-4)", flexWrap: "wrap" }}>
                <SearchInput value={search} onChange={setSearch} placeholder="Search contacts..." />
                <FilterDropdown label="Status" options={CONTACT_STATUSES.map((s) => ({ value: s, label: s.replace(/_/g, " ") }))} value={statusFilter} onChange={setStatusFilter} />
                <FilterDropdown label="Read" options={[{ value: "unread", label: "Unread" }, { value: "read", label: "Read" }, { value: "archived", label: "Archived" }]} value={readFilter} onChange={setReadFilter} />
            </div>
            <DataTable columns={columns} data={filtered} loading={loading} selectable selected={selected} onSelect={setSelected} emptyIcon={<HiMail size={48} />} emptyTitle="No messages yet" emptyMessage="Contact form submissions will appear here." bulkActions={<button className="admin-btn admin-btn--danger admin-btn--sm" onClick={async () => { for (const i of selected) { try { await api.delete(`/contact/${i}`); } catch {} } showSuccess("Deleted"); setSelected([]); fetchContacts(); }}><HiTrash size={14} /> Delete</button>} />

            {/* Detail Panel */}
            {viewing && (
                <>
                    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 199 }} onClick={() => setViewing(null)} />
                    <div className="admin-detail-panel">
                        <div className="admin-detail-panel__header">
                            <h3 style={{ fontSize: "var(--font-size-lg)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>Message Details</h3>
                            <button className="admin-modal__close" onClick={() => setViewing(null)}><HiX size={20} /></button>
                        </div>
                        <div className="admin-detail-panel__body">
                            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
                                <div>
                                    <label style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)", marginBottom: 4, display: "block" }}>From</label>
                                    <div style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>{viewing.name}</div>
                                    <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-accent)" }}>{viewing.email}</div>
                                    {viewing.phone && <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)" }}>{viewing.phone}</div>}
                                    {viewing.company && <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)" }}>{viewing.company}</div>}
                                </div>
                                <div>
                                    <label style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)", marginBottom: 4, display: "block" }}>Subject</label>
                                    <div style={{ fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)" }}>{viewing.subject}</div>
                                </div>
                                <div>
                                    <label style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)", marginBottom: 4, display: "block" }}>Message</label>
                                    <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)", lineHeight: "var(--line-height-relaxed)", whiteSpace: "pre-wrap" }}>{viewing.message}</div>
                                </div>
                                <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
                                    <Badge status={viewing.status || "NEW"} />
                                    <Badge status={viewing.inquiryType || "GENERAL"}>
                                        {(viewing.inquiryType || "GENERAL").replace(/_/g, " ")}
                                    </Badge>
                                </div>
                                <div style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)" }}>
                                    Received: {viewing.createdAt ? new Date(viewing.createdAt).toLocaleString() : "–"}
                                </div>
                            </div>
                        </div>
                        <div className="admin-detail-panel__footer">
                            <a href={`mailto:${viewing.email}?subject=Re: ${viewing.subject}`} className="admin-btn admin-btn--primary" style={{ textDecoration: "none" }}>
                                <HiMail size={16} /> Reply via Email
                            </a>
                        </div>
                    </div>
                </>
            )}

            <ConfirmModal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Contact" message="Are you sure? This action cannot be undone." confirmText="Delete" danger loading={deleting} />
        </div>
    );
};

export default ContactList;
