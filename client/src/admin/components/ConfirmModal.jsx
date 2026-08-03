// APP/client/src/admin/components/ConfirmModal.jsx

import { useEffect, useRef } from "react";
import { HiX, HiExclamation } from "react-icons/hi";

/**
 * Reusable Confirmation / Delete Modal
 *
 * @param {boolean}  open       - Whether the modal is visible
 * @param {Function} onClose    - Close handler
 * @param {Function} onConfirm  - Confirm action handler
 * @param {string}   title      - Modal title
 * @param {string}   message    - Modal body text
 * @param {string}   confirmText - Confirm button label (default "Confirm")
 * @param {string}   cancelText  - Cancel button label (default "Cancel")
 * @param {boolean}  danger     - Danger variant (red styling)
 * @param {boolean}  loading    - Loading state for confirm button
 */
const ConfirmModal = ({
    open,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to continue?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    danger = false,
    loading = false,
}) => {
    const confirmRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        const handleEsc = (e) => {
            if (e.key === "Escape" && !loading) onClose();
        };
        document.addEventListener("keydown", handleEsc);
        confirmRef.current?.focus();

        // Prevent body scroll
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [open, onClose, loading]);

    if (!open) return null;

    return (
        <div
            className="admin-modal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget && !loading) onClose();
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-modal-title"
        >
            <div className={`admin-modal ${danger ? "admin-modal--danger" : ""}`}>
                <div className="admin-modal__header">
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                        {danger && (
                            <span style={{
                                width: 32, height: 32, borderRadius: "var(--radius-md)",
                                background: "rgba(239, 68, 68, 0.12)", display: "flex",
                                alignItems: "center", justifyContent: "center",
                                color: "var(--color-danger)",
                            }}>
                                <HiExclamation size={18} />
                            </span>
                        )}
                        <h3 className="admin-modal__title" id="confirm-modal-title">
                            {title}
                        </h3>
                    </div>
                    <button
                        className="admin-modal__close"
                        onClick={onClose}
                        disabled={loading}
                        aria-label="Close modal"
                    >
                        <HiX />
                    </button>
                </div>
                <div className="admin-modal__body">
                    <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)", lineHeight: "var(--line-height-relaxed)" }}>
                        {message}
                    </p>
                </div>
                <div className="admin-modal__footer">
                    <button
                        className="admin-btn admin-btn--ghost"
                        onClick={onClose}
                        disabled={loading}
                    >
                        {cancelText}
                    </button>
                    <button
                        ref={confirmRef}
                        className={`admin-btn ${danger ? "admin-btn--danger" : "admin-btn--primary"}`}
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
