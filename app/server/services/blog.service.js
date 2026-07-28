import ApiError from "../utils/ApiError.js";
import blogRepository from "../repositories/blog.repository.js";

class BlogService {

    /**
     * Calculate Reading Time
     */
    calculateReadingTime(content) {

        const words = content
            .replace(/<[^>]*>/g, "")
            .trim()
            .split(/\s+/).length;

        return Math.max(
            1,
            Math.ceil(words / 200)
        );

    }

    /**
     * Create Blog
     */
    async createBlog(data, userId) {

        const existingBlog =
            await blogRepository.findBySlug(
                data.slug
            );

        if (existingBlog) {

            throw new ApiError(
                409,
                "A blog with this slug already exists."
            );

        }

        return blogRepository.create({

            ...data,

            readingTime:
                this.calculateReadingTime(
                    data.content
                ),

            author: userId,

            createdBy: userId,

        });

    }

    /**
     * Get Blog by Slug
     */
    async getBlogBySlug(slug) {

        const blog =
            await blogRepository.findBySlug(
                slug
            );

        if (!blog) {

            throw new ApiError(
                404,
                "Blog not found."
            );

        }

        return blog;

    }

    /**
     * Get Published Blogs
     */
    async getPublishedBlogs() {

        return blogRepository.findPublished();

    }

    /**
     * Get Featured Blogs
     */
    async getFeaturedBlogs(limit = 5) {

        return blogRepository.findFeatured(limit);

    }

    /**
     * Get Latest Blogs
     */
    async getLatestBlogs(limit = 5) {

        return blogRepository.latest(limit);

    }

    /**
     * Update Blog
     */
    async updateBlog(id, data, userId) {

        const blog =
            await blogRepository.findById(id);

        if (!blog) {

            throw new ApiError(
                404,
                "Blog not found."
            );

        }

        if (
            data.slug &&
            data.slug !== blog.slug
        ) {

            const existing =
                await blogRepository.findBySlug(
                    data.slug
                );

            if (existing) {

                throw new ApiError(
                    409,
                    "Slug already exists."
                );

            }

        }

        if (data.content) {

            data.readingTime =
                this.calculateReadingTime(
                    data.content
                );

        }

        return blogRepository.updateById(

            id,

            {

                ...data,

                updatedBy: userId,

            }

        );

    }

    /**
     * Publish Blog
     */
    async publishBlog(id, userId) {

        const blog =
            await blogRepository.findById(id);

        if (!blog) {

            throw new ApiError(
                404,
                "Blog not found."
            );

        }

        return blogRepository.updateById(

            id,

            {

                status: "PUBLISHED",

                publishedAt: new Date(),

                updatedBy: userId,

            }

        );

    }

    /**
     * Archive Blog
     */
    async archiveBlog(id, userId) {

        const blog =
            await blogRepository.findById(id);

        if (!blog) {

            throw new ApiError(
                404,
                "Blog not found."
            );

        }

        return blogRepository.updateById(

            id,

            {

                status: "ARCHIVED",

                updatedBy: userId,

            }

        );

    }

    /**
     * Delete Blog
     */
    async deleteBlog(id) {

        const blog =
            await blogRepository.findById(id);

        if (!blog) {

            throw new ApiError(
                404,
                "Blog not found."
            );

        }

        await blogRepository.deleteById(id);

        return {
            success: true,
        };

    }

    /**
     * Search Blogs
     */
    async searchBlogs(keyword) {

        return blogRepository.search(keyword);

    }

}

export default new BlogService();