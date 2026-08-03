// APP/client/src/admin/pages/Dashboard.jsx

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    HiDocumentText, HiCollection, HiUsers, HiMail,
    HiNewspaper, HiPlusCircle, HiEye,
} from "react-icons/hi";
import api from "../../services/api.js";
import { ROUTES } from "../../utils/constants.js";
import { useAuth } from "../../context/AuthContext.jsx";
import StatCard from "../components/StatCard.jsx";
import { SkeletonStatCard } from "../components/Skeleton.jsx";
import AdminChart, { CHART_COLORS } from "../components/AdminChart.jsx";
import Badge from "../components/Badge.jsx";
import { showError } from "../components/Toast.jsx";

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useAuth();

    const fetchDashboard = useCallback(async () => {
        setLoading(true);
        try {
            const [dashRes, analyticsRes] = await Promise.allSettled([
                api.get("/dashboard"),
                api.get("/analytics?months=6"),
            ]);

            if (dashRes.status === "fulfilled") {
                setData(dashRes.value.data?.data || {});
            }
            if (analyticsRes.status === "fulfilled") {
                setAnalytics(analyticsRes.value.data?.data || {});
            }
        } catch (err) {
            showError(err?.message || "Failed to load dashboard");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    const stats = data?.statistics || {};
    const activity = data?.recentActivity || [];

    // Chart data from analytics
    const blogGrowthChart = analytics?.blogs?.monthlyGrowth
        ? {
            labels: analytics.blogs.monthlyGrowth.map((m) => m._id || m.month || ""),
            datasets: [{
                label: "Blogs",
                data: analytics.blogs.monthlyGrowth.map((m) => m.count),
                borderColor: CHART_COLORS[0],
                backgroundColor: `${CHART_COLORS[0]}20`,
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6,
            }],
        }
        : null;

    const contactGrowthChart = analytics?.contacts?.monthlyGrowth
        ? {
            labels: analytics.contacts.monthlyGrowth.map((m) => m._id || m.month || ""),
            datasets: [{
                label: "Inquiries",
                data: analytics.contacts.monthlyGrowth.map((m) => m.count),
                backgroundColor: `${CHART_COLORS[1]}40`,
                borderColor: CHART_COLORS[1],
                borderWidth: 2,
                borderRadius: 6,
                barPercentage: 0.6,
            }],
        }
        : null;

    const displayName = user?.firstName || user?.name || "Admin";

    const ACTIVITY_ICONS = {
        BLOG: { icon: <HiDocumentText size={14} />, cls: "admin-activity__icon--blog" },
        PROJECT: { icon: <HiCollection size={14} />, cls: "admin-activity__icon--project" },
        CONTACT: { icon: <HiMail size={14} />, cls: "admin-activity__icon--contact" },
        NEWSLETTER: { icon: <HiNewspaper size={14} />, cls: "admin-activity__icon--newsletter" },
    };

    return (
        <div className="admin-page">
            {/* Welcome */}
            <div style={{ marginBottom: "var(--space-6)" }}>
                <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-1)" }}>
                    Welcome back, {displayName}
                </h1>
                <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-tertiary)" }}>
                    Here's what's happening with AKSHU Technologies today.
                </p>
            </div>

            {/* Stat Cards */}
            <div className="admin-stats-grid">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => <SkeletonStatCard key={i} />)
                ) : (
                    <>
                        <StatCard label="Total Blogs" value={stats.blogs?.total ?? 0} icon={<HiDocumentText size={18} />} color="#8B5CF6" />
                        <StatCard label="Published" value={stats.blogs?.published ?? 0} icon={<HiDocumentText size={18} />} color="#10B981" />
                        <StatCard label="Draft" value={stats.blogs?.draft ?? 0} icon={<HiDocumentText size={18} />} color="#F59E0B" />
                        <StatCard label="Projects" value={stats.projects?.total ?? 0} icon={<HiCollection size={18} />} color="#6366F1" />
                        <StatCard label="Team Members" value={stats.team?.total ?? 0} icon={<HiUsers size={18} />} color="#22D3EE" />
                        <StatCard label="Contacts" value={stats.contacts?.total ?? 0} icon={<HiMail size={18} />} color="#3B82F6" />
                        <StatCard label="Subscribers" value={stats.newsletter?.subscribed ?? 0} icon={<HiNewspaper size={18} />} color="#EC4899" />
                    </>
                )}
            </div>

            {/* Content Grid */}
            <div className="admin-grid-2" style={{ marginBottom: "var(--space-8)" }}>
                {/* Charts */}
                {blogGrowthChart && (
                    <div className="admin-card">
                        <div className="admin-card__header">
                            <h3 className="admin-card__title">Blog Growth</h3>
                        </div>
                        <div className="admin-card__body">
                            <AdminChart type="line" data={blogGrowthChart} height="240px" />
                        </div>
                    </div>
                )}

                {contactGrowthChart && (
                    <div className="admin-card">
                        <div className="admin-card__header">
                            <h3 className="admin-card__title">Monthly Inquiries</h3>
                        </div>
                        <div className="admin-card__body">
                            <AdminChart type="bar" data={contactGrowthChart} height="240px" />
                        </div>
                    </div>
                )}
            </div>

            <div className="admin-grid-2">
                {/* Recent Activity */}
                <div className="admin-card">
                    <div className="admin-card__header">
                        <h3 className="admin-card__title">Recent Activity</h3>
                    </div>
                    <div className="admin-card__body" style={{ padding: "var(--space-4) var(--space-6)" }}>
                        {activity.length === 0 ? (
                            <p style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-sm)", textAlign: "center", padding: "var(--space-6) 0" }}>
                                No recent activity.
                            </p>
                        ) : (
                            <div className="admin-activity">
                                {activity.map((item, idx) => {
                                    const meta = ACTIVITY_ICONS[item.type] || ACTIVITY_ICONS.BLOG;
                                    return (
                                        <div key={idx} className="admin-activity__item">
                                            <div className={`admin-activity__icon ${meta.cls}`}>
                                                {meta.icon}
                                            </div>
                                            <div className="admin-activity__content">
                                                <div className="admin-activity__title">{item.title}</div>
                                                <div className="admin-activity__meta">
                                                    {item.type} • {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
                                                </div>
                                            </div>
                                            {item.status && <Badge status={item.status} />}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="admin-card">
                    <div className="admin-card__header">
                        <h3 className="admin-card__title">Quick Actions</h3>
                    </div>
                    <div className="admin-card__body">
                        <div className="admin-quick-actions">
                            <button className="admin-quick-action" onClick={() => navigate(ROUTES.ADMIN_BLOG_NEW)}>
                                <span className="admin-quick-action__icon"><HiPlusCircle /></span>
                                New Blog
                            </button>
                            <button className="admin-quick-action" onClick={() => navigate(ROUTES.ADMIN_PROJECT_NEW)}>
                                <span className="admin-quick-action__icon"><HiPlusCircle /></span>
                                New Project
                            </button>
                            <button className="admin-quick-action" onClick={() => navigate(ROUTES.ADMIN_TEAM_NEW)}>
                                <span className="admin-quick-action__icon"><HiPlusCircle /></span>
                                Add Member
                            </button>
                            <button className="admin-quick-action" onClick={() => navigate(ROUTES.ADMIN_CONTACTS)}>
                                <span className="admin-quick-action__icon"><HiEye /></span>
                                View Messages
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
