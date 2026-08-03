// APP/client/src/admin/components/Toast.jsx

import toast, { Toaster } from "react-hot-toast";

/**
 * Admin Toast Configuration
 * Dark-themed toast notifications
 */
export const AdminToaster = () => (
    <Toaster
        position="top-right"
        gutter={8}
        toastOptions={{
            duration: 4000,
            style: {
                background: "var(--color-bg-elevated)",
                color: "var(--color-text-primary)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                fontSize: "var(--font-size-sm)",
                boxShadow: "var(--shadow-lg)",
                padding: "12px 16px",
                maxWidth: "420px",
            },
            success: {
                iconTheme: {
                    primary: "var(--color-success)",
                    secondary: "var(--color-bg-elevated)",
                },
            },
            error: {
                iconTheme: {
                    primary: "var(--color-danger)",
                    secondary: "var(--color-bg-elevated)",
                },
                duration: 5000,
            },
        }}
    />
);

/**
 * Convenience wrappers
 */
export const showSuccess = (message) => toast.success(message);
export const showError = (message) => toast.error(message);
export const showInfo = (message) =>
    toast(message, {
        icon: "ℹ️",
    });

export default toast;
