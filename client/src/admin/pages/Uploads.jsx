// APP/client/src/admin/pages/Uploads.jsx

import { useState, useRef, useCallback } from "react";
import { HiUpload, HiTrash, HiPhotograph, HiClipboardCopy, HiX } from "react-icons/hi";
import api from "../../services/api.js";
import PageHeader from "../components/PageHeader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import { showSuccess, showError } from "../components/Toast.jsx";

const Uploads = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [preview, setPreview] = useState(null);
    const inputRef = useRef(null);

    const uploadFiles = useCallback(async (fileList) => {
        if (!fileList?.length) return;
        setUploading(true);
        const newFiles = [];

        for (const file of Array.from(fileList)) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "uploads");
            formData.append("resourceType", file.type.startsWith("image") ? "image" : file.type.startsWith("video") ? "video" : "raw");

            try {
                const { data } = await api.post("/upload/single", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                const result = data?.data || {};
                newFiles.push({
                    id: result.publicId || result.public_id || Date.now().toString(),
                    url: result.url || result.secure_url || "",
                    publicId: result.publicId || result.public_id || "",
                    filename: file.name,
                    size: file.size,
                    type: file.type,
                    uploadedAt: new Date().toISOString(),
                });
            } catch (err) {
                showError(`Failed to upload ${file.name}: ${err?.message || "Unknown error"}`);
            }
        }

        if (newFiles.length) {
            setFiles((prev) => [...newFiles, ...prev]);
            showSuccess(`${newFiles.length} file(s) uploaded`);
        }
        setUploading(false);
    }, []);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        uploadFiles(e.dataTransfer?.files);
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await api.delete("/upload", {
                data: { publicId: deleteTarget.publicId, resourceType: deleteTarget.type?.startsWith("image") ? "image" : "raw" },
            });
            showSuccess("File deleted");
            setFiles((prev) => prev.filter((f) => f.id !== deleteTarget.id));
        } catch (err) { showError(err?.message || "Failed to delete"); }
        finally { setDeleting(false); setDeleteTarget(null); }
    };

    const copyUrl = (url) => {
        navigator.clipboard.writeText(url).then(() => showSuccess("URL copied")).catch(() => showError("Copy failed"));
    };

    const formatSize = (bytes) => {
        if (!bytes) return "–";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
    };

    return (
        <div className="admin-page">
            <PageHeader title="Upload Manager" subtitle="Upload and manage files via Cloudinary." />

            {/* Upload Zone */}
            <div
                className={`admin-uploader ${dragActive ? "admin-uploader--active" : ""}`}
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                style={{ marginBottom: "var(--space-6)", padding: "var(--space-10)" }}
            >
                <input ref={inputRef} type="file" multiple onChange={(e) => { uploadFiles(e.target.files); e.target.value = ""; }} style={{ display: "none" }} />
                {uploading ? (
                    <div>
                        <div className="admin-skeleton admin-skeleton--rect" style={{ width: 80, height: 80, margin: "0 auto var(--space-3)" }} />
                        <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>Uploading files...</p>
                    </div>
                ) : (
                    <>
                        <div className="admin-uploader__icon"><HiUpload /></div>
                        <p className="admin-uploader__text">Drop files here or <span style={{ color: "var(--color-primary-light)" }}>click to browse</span></p>
                        <p className="admin-uploader__hint">Images, videos, documents — up to 10MB each</p>
                    </>
                )}
            </div>

            {/* Files Grid */}
            {files.length === 0 ? (
                <EmptyState icon={<HiPhotograph />} title="No files uploaded" message="Upload files using the drop zone above. Files uploaded in this session will appear here." />
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "var(--space-4)" }}>
                    {files.map((file) => (
                        <div key={file.id} className="admin-card" style={{ overflow: "hidden" }}>
                            {/* Preview */}
                            {file.type?.startsWith("image") ? (
                                <div style={{ height: 160, overflow: "hidden", cursor: "pointer", borderBottom: "1px solid var(--color-border)" }} onClick={() => setPreview(file)}>
                                    <img src={file.url} alt={file.filename} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                            ) : (
                                <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-bg-elevated)", borderBottom: "1px solid var(--color-border)" }}>
                                    <HiPhotograph size={40} style={{ color: "var(--color-text-tertiary)", opacity: 0.3 }} />
                                </div>
                            )}
                            {/* Info */}
                            <div style={{ padding: "var(--space-4)" }}>
                                <div style={{ fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", fontSize: "var(--font-size-sm)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "var(--space-2)" }}>
                                    {file.filename}
                                </div>
                                <div style={{ display: "flex", gap: "var(--space-3)", fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-3)" }}>
                                    <span>{formatSize(file.size)}</span>
                                    <span>•</span>
                                    <span>{file.type?.split("/")[1]?.toUpperCase() || "FILE"}</span>
                                </div>
                                <div style={{ display: "flex", gap: "var(--space-2)" }}>
                                    <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => copyUrl(file.url)} style={{ flex: 1 }}>
                                        <HiClipboardCopy size={13} /> Copy URL
                                    </button>
                                    <button className="admin-btn admin-btn--danger admin-btn--sm admin-btn--icon" onClick={() => setDeleteTarget(file)}>
                                        <HiTrash size={13} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Image Preview Modal */}
            {preview && (
                <div className="admin-modal-overlay" onClick={() => setPreview(null)}>
                    <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }} onClick={(e) => e.stopPropagation()}>
                        <button style={{ position: "absolute", top: -12, right: -12, width: 32, height: 32, borderRadius: "50%", background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }} onClick={() => setPreview(null)}><HiX size={16} /></button>
                        <img src={preview.url} alt={preview.filename} style={{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: "var(--radius-xl)", objectFit: "contain" }} />
                    </div>
                </div>
            )}

            <ConfirmModal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete File" message="This will permanently delete the file from Cloudinary. Continue?" confirmText="Delete" danger loading={deleting} />
        </div>
    );
};

export default Uploads;
