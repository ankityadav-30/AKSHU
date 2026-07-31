// APP/client/src/admin/layout/AdminLayout.jsx
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
    HiHome, HiCollection, HiDocumentText, HiUsers,
    HiMail, HiNewspaper, HiChartBar, HiUser, HiLogout, HiMenu, HiX,
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext.jsx";
import { ROUTES } from "../../utils/constants.js";
import "./AdminLayout.css";

const SIDEBAR_LINKS = [
    { label: "Dashboard", icon: <HiHome />, path: ROUTES.ADMIN_DASHBOARD },
    { label: "Projects", icon: <HiCollection />, path: ROUTES.ADMIN_PROJECTS },
    { label: "Blogs", icon: <HiDocumentText />, path: ROUTES.ADMIN_BLOGS },
    { label: "Team", icon: <HiUsers />, path: ROUTES.ADMIN_TEAM },
    { label: "Contacts", icon: <HiMail />, path: ROUTES.ADMIN_CONTACTS },
    { label: "Newsletter", icon: <HiNewspaper />, path: ROUTES.ADMIN_NEWSLETTER },
    { label: "Analytics", icon: <HiChartBar />, path: ROUTES.ADMIN_ANALYTICS },
    { label: "Profile", icon: <HiUser />, path: ROUTES.ADMIN_PROFILE },
];

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate(ROUTES.LOGIN, { replace: true });
    };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? "admin-sidebar--open" : ""}`}>
                <div className="admin-sidebar__header">
                    <span className="admin-sidebar__logo">
                        <span className="admin-sidebar__logo-icon">A</span>
                        Admin
                    </span>
                    <button className="admin-sidebar__close" onClick={() => setSidebarOpen(false)}>
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
                            {link.icon}
                            <span>{link.label}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className="admin-sidebar__footer">
                    <div className="admin-sidebar__user">
                        <span className="admin-sidebar__user-name">{user?.name || "Admin"}</span>
                        <span className="admin-sidebar__user-role">{user?.role || "admin"}</span>
                    </div>
                    <button className="admin-sidebar__logout" onClick={handleLogout}>
                        <HiLogout size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

            {/* Main Content */}
            <div className="admin-main">
                <header className="admin-topbar">
                    <button className="admin-topbar__toggle" onClick={() => setSidebarOpen(true)}>
                        <HiMenu size={22} />
                    </button>
                    <h2 className="admin-topbar__title">Admin Panel</h2>
                </header>
                <div className="admin-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
