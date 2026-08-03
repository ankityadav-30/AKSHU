import mongoose from "mongoose";
import BaseRepository from "./base.repository.js";
import Team from "../models/team.model.js";

class TeamRepository extends BaseRepository {
    constructor() {
        super(Team);
    }

    /**
     * Find member by email
     */
    async findByEmail(email) {
        return this.model.findOne({
            email: email.toLowerCase(),
        });
    }

    /**
     * Find member by Mongo ID or Slug
     */
    async findByIdOrSlug(identifier) {
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            const doc = await this.model.findById(identifier);
            if (doc) return doc;
        }
        return this.model.findOne({
            slug: identifier.toLowerCase(),
        });
    }

    /**
     * Get active members
     */
    async findActive() {
        return this.model
            .find({
                isActive: true,
            })
            .sort({
                displayPriority: -1,
                displayOrder: 1,
                createdAt: 1,
            });
    }

    /**
     * Get featured members
     */
    async findFeatured(limit = 6) {
        return this.model
            .find({
                featured: true,
                isActive: true,
            })
            .sort({
                displayPriority: -1,
                displayOrder: 1,
                createdAt: 1,
            })
            .limit(limit);
    }

    /**
     * Search members
     */
    async search(keyword) {
        return this.model.find({
            $or: [
                { firstName: { $regex: keyword, $options: "i" } },
                { lastName: { $regex: keyword, $options: "i" } },
                { designation: { $regex: keyword, $options: "i" } },
                { department: { $regex: keyword, $options: "i" } },
                { skills: { $regex: keyword, $options: "i" } },
                { techStack: { $regex: keyword, $options: "i" } },
            ],
        });
    }

    /**
     * Count Active Members
     */
    async countActive() {
        return this.model.countDocuments({
            isActive: true,
        });
    }
}

export default new TeamRepository();