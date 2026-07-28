import Blog from "../models/blog.model.js";
import Contact from "../models/contact.model.js";
import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import Newsletter from "../models/newsletter.model.js";

class AnalyticsRepository {
    /**
     * Blog Analytics
     */
    async getBlogAnalytics() {
        const [
            total,
            published,
            draft,
            archived,
            featured,
        ] = await Promise.all([
            Blog.countDocuments(),

            Blog.countDocuments({
                status: "PUBLISHED",
            }),

            Blog.countDocuments({
                status: "DRAFT",
            }),

            Blog.countDocuments({
                status: "ARCHIVED",
            }),

            Blog.countDocuments({
                featured: true,
            }),
        ]);

        return {
            total,
            published,
            draft,
            archived,
            featured,
        };
    }

    /**
     * Blogs grouped by category
     */
    async getBlogsByCategory() {
        return Blog.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    count: -1,
                },
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    count: 1,
                },
            },
        ]);
    }

    /**
     * Monthly Blog Growth
     */
    async getMonthlyBlogGrowth(startDate) {
        const match = {};

        if (startDate) {
            match.createdAt = {
                $gte: startDate,
            };
        }

        return Blog.aggregate([
            {
                $match: match,
            },
            {
                $group: {
                    _id: {
                        year: {
                            $year: "$createdAt",
                        },
                        month: {
                            $month: "$createdAt",
                        },
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    count: 1,
                },
            },
        ]);
    }

    /**
     * Contact Analytics
     */
    async getContactAnalytics() {
        const total =
            await Contact.countDocuments();

        return {
            total,
        };
    }

    /**
     * Monthly Contact Growth
     */
    async getMonthlyContactGrowth(startDate) {
        const match = {};

        if (startDate) {
            match.createdAt = {
                $gte: startDate,
            };
        }

        return Contact.aggregate([
            {
                $match: match,
            },
            {
                $group: {
                    _id: {
                        year: {
                            $year: "$createdAt",
                        },
                        month: {
                            $month: "$createdAt",
                        },
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    count: 1,
                },
            },
        ]);
    }

    /**
     * Project Analytics
     */
    async getProjectAnalytics() {
        const total =
            await Project.countDocuments();

        return {
            total,
        };
    }

    /**
     * Monthly Project Growth
     */
    async getMonthlyProjectGrowth(startDate) {
        const match = {};

        if (startDate) {
            match.createdAt = {
                $gte: startDate,
            };
        }

        return Project.aggregate([
            {
                $match: match,
            },
            {
                $group: {
                    _id: {
                        year: {
                            $year: "$createdAt",
                        },
                        month: {
                            $month: "$createdAt",
                        },
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    count: 1,
                },
            },
        ]);
    }

    /**
     * User Analytics
     */
    async getUserAnalytics() {
        const [
            total,
            active,
        ] = await Promise.all([
            User.countDocuments(),

            User.countDocuments({
                isActive: true,
            }),
        ]);

        return {
            total,
            active,
            inactive: Math.max(
                total - active,
                0
            ),
        };
    }

    /**
     * Monthly User Growth
     */
    async getMonthlyUserGrowth(startDate) {
        const match = {};

        if (startDate) {
            match.createdAt = {
                $gte: startDate,
            };
        }

        return User.aggregate([
            {
                $match: match,
            },
            {
                $group: {
                    _id: {
                        year: {
                            $year: "$createdAt",
                        },
                        month: {
                            $month: "$createdAt",
                        },
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    count: 1,
                },
            },
        ]);
    }

    /**
     * Newsletter Analytics
     */
    async getNewsletterAnalytics() {
        const [
            total,
            subscribed,
            unsubscribed,
        ] = await Promise.all([
            Newsletter.countDocuments(),

            Newsletter.countDocuments({
                status: "SUBSCRIBED",
            }),

            Newsletter.countDocuments({
                status: "UNSUBSCRIBED",
            }),
        ]);

        return {
            total,
            subscribed,
            unsubscribed,
        };
    }

    /**
     * Newsletter subscriptions by source
     */
    async getNewsletterBySource() {
        return Newsletter.aggregate([
            {
                $group: {
                    _id: "$source",
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    count: -1,
                },
            },
            {
                $project: {
                    _id: 0,
                    source: "$_id",
                    count: 1,
                },
            },
        ]);
    }

    /**
     * Monthly Newsletter Growth
     */
    async getMonthlyNewsletterGrowth(
        startDate
    ) {
        const match = {
            status: "SUBSCRIBED",
        };

        if (startDate) {
            match.subscribedAt = {
                $gte: startDate,
            };
        }

        return Newsletter.aggregate([
            {
                $match: match,
            },
            {
                $group: {
                    _id: {
                        year: {
                            $year:
                                "$subscribedAt",
                        },
                        month: {
                            $month:
                                "$subscribedAt",
                        },
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    count: 1,
                },
            },
        ]);
    }

    /**
     * Get complete analytics overview
     */
    async getOverview() {
        const [
            blogs,
            contacts,
            projects,
            users,
            newsletter,
        ] = await Promise.all([
            this.getBlogAnalytics(),
            this.getContactAnalytics(),
            this.getProjectAnalytics(),
            this.getUserAnalytics(),
            this.getNewsletterAnalytics(),
        ]);

        return {
            blogs,
            contacts,
            projects,
            users,
            newsletter,
        };
    }
}

export default new AnalyticsRepository();