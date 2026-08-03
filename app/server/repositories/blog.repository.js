import mongoose from "mongoose";
import BaseRepository from "./base.repository.js";
import Blog from "../models/blog.model.js";

class BlogRepository extends BaseRepository {

    constructor() {
        super(Blog);
    }

    /**
     * Find Blog by ObjectId or Slug
     */
    async findBySlug(identifier) {
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            const doc = await Blog.findById(identifier);
            if (doc) return doc;
        }
        return Blog.findOne({
            slug: identifier.toLowerCase(),
        });
    }

    /**
     * Get Published Blogs
     */
    async findPublished(options = {}) {

        return Blog.find({
            status: "PUBLISHED",
        })
            .sort({
                publishedAt: -1,
            });

    }

    /**
     * Get Featured Blogs
     */
    async findFeatured(limit = 5) {

        return Blog.find({

            featured: true,

            status: "PUBLISHED",

        })
            .sort({
                publishedAt: -1,
            })
            .limit(limit);

    }

    /**
     * Get Latest Blogs
     */
    async latest(limit = 5) {

        return Blog.find({

            status: "PUBLISHED",

        })
            .sort({
                publishedAt: -1,
            })
            .limit(limit);

    }

    /**
     * Find Blogs by Category
     */
    async findByCategory(category) {

        return Blog.find({

            category,

            status: "PUBLISHED",

        })
            .sort({
                publishedAt: -1,
            });

    }

    /**
     * Find Blogs by Tag
     */
    async findByTag(tag) {

        return Blog.find({

            tags: tag,

            status: "PUBLISHED",

        })
            .sort({
                publishedAt: -1,
            });

    }

    /**
     * Search Blogs
     */
    async search(keyword) {

        return Blog.find({

            status: "PUBLISHED",

            $or: [

                {
                    title: {
                        $regex: keyword,
                        $options: "i",
                    },
                },

                {
                    shortDescription: {
                        $regex: keyword,
                        $options: "i",
                    },
                },

                {
                    content: {
                        $regex: keyword,
                        $options: "i",
                    },
                },

                {
                    tags: {
                        $regex: keyword,
                        $options: "i",
                    },
                },

            ],

        }).sort({
            publishedAt: -1,
        });

    }

    /**
     * Count Published Blogs
     */
    async countPublished() {

        return Blog.countDocuments({
            status: "PUBLISHED",
        });

    }

}

export default new BlogRepository();