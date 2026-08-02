// APP/client/src/admin/layout/AdminLayout.jsx

import { useState, useMemo } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
    HiHome, HiCollection, HiDocumentText, HiUsers,
    HiMail, HiNewspaper, HiChartBar, HiUser, HiLogout,
    HiMenu, HiX, HiUpload, HiSearch, HiBell, HiChatAlt2, HiUserGroup,
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext.jsx";
import { ROUTES } from "../../utils/constants.js";
import { AdminToaster } from "../components/Toast.jsx";
import "./AdminLayout.css";

const SIDEBAR_LINKS = [
    { label: "Dashboard", icon: <HiHome />, path: ROUTES.ADMIN_DASHBOARD },
    { label: "Blogs", icon: <HiDocumentText />, path: ROUTES.ADMIN_BLOGS },
    { label: "Projects", icon: <HiCollection />, path: ROUTES.ADMIN_PROJECTS },
    { label: "Team", icon: <HiUsers />, path: ROUTES.ADMIN_TEAM },
    { label: "Contacts", icon: <HiMail />, path: ROUTES.ADMIN_CONTACTS },
    { label: "Newsletter", icon: <HiNewspaper />, path: ROUTES.ADMIN_NEWSLETTER },
    { label: "Uploads", icon: <HiUpload />, path: ROUTES.ADMIN_UPLOADS },
    { label: "AI Chat Logs", icon: <HiChatAlt2 />, path: ROUTES.ADMIN_CHAT },
    { label: "Sales Leads", icon: <HiUserGroup />, path: ROUTES.ADMIN_LEADS },
    { label: "Analytics", icon: <HiChartBar />, path: ROUTES.ADMIN_ANALYTICS },
    { label: "Profile", icon: <HiUser />, path: ROUTES.ADMIN_PROFILE },
];

const BREADCRUMB_MAP = {
    [ROUTES.ADMIN_DASHBOARD]: "Dashboard",
    [ROUTES.ADMIN_BLOGS]: "Blogs",
    [ROUTES.ADMIN_PROJECTS]: "Projects",
    [ROUTES.ADMIN_TEAM]: "Team",
    [ROUTES.ADMIN_CONTACTS]: "Contacts",
    [ROUTES.ADMIN_NEWSLETTER]: "Newsletter",
    [ROUTES.ADMIN_UPLOADS]: "Uploads",
    [ROUTES.ADMIN_CHAT]: "AI Chat Logs",
    [ROUTES.ADMIN_LEADS]: "Sales Leads",
    [ROUTES.ADMIN_ANALYTICS]: "Analytics",
    [ROUTES.ADMIN_PROFILE]: "Profile",
};

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate(ROUTES.LOGIN, { replace: true });
    };

    // Build breadcrumb from current path
    const breadcrumb = useMemo(() => {
        const path = location.pathname;
        // Check exact match first
        if (BREADCRUMB_MAP[path]) return BREADCRUMB_MAP[path];
        // Check partial matches for editor routes
        if (path.includes("/blogs/")) return "Blogs";
        if (path.includes("/projects/")) return "Projects";
        if (path.includes("/team/")) return "Team";
        return "Admin";
    }, [location.pathname]);

    const pageTitle = useMemo(() => {
        const path = location.pathname;
        if (path.includes("/new")) return `New ${breadcrumb.replace(/s$/, "")}`;
        if (path.includes("/edit")) return `Edit ${breadcrumb.replace(/s$/, "")}`;
        return breadcrumb;
    }, [location.pathname, breadcrumb]);

    const userInitials = useMemo(() => {
        if (!user) return "A";
        const first = user.firstName || user.name || "";
        const last = user.lastName || "";
        return (first[0] || "") + (last[0] || "") || "A";
    }, [user]);

    const displayName = useMemo(() => {
        if (!user) return "Admin";
        if (user.firstName) return `${user.firstName} ${user.lastName || ""}`.trim();
        return user.name || "Admin";
    }, [user]);

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside
                className={`admin-sidebar ${sidebarOpen ? "admin-sidebar--open" : ""}`}
                role="navigation"
                aria-label="Admin navigation"
            >
                <div className="admin-sidebar__header">
                    <span className="admin-sidebar__logo">
                        <span className="admin-sidebar__logo-icon">A</span>
                        <span className="admin-sidebar__logo-text">AKSHU</span>
                    </span>
                    <button
                        className="admin-sidebar__close"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <HiX size={20} />
                    </button>
                </div>

                <nav className="admin-sidebar__nav">
                    {SIDEBAR_LINKS.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === ROUTES.ADMIN_DASHBOARD}
                            className={({ isActive }) =>
                                `admin-sidebar__link ${isActive ? "admin-sidebar__link--active" : ""}`
                            }
                            onClick={() => setSidebarOpen(false)}
                        >
                            <span className="admin-sidebar__link-icon">{link.icon}</span>
                            <span>{link.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="admin-sidebar__footer">
                    <div className="admin-sidebar__user">
                        <div className="admin-sidebar__avatar">
                            {user?.avatar ? (
                                <img src={user.avatar} alt={displayName} />
                            ) : (
                                <span>{userInitials}</span>
                            )}
                        </div>
                        <div className="admin-sidebar__user-info">
                            <span className="admin-sidebar__user-name">{displayName}</span>
                            <span className="admin-sidebar__user-role">{user?.role || "admin"}</span>
                        </div>
                    </div>
                    <button className="admin-sidebar__logout" onClick={handleLogout}>
                        <HiLogout size={16} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="admin-overlay"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Main Content */}
            <div className="admin-main">
                <header className="admin-topbar">
                    <div className="admin-topbar__left">
                        <button
                            className="admin-topbar__toggle"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Open sidebar"
                        >
                            <HiMenu size={22} />
                        </button>

                        {/* Breadcrumb */}
                        <div className="admin-topbar__breadcrumb">
                            <span className="admin-topbar__breadcrumb-root">Admin</span>
                            <span className="admin-topbar__breadcrumb-sep">/</span>
                            <span className="admin-topbar__breadcrumb-current">{pageTitle}</span>
                        </div>
                    </div>

                    <div className="admin-topbar__right">
                        {/* Search placeholder */}
                        <button className="admin-topbar__icon-btn" aria-label="Search">
                            <HiSearch size={18} />
                        </button>

                        {/* Notifications placeholder */}
                        <button className="admin-topbar__icon-btn" aria-label="Notifications">
                            <HiBell size={18} />
                        </button>

                        {/* Profile dropdown */}
                        <div className="admin-topbar__profile" style={{ position: "relative" }}>
                            <button
                                className="admin-topbar__avatar-btn"
                                onClick={() => setProfileOpen(!profileOpen)}
                                aria-label="Profile menu"
                            >
                                <div className="admin-topbar__avatar-circle">
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt={displayName} />
                                    ) : (
                                        <span>{userInitials}</span>
                                    )}
                                </div>
                                <span className="admin-topbar__avatar-name">{displayName}</span>
                            </button>

                            {profileOpen && (
                                <>
                                    <div
                                        style={{ position: "fixed", inset: 0, zIndex: 40 }}
                                        onClick={() => setProfileOpen(false)}
                                    />
                                    <div className="admin-topbar__dropdown">
                                        <div className="admin-topbar__dropdown-header">
                                            <span style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>
                                                {displayName}
                                            </span>
                                            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)" }}>
                                                {user?.email || ""}
                                            </span>
                                        </div>
                                        <div className="admin-topbar__dropdown-divider" />
                                        <button
                                            className="admin-topbar__dropdown-item"
                                            onClick={() => { setProfileOpen(false); navigate(ROUTES.ADMIN_PROFILE); }}
                                        >
                                            <HiUser size={16} /> Profile
                                        </button>
                                        <div className="admin-topbar__dropdown-divider" />
                                        <button
                                            className="admin-topbar__dropdown-item admin-topbar__dropdown-item--danger"
                                            onClick={() => { setProfileOpen(false); handleLogout(); }}
                                        >
                                            <HiLogout size={16} /> Sign Out
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <div className="admin-content">
                    <Outlet />
                </div>
            </div>

            {/* Toast notifications */}
            <AdminToaster />
        </div>
    );
};

export default AdminLayout;
