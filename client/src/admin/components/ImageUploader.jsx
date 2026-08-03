// APP/client/src/admin/components/ImageUploader.jsx

import { useState, useRef, useCallback } from "react";
import { HiUpload, HiTrash, HiPhotograph } from "react-icons/hi";
import api from "../../services/api.js";
import { showError } from "./Toast.jsx";

/**
 * Image Uploader with drag & drop
 *
 * @param {string}   value       - Current image URL
 * @param {Function} onChange    - Callback with { url, publicId }
 * @param {string}   folder     - Cloudinary folder (default "admin")
 */
const ImageUploader = ({ value, onChange, folder = "admin" }) => {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const uploadFile = useCallback(async (file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            showError("Please upload an image file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);
        formData.append("resourceType", "image");

        setUploading(true);
        try {
            const { data } = await api.post("/upload/single", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const result = data.data || data;
            onChange({ url: result.url || result.secure_url, publicId: result.publicId || result.public_id });
        } catch (err) {
            showError(err.message || "Upload failed.");
        } finally {
            setUploading(false);
        }
    }, [folder, onChange]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer?.files?.[0];
        uploadFile(file);
    }, [uploadFile]);

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        uploadFile(file);
        e.target.value = "";
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        onChange({ url: "", publicId: "" });
    };

    return (
        <div
            className={`admin-uploader ${dragActive ? "admin-uploader--active" : ""} ${value ? "admin-uploader--has-image" : ""}`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            aria-label="Upload image"
            onKeyDown={(e) => { if (e.key === "Enter") inputRef.current?.click(); }}
        >
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: "none" }}
            />

            {uploading ? (
                <div style={{ padding: "var(--space-8)", textAlign: "center" }}>
                    <div className="admin-skeleton admin-skeleton--rect" style={{ width: "100%", height: "120px" }} />
                    <p style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-sm)", marginTop: "var(--space-3)" }}>
                        Uploading...
                    </p>
                </div>
            ) : value ? (
                <>
                    <img src={value} alt="Upload preview" className="admin-uploader__preview" />
                    <div className="admin-uploader__overlay">
                        <button
                            className="admin-btn admin-btn--secondary admin-btn--sm"
                            onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                        >
                            <HiUpload /> Replace
                        </button>
                        <button
                            className="admin-btn admin-btn--danger admin-btn--sm"
                            onClick={handleRemove}
                        >
                            <HiTrash /> Remove
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="admin-uploader__icon">
                        <HiPhotograph />
                    </div>
                    <p className="admin-uploader__text">
                        Drop an image here or <span style={{ color: "var(--color-primary-light)" }}>click to browse</span>
                    </p>
                    <p className="admin-uploader__hint">PNG, JPG, WebP up to 5MB</p>
                </>
            )}
        </div>
    );
};

export default ImageUploader;
