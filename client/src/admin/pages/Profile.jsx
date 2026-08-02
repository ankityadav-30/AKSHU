// APP/client/src/admin/pages/Profile.jsx

import { useState, useEffect } from "react";
import { HiUser, HiLockClosed, HiSave, HiCheck } from "react-icons/hi";
import api from "../../services/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import PageHeader from "../components/PageHeader.jsx";
import ImageUploader from "../components/ImageUploader.jsx";
import { showSuccess, showError } from "../components/Toast.jsx";

const Profile = () => {
    const { user, setUser } = useAuth();
    const [profileForm, setProfileForm] = useState({
        firstName: "",
        lastName: "",
        avatar: "",
    });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [savingProfile, setSavingProfile] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    useEffect(() => {
        if (user) {
            setProfileForm({
                firstName: user.firstName || user.name || "",
                lastName: user.lastName || "",
                avatar: user.avatar || "",
            });
        }
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setSavingProfile(true);
        try {
            const { data } = await api.patch("/profile", profileForm);
            const updatedUser = data?.data?.user || data?.data || data;
            // Update context & local storage if needed
            if (setUser) {
                setUser((prev) => ({ ...prev, ...updatedUser }));
            }
            showSuccess("Profile updated successfully");
        } catch (err) {
            showError(err?.message || "Failed to update profile");
        } finally {
            setSavingProfile(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            showError("New passwords do not match");
            return;
        }
        if (passwordForm.newPassword.length < 6) {
            showError("Password must be at least 6 characters long");
            return;
        }

        setChangingPassword(true);
        try {
            await api.patch("/profile/password", {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
                confirmPassword: passwordForm.confirmPassword,
            });
            showSuccess("Password changed successfully");
            setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            const backendErrors = err?.response?.data?.errors;
            if (Array.isArray(backendErrors) && backendErrors.length > 0) {
                const errorMsg = backendErrors.map((e) => `${e.field}: ${e.message}`).join(" | ");
                showError(`Validation Error — ${errorMsg}`);
            } else {
                showError(err?.response?.data?.message || err?.message || "Failed to change password");
            }
        } finally {
            setChangingPassword(false);
        }
    };

    return (
        <div className="admin-page">
            <PageHeader
                title="Account Settings"
                subtitle="Manage your profile information and account security."
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "var(--space-6)", alignItems: "start" }}>
                {/* Main Forms */}
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                    {/* Profile Information */}
                    <div className="admin-card">
                        <div className="admin-card__header">
                            <h3 className="admin-card__title" style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                                <HiUser size={18} /> Personal Details
                            </h3>
                        </div>
                        <div className="admin-card__body">
                            <form onSubmit={handleUpdateProfile} className="admin-form">
                                <div className="admin-form-grid">
                                    <div className="admin-form-group">
                                        <label className="admin-label admin-label--required">First Name</label>
                                        <input
                                            className="admin-input"
                                            value={profileForm.firstName}
                                            onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Last Name</label>
                                        <input
                                            className="admin-input"
                                            value={profileForm.lastName}
                                            onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="admin-form-group">
                                    <label className="admin-label">Email Address</label>
                                    <input
                                        className="admin-input"
                                        value={user?.email || ""}
                                        disabled
                                        style={{ opacity: 0.6, cursor: "not-allowed" }}
                                    />
                                    <span className="admin-help-text">Email address cannot be changed.</span>
                                </div>

                                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "var(--space-2)" }}>
                                    <button type="submit" className="admin-btn admin-btn--primary" disabled={savingProfile}>
                                        <HiSave size={16} /> {savingProfile ? "Saving..." : "Save Profile"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="admin-card">
                        <div className="admin-card__header">
                            <h3 className="admin-card__title" style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                                <HiLockClosed size={18} /> Security & Password
                            </h3>
                        </div>
                        <div className="admin-card__body">
                            <form onSubmit={handleChangePassword} className="admin-form">
                                <div className="admin-form-group">
                                    <label className="admin-label admin-label--required">Current Password</label>
                                    <input
                                        type="password"
                                        className="admin-input"
                                        value={passwordForm.currentPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="admin-form-grid">
                                    <div className="admin-form-group">
                                        <label className="admin-label admin-label--required">New Password</label>
                                        <input
                                            type="password"
                                            className="admin-input"
                                            value={passwordForm.newPassword}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label admin-label--required">Confirm New Password</label>
                                        <input
                                            type="password"
                                            className="admin-input"
                                            value={passwordForm.confirmPassword}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "var(--space-2)" }}>
                                    <button type="submit" className="admin-btn admin-btn--secondary" disabled={changingPassword}>
                                        <HiCheck size={16} /> {changingPassword ? "Updating..." : "Update Password"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Sidebar Avatar & Summary */}
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
                    <div className="admin-card">
                        <div className="admin-card__header">
                            <h3 className="admin-card__title">Profile Picture</h3>
                        </div>
                        <div className="admin-card__body">
                            <ImageUploader
                                value={profileForm.avatar}
                                onChange={(img) => setProfileForm((prev) => ({ ...prev, avatar: img.url }))}
                                folder="avatars"
                            />
                        </div>
                    </div>

                    <div className="admin-card">
                        <div className="admin-card__header">
                            <h3 className="admin-card__title">Account Summary</h3>
                        </div>
                        <div className="admin-card__body" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", fontSize: "var(--font-size-sm)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "var(--color-text-tertiary)" }}>Role</span>
                                <span style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--color-primary-light)", textTransform: "capitalize" }}>{user?.role || "Admin"}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "var(--color-text-tertiary)" }}>User ID</span>
                                <span style={{ fontFamily: "monospace", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>{user?._id || "–"}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "var(--color-text-tertiary)" }}>Member Since</span>
                                <span style={{ color: "var(--color-text-secondary)" }}>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Active"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`@media (max-width: 900px) { .admin-page > div:first-of-type { grid-template-columns: 1fr !important; } }`}</style>
        </div>
    );
};

export default Profile;
