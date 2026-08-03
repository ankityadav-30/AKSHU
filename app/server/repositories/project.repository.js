import mongoose from "mongoose";
import BaseRepository from "./base.repository.js";
import Project from "../models/project.model.js";

class ProjectRepository extends BaseRepository {

    constructor() {
        super(Project);
    }

    /**
     * Find project by ObjectId or Slug
     */
    async findBySlug(identifier) {
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            const doc = await this.model.findById(identifier);
            if (doc) return doc;
        }
        return this.model.findOne({
            slug: identifier.toLowerCase(),
        });
    }

    /**
     * Get published projects
     */
    async findPublished(options = {}) {
        return this.model
            .find({
                status: "PUBLISHED",
            })
            .sort(options.sort || { createdAt: -1 });
    }

    /**
     * Get featured projects
     */
    async findFeatured(limit = 6) {
        return this.model
            .find({
                featured: true,
                status: "PUBLISHED",
            })
            .sort({ createdAt: -1 })
            .limit(limit);
    }

    /**
     * Find by category
     */
    async findByCategory(category) {
        return this.model.find({
            category,
            status: "PUBLISHED",
        });
    }

    /**
     * Search projects
     */
    async search(keyword) {

        return this.model.find({
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
                    technologies: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
            ],
        });

    }

    /**
     * Latest Projects
     */
    async latest(limit = 5) {
        return this.model
            .find({
                status: "PUBLISHED",
            })
            .sort({
                createdAt: -1,
            })
            .limit(limit);
    }

    /**
     * Count Published Projects
     */
    async countPublished() {
        return this.model.countDocuments({
            status: "PUBLISHED",
        });
    }

}

export default new ProjectRepository();