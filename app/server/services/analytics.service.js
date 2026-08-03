import analyticsRepository from "../repositories/analytics.repository.js";

class AnalyticsService {
    /**
     * Calculate analytics start date
     *
     * @param {number} months
     * @returns {Date}
     */
    getStartDate(months = 12) {
        const date = new Date();

        date.setUTCDate(1);
        date.setUTCHours(0, 0, 0, 0);

        date.setUTCMonth(
            date.getUTCMonth() - (months - 1)
        );

        return date;
    }

    /**
     * Get Analytics Overview
     */
    async getOverview() {
        return analyticsRepository.getOverview();
    }

    /**
     * Get Blog Analytics
     */
    async getBlogAnalytics(months = 12) {
        const startDate =
            this.getStartDate(months);

        const [
            summary,
            categories,
            monthlyGrowth,
        ] = await Promise.all([
            analyticsRepository.getBlogAnalytics(),

            analyticsRepository.getBlogsByCategory(),

            analyticsRepository.getMonthlyBlogGrowth(
                startDate
            ),
        ]);

        return {
            summary,
            categories,
            monthlyGrowth,
        };
    }

    /**
     * Get Contact Analytics
     */
    async getContactAnalytics(months = 12) {
        const startDate =
            this.getStartDate(months);

        const [
            summary,
            monthlyGrowth,
        ] = await Promise.all([
            analyticsRepository.getContactAnalytics(),

            analyticsRepository.getMonthlyContactGrowth(
                startDate
            ),
        ]);

        return {
            summary,
            monthlyGrowth,
        };
    }

    /**
     * Get Project Analytics
     */
    async getProjectAnalytics(months = 12) {
        const startDate =
            this.getStartDate(months);

        const [
            summary,
            monthlyGrowth,
        ] = await Promise.all([
            analyticsRepository.getProjectAnalytics(),

            analyticsRepository.getMonthlyProjectGrowth(
                startDate
            ),
        ]);

        return {
            summary,
            monthlyGrowth,
        };
    }

    /**
     * Get User Analytics
     */
    async getUserAnalytics(months = 12) {
        const startDate =
            this.getStartDate(months);

        const [
            summary,
            monthlyGrowth,
        ] = await Promise.all([
            analyticsRepository.getUserAnalytics(),

            analyticsRepository.getMonthlyUserGrowth(
                startDate
            ),
        ]);

        return {
            summary,
            monthlyGrowth,
        };
    }

    /**
     * Get Newsletter Analytics
     */
    async getNewsletterAnalytics(
        months = 12
    ) {
        const startDate =
            this.getStartDate(months);

        const [
            summary,
            sources,
            monthlyGrowth,
        ] = await Promise.all([
            analyticsRepository.getNewsletterAnalytics(),

            analyticsRepository.getNewsletterBySource(),

            analyticsRepository.getMonthlyNewsletterGrowth(
                startDate
            ),
        ]);

        return {
            summary,
            sources,
            monthlyGrowth,
        };
    }

    /**
     * Get Complete Analytics
     */
    async getAnalytics(months = 12) {
        const [
            blogs,
            contacts,
            projects,
            users,
            newsletter,
        ] = await Promise.all([
            this.getBlogAnalytics(months),
            this.getContactAnalytics(months),
            this.getProjectAnalytics(months),
            this.getUserAnalytics(months),
            this.getNewsletterAnalytics(
                months
            ),
        ]);

        return {
            period: {
                months,
                startDate:
                    this.getStartDate(months),
                endDate: new Date(),
            },

            blogs,
            contacts,
            projects,
            users,
            newsletter,
        };
    }
}

export default new AnalyticsService();