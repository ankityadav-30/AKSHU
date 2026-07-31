import BaseRepository from "./base.repository.js";
import User from "../models/user.model.js";

class UserRepository extends BaseRepository {

    constructor() {
        super(User);
    }

    /**
     * Find user by email
     */
    async findByEmail(email) {
        return this.model.findOne({
            email: email.toLowerCase(),
        });
    }

    /**
     * Find user by email with password included
     */
    async findByEmailWithPassword(email) {
        return this.model
            .findOne({
                email: email.toLowerCase(),
            })
            .select("+password");
    }

    /**
     * Find user by ID with password included
     */
    async findByIdWithPassword(id) {
        return this.model.findById(id).select("+password");
    }

    /**
     * Find public user by email
     */
    async findPublicByEmail(email) {
        return this.model
            .findOne({
                email: email.toLowerCase(),
            })
            .select("-password");
    }

    /**
     * Update last login
     */
    async updateLastLogin(userId) {
        return this.model.findByIdAndUpdate(
            userId,
            {
                lastLogin: new Date(),
            },
            {
                new: true,
            }
        );
    }

    /**
     * Find active users
     */
    async findActiveUsers() {
        return this.model.find({
            isActive: true,
        });
    }

    /**
     * Check email availability
     */
    async emailExists(email) {
        return this.model.exists({
            email: email.toLowerCase(),
        });
    }

}

export default new UserRepository();