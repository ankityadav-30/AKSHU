import User from "../models/user.model.js";
import Blog from "../models/blog.model.js";
import Contact from "../models/contact.model.js";
import Project from "../models/project.model.js";
import Team from "../models/team.model.js";
import Newsletter from "../models/newsletter.model.js";

class DashboardRepository {
    /**
     * Count Users
     */
    async countUsers() {
        return User.countDocuments();
    }

    /**
     * Count Active Users
     */
    async countActiveUsers() {
        return User.countDocuments({
            isActive: true,
        });
    }

    /**
     * Count Blogs
     */
    async countBlogs() {
        return Blog.countDocuments();
    }

    /**
     * Count Published Blogs
     */
    async countPublishedBlogs() {
        return Blog.countDocuments({
            status: "PUBLISHED",
        });
    }

    /**
     * Count Draft Blogs
     */
    async countDraftBlogs() {
        return Blog.countDocuments({
            status: "DRAFT",
        });
    }

    /**
     * Count Projects
     */
    async countProjects() {
        return Project.countDocuments();
    }

    /**
     * Count Contacts
     */
    async countContacts() {
        return Contact.countDocuments();
    }

    /**
     * Count Team Members
     */
    async countTeamMembers() {
        return Team.countDocuments();
    }

    /**
     * Count Newsletter Subscribers
     */
    async countNewsletterSubscribers() {
        return Newsletter.countDocuments({
            status: "SUBSCRIBED",
        });
    }

    /**
     * Get Recent Blogs
     */
    async getRecentBlogs(limit = 5) {
        return Blog.find()
            .select(
                "title slug status publishedAt createdAt"
            )
            .sort({
                createdAt: -1,
            })
            .limit(limit)
            .lean();
    }

    /**
     * Get Recent Contacts
     */
    async getRecentContacts(limit = 5) {
        return Contact.find()
            .sort({
                createdAt: -1,
            })
            .limit(limit)
            .lean();
    }

    /**
     * Get Recent Projects
     */
    async getRecentProjects(limit = 5) {
        return Project.find()
            .sort({
                createdAt: -1,
            })
            .limit(limit)
            .lean();
    }

    /**
     * Get Recent Newsletter Subscribers
     */
    async getRecentSubscribers(limit = 5) {
        return Newsletter.find({
            status: "SUBSCRIBED",
        })
            .select(
                "email source subscribedAt createdAt"
            )
            .sort({
                subscribedAt: -1,
            })
            .limit(limit)
            .lean();
    }

    /**
     * Get Recent Activity
     *
     * Returns recent records from the major
     * administrative modules. The service layer
     * can normalize and combine these records.
     */
    async getRecentActivity(limit = 5) {
        const [
            blogs,
            contacts,
            projects,
            subscribers,
        ] = await Promise.all([
            this.getRecentBlogs(limit),
            this.getRecentContacts(limit),
            this.getRecentProjects(limit),
            this.getRecentSubscribers(limit),
        ]);

        return {
            blogs,
            contacts,
            projects,
            subscribers,
        };
    }

    /**
     * Get Dashboard Counts
     */
    async getCounts() {
        const [
            totalUsers,
            activeUsers,
            totalBlogs,
            publishedBlogs,
            draftBlogs,
            totalProjects,
            totalContacts,
            totalTeamMembers,
            newsletterSubscribers,
        ] = await Promise.all([
            this.countUsers(),
            this.countActiveUsers(),
            this.countBlogs(),
            this.countPublishedBlogs(),
            this.countDraftBlogs(),
            this.countProjects(),
            this.countContacts(),
            this.countTeamMembers(),
            this.countNewsletterSubscribers(),
        ]);

        return {
            totalUsers,
            activeUsers,
            totalBlogs,
            publishedBlogs,
            draftBlogs,
            totalProjects,
            totalContacts,
            totalTeamMembers,
            newsletterSubscribers,
        };
    }
}

export default new DashboardRepository();