// APP/client/src/admin/pages/Analytics.jsx

import { useState, useEffect, useCallback } from "react";
import {
    HiChartBar, HiDocumentText, HiCollection, HiUsers,
    HiMail, HiNewspaper, HiRefresh,
} from "react-icons/hi";
import api from "../../services/api.js";
import PageHeader from "../components/PageHeader.jsx";
import StatCard from "../components/StatCard.jsx";
import AdminChart, { CHART_COLORS } from "../components/AdminChart.jsx";
import { SkeletonStatCard } from "../components/Skeleton.jsx";
import { showError } from "../components/Toast.jsx";

const Analytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [months, setMonths] = useState(12);

    const fetchAnalytics = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/analytics?months=${months}`);
            setAnalytics(data?.data || {});
        } catch (err) {
            showError(err?.message || "Failed to load analytics");
        } finally {
            setLoading(false);
        }
    }, [months]);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    const overview = analytics?.overview || {};
    const blogs = analytics?.blogs || {};
    const contacts = analytics?.contacts || {};
    const projects = analytics?.projects || {};
    const users = analytics?.users || {};
    const newsletter = analytics?.newsletter || {};

    // Blog Growth Chart
    const blogChartData = blogs.monthlyGrowth ? {
        labels: blogs.monthlyGrowth.map((m) => m._id || m.month || ""),
        datasets: [{
            label: "Blogs Published",
            data: blogs.monthlyGrowth.map((m) => m.count),
            borderColor: CHART_COLORS[0],
            backgroundColor: `${CHART_COLORS[0]}20`,
            fill: true,
            tension: 0.4,
        }],
    } : null;

    // Contact Growth Chart
    const contactChartData = contacts.monthlyGrowth ? {
        labels: contacts.monthlyGrowth.map((m) => m._id || m.month || ""),
        datasets: [{
            label: "Inquiries Received",
            data: contacts.monthlyGrowth.map((m) => m.count),
            backgroundColor: `${CHART_COLORS[1]}40`,
            borderColor: CHART_COLORS[1],
            borderWidth: 2,
            borderRadius: 6,
        }],
    } : null;

    // Newsletter Sources Doughnut
    const newsletterSourceData = newsletter.sources ? {
        labels: newsletter.sources.map((s) => s._id || s.source || "Website"),
        datasets: [{
            data: newsletter.sources.map((s) => s.count),
            backgroundColor: CHART_COLORS,
            borderWidth: 0,
        }],
    } : null;

    // Blog Categories Doughnut
    const blogCategoryData = blogs.categories ? {
        labels: blogs.categories.map((c) => c._id || c.category || "General"),
        datasets: [{
            data: blogs.categories.map((c) => c.count),
            backgroundColor: CHART_COLORS,
            borderWidth: 0,
        }],
    } : null;

    return (
        <div className="admin-page">
            <PageHeader
                title="Analytics & Reports"
                subtitle="System-wide metrics, growth trends, and content performance."
                actions={
                    <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
                        <select
                            className="admin-select"
                            value={months}
                            onChange={(e) => setMonths(Number(e.target.value))}
                            style={{ width: "auto" }}
                        >
                            <option value={3}>Last 3 months</option>
                            <option value={6}>Last 6 months</option>
                            <option value={12}>Last 12 months</option>
                        </select>
                        <button className="admin-btn admin-btn--ghost" onClick={fetchAnalytics}>
                            <HiRefresh size={16} /> Refresh
                        </button>
                    </div>
                }
            />

            {/* Overview Stats */}
            <div className="admin-stats-grid">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => <SkeletonStatCard key={i} />)
                ) : (
                    <>
                        <StatCard label="Total Users" value={users.summary?.totalUsers ?? overview.totalUsers ?? 0} icon={<HiUsers size={18} />} color="#6366F1" />
                        <StatCard label="Total Blogs" value={blogs.summary?.totalBlogs ?? overview.totalBlogs ?? 0} icon={<HiDocumentText size={18} />} color="#8B5CF6" />
                        <StatCard label="Total Projects" value={projects.summary?.totalProjects ?? overview.totalProjects ?? 0} icon={<HiCollection size={18} />} color="#22D3EE" />
                        <StatCard label="Total Inquiries" value={contacts.summary?.totalContacts ?? overview.totalContacts ?? 0} icon={<HiMail size={18} />} color="#3B82F6" />
                        <StatCard label="Subscribers" value={newsletter.summary?.totalSubscribers ?? overview.totalSubscribers ?? 0} icon={<HiNewspaper size={18} />} color="#EC4899" />
                        <StatCard label="Unread Contacts" value={contacts.summary?.unreadContacts ?? 0} icon={<HiMail size={18} />} color="#F59E0B" />
                    </>
                )}
            </div>

            {/* Charts Grid */}
            <div className="admin-grid-2" style={{ marginBottom: "var(--space-6)" }}>
                {/* Blog Growth */}
                <div className="admin-card">
                    <div className="admin-card__header">
                        <h3 className="admin-card__title">Blog Publication Growth</h3>
                    </div>
                    <div className="admin-card__body">
                        {blogChartData ? (
                            <AdminChart type="line" data={blogChartData} height="260px" />
                        ) : (
                            <div className="admin-skeleton admin-skeleton--rect" style={{ width: "100%", height: 260 }} />
                        )}
                    </div>
                </div>

                {/* Contact Growth */}
                <div className="admin-card">
                    <div className="admin-card__header">
                        <h3 className="admin-card__title">Inquiry Growth</h3>
                    </div>
                    <div className="admin-card__body">
                        {contactChartData ? (
                            <AdminChart type="bar" data={contactChartData} height="260px" />
                        ) : (
                            <div className="admin-skeleton admin-skeleton--rect" style={{ width: "100%", height: 260 }} />
                        )}
                    </div>
                </div>
            </div>

            {/* Breakdown Doughnuts */}
            <div className="admin-grid-2">
                {/* Categories */}
                <div className="admin-card">
                    <div className="admin-card__header">
                        <h3 className="admin-card__title">Blogs by Category</h3>
                    </div>
                    <div className="admin-card__body">
                        {blogCategoryData ? (
                            <AdminChart type="doughnut" data={blogCategoryData} height="260px" />
                        ) : (
                            <div className="admin-skeleton admin-skeleton--rect" style={{ width: "100%", height: 260 }} />
                        )}
                    </div>
                </div>

                {/* Newsletter Sources */}
                <div className="admin-card">
                    <div className="admin-card__header">
                        <h3 className="admin-card__title">Subscriber Sources</h3>
                    </div>
                    <div className="admin-card__body">
                        {newsletterSourceData ? (
                            <AdminChart type="doughnut" data={newsletterSourceData} height="260px" />
                        ) : (
                            <div className="admin-skeleton admin-skeleton--rect" style={{ width: "100%", height: 260 }} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
