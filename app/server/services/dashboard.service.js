import dashboardRepository from "../repositories/dashboard.repository.js";

class DashboardService {
    /**
     * Get Dashboard Summary
     */
    async getSummary() {
        const counts =
            await dashboardRepository.getCounts();

        return counts;
    }

    /**
     * Get Dashboard Statistics
     */
    async getStatistics() {
        const counts =
            await dashboardRepository.getCounts();

        return {
            users: {
                total: counts.totalUsers,
                active: counts.activeUsers,
                inactive: Math.max(
                    counts.totalUsers -
                        counts.activeUsers,
                    0
                ),
            },

            blogs: {
                total: counts.totalBlogs,
                published:
                    counts.publishedBlogs,
                draft: counts.draftBlogs,
            },

            projects: {
                total: counts.totalProjects,
            },

            contacts: {
                total: counts.totalContacts,
            },

            team: {
                total:
                    counts.totalTeamMembers,
            },

            newsletter: {
                subscribed:
                    counts.newsletterSubscribers,
            },
        };
    }

    /**
     * Get Recent Activity
     */
    async getRecentActivity(limit = 5) {
        const activity =
            await dashboardRepository.getRecentActivity(
                limit
            );

        const normalizedActivity = [
            ...activity.blogs.map((blog) => ({
                type: "BLOG",
                id: blog._id,
                title: blog.title,
                status: blog.status,
                createdAt: blog.createdAt,
            })),

            ...activity.contacts.map(
                (contact) => ({
                    type: "CONTACT",
                    id: contact._id,
                    title:
                        contact.subject ||
                        contact.email ||
                        "Contact message",
                    createdAt:
                        contact.createdAt,
                })
            ),

            ...activity.projects.map(
                (project) => ({
                    type: "PROJECT",
                    id: project._id,
                    title:
                        project.title ||
                        project.name ||
                        "Project",
                    createdAt:
                        project.createdAt,
                })
            ),

            ...activity.subscribers.map(
                (subscriber) => ({
                    type: "NEWSLETTER",
                    id: subscriber._id,
                    title: subscriber.email,
                    source:
                        subscriber.source,
                    createdAt:
                        subscriber.subscribedAt ||
                        subscriber.createdAt,
                })
            ),
        ];

        return normalizedActivity
            .sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            )
            .slice(0, limit);
    }

    /**
     * Get Complete Dashboard Data
     *
     * Intended for the main admin dashboard.
     */
    async getDashboard(limit = 5) {
        const [
            statistics,
            recentActivity,
        ] = await Promise.all([
            this.getStatistics(),
            this.getRecentActivity(limit),
        ]);

        return {
            statistics,
            recentActivity,
        };
    }
}

export default new DashboardService();