// APP/client/src/admin/components/DataTable.jsx

import { useState, useMemo, useCallback } from "react";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";
import { SkeletonRow } from "./Skeleton.jsx";
import EmptyState from "./EmptyState.jsx";

/**
 * Feature-rich reusable Data Table
 *
 * @param {Array}  columns       - Column definitions: { key, label, sortable?, render?(row), width? }
 * @param {Array}  data          - Array of row objects
 * @param {boolean} loading      - Show skeleton rows
 * @param {string}  emptyIcon    - Icon for empty state
 * @param {string}  emptyTitle   - Title for empty state
 * @param {string}  emptyMessage - Message for empty state
 * @param {boolean} selectable   - Enable checkbox selection
 * @param {Array}   selected     - Selected row IDs (controlled)
 * @param {Function} onSelect    - Selection change handler (ids[])
 * @param {React.ReactNode} bulkActions - Bulk action buttons when items selected
 * @param {number}  pageSize     - Items per page (default 10)
 * @param {string}  rowKey       - Key for row identity (default "_id")
 */
const DataTable = ({
    columns = [],
    data = [],
    loading = false,
    emptyIcon,
    emptyTitle = "No data found",
    emptyMessage,
    emptyAction,
    selectable = false,
    selected = [],
    onSelect,
    bulkActions,
    pageSize = 10,
    rowKey = "_id",
}) => {
    const [sortKey, setSortKey] = useState(null);
    const [sortDir, setSortDir] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);

    // Sort
    const sorted = useMemo(() => {
        if (!sortKey) return data;
        return [...data].sort((a, b) => {
            let aVal = a[sortKey];
            let bVal = b[sortKey];
            if (typeof aVal === "string") aVal = aVal.toLowerCase();
            if (typeof bVal === "string") bVal = bVal.toLowerCase();
            if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
            if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortKey, sortDir]);

    // Paginate
    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const paginated = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return sorted.slice(start, start + pageSize);
    }, [sorted, currentPage, pageSize]);

    // Reset page when data changes
    useMemo(() => {
        setCurrentPage(1);
    }, [data.length]);

    const handleSort = useCallback((key) => {
        if (sortKey === key) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDir("asc");
        }
    }, [sortKey]);

    // Selection
    const allOnPageSelected = paginated.length > 0 && paginated.every((r) => selected.includes(r[rowKey]));

    const toggleAll = () => {
        if (allOnPageSelected) {
            const pageIds = new Set(paginated.map((r) => r[rowKey]));
            onSelect?.(selected.filter((id) => !pageIds.has(id)));
        } else {
            const newIds = new Set([...selected, ...paginated.map((r) => r[rowKey])]);
            onSelect?.([...newIds]);
        }
    };

    const toggleRow = (id) => {
        onSelect?.(
            selected.includes(id)
                ? selected.filter((x) => x !== id)
                : [...selected, id]
        );
    };

    // Page buttons
    const pageButtons = useMemo(() => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);
        if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    }, [currentPage, totalPages]);

    return (
        <div className="admin-card">
            {/* Bulk action bar */}
            {selectable && selected.length > 0 && (
                <div className="admin-bulk-bar">
                    <span className="admin-bulk-bar__count">{selected.length} selected</span>
                    {bulkActions}
                    <button
                        className="admin-btn admin-btn--ghost admin-btn--sm"
                        onClick={() => onSelect?.([])}
                        style={{ marginLeft: "auto" }}
                    >
                        Clear
                    </button>
                </div>
            )}

            {/* Table */}
            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            {selectable && (
                                <th style={{ width: 40, padding: "var(--space-3) var(--space-3)" }}>
                                    <input
                                        type="checkbox"
                                        className="admin-checkbox"
                                        checked={allOnPageSelected && paginated.length > 0}
                                        onChange={toggleAll}
                                        aria-label="Select all rows"
                                    />
                                </th>
                            )}
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`${col.sortable ? "sortable" : ""} ${sortKey === col.key ? "sorted" : ""}`}
                                    style={col.width ? { width: col.width } : undefined}
                                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                                >
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                        {col.label}
                                        {col.sortable && sortKey === col.key && (
                                            sortDir === "asc" ? <HiChevronUp size={14} /> : <HiChevronDown size={14} />
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <SkeletonRow key={i} columns={columns.length + (selectable ? 1 : 0)} />
                            ))
                        ) : paginated.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                                    <EmptyState
                                        icon={emptyIcon}
                                        title={emptyTitle}
                                        message={emptyMessage}
                                        action={emptyAction}
                                    />
                                </td>
                            </tr>
                        ) : (
                            paginated.map((row) => (
                                <tr
                                    key={row[rowKey]}
                                    className={selected.includes(row[rowKey]) ? "selected" : ""}
                                >
                                    {selectable && (
                                        <td style={{ padding: "var(--space-3)" }}>
                                            <input
                                                type="checkbox"
                                                className="admin-checkbox"
                                                checked={selected.includes(row[rowKey])}
                                                onChange={() => toggleRow(row[rowKey])}
                                                aria-label={`Select row ${row[rowKey]}`}
                                            />
                                        </td>
                                    )}
                                    {columns.map((col) => (
                                        <td key={col.key}>
                                            {col.render ? col.render(row) : row[col.key] ?? "–"}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {!loading && data.length > pageSize && (
                <div className="admin-pagination">
                    <span>
                        Showing {Math.min((currentPage - 1) * pageSize + 1, data.length)}–{Math.min(currentPage * pageSize, data.length)} of {data.length}
                    </span>
                    <div className="admin-pagination__pages">
                        <button
                            className="admin-pagination__btn"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            aria-label="Previous page"
                        >
                            ‹
                        </button>
                        {pageButtons.map((p) => (
                            <button
                                key={p}
                                className={`admin-pagination__btn ${p === currentPage ? "admin-pagination__btn--active" : ""}`}
                                onClick={() => setCurrentPage(p)}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            className="admin-pagination__btn"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            aria-label="Next page"
                        >
                            ›
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
