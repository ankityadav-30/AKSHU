// APP/client/src/admin/pages/Profile.jsx
import { useAuth } from "../../context/AuthContext.jsx";

const Profile = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1 style={{ fontSize: "var(--font-size-2xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-6)" }}>Profile</h1>
            <div style={{
                padding: "var(--space-6)",
                background: "var(--color-bg-surface)",
                border: "1px solid rgba(99,102,241,0.08)",
                borderRadius: "var(--radius-lg)",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
                    <div style={{
                        width: 64, height: 64, borderRadius: "50%",
                        background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-bold)", color: "var(--color-white)",
                    }}>
                        {user?.name?.[0] || "A"}
                    </div>
                    <div>
                        <h2 style={{ color: "var(--color-text-primary)", fontSize: "var(--font-size-xl)" }}>{user?.name || "Admin"}</h2>
                        <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)", textTransform: "capitalize" }}>{user?.role || "admin"}</p>
                    </div>
                </div>
                <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
                    <p><strong style={{ color: "var(--color-text-primary)" }}>Email:</strong> {user?.email || "–"}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
