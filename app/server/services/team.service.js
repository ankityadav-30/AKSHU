import ApiError from "../utils/ApiError.js";
import teamRepository from "../repositories/team.repository.js";

class TeamService {

    normalizeTeamData(data) {
        const normalized = { ...data };

        if (data.name && (!data.firstName || !data.lastName)) {
            const parts = data.name.trim().split(/\s+/);
            normalized.firstName = parts[0];
            normalized.lastName = parts.slice(1).join(" ") || "";
            delete normalized.name;
        }

        if (data.image && !data.profileImage) {
            normalized.profileImage = data.image;
            delete normalized.image;
        }

        if (data.order !== undefined && data.displayOrder === undefined) {
            normalized.displayOrder = data.order;
            delete normalized.order;
        }

        if (
            data.linkedin ||
            data.github ||
            data.portfolio ||
            data.twitter ||
            data.instagram
        ) {
            normalized.socialLinks = {
                ...(data.socialLinks || {}),
                ...(data.linkedin && { linkedin: data.linkedin }),
                ...(data.github && { github: data.github }),
                ...(data.portfolio && { portfolio: data.portfolio }),
                ...(data.twitter && { twitter: data.twitter }),
                ...(data.instagram && { instagram: data.instagram }),
            };
            delete normalized.linkedin;
            delete normalized.github;
            delete normalized.portfolio;
            delete normalized.twitter;
            delete normalized.instagram;
        }

        return normalized;
    }

    /**
     * Create Team Member
     */
    async createMember(data, userId) {
        const normalizedData = this.normalizeTeamData(data);

        const existingMember =
            await teamRepository.findByEmail(normalizedData.email);

        if (existingMember) {
            throw new ApiError(
                409,
                "A team member with this email already exists."
            );
        }

        return teamRepository.create({
            ...normalizedData,
            createdBy: userId,
        });

    }

    /**
     * Get Active Members
     */
    async getActiveMembers() {

        return teamRepository.findActive();

    }

    /**
     * Get Featured Members
     */
    async getFeaturedMembers(limit = 6) {

        return teamRepository.findFeatured(limit);

    }

    /**
     * Get Member By ID
     */
    async getMemberById(id) {

        const member =
            await teamRepository.findById(id);

        if (!member) {
            throw new ApiError(
                404,
                "Team member not found."
            );
        }

        return member;

    }

    /**
     * Update Team Member
     */
    async updateMember(id, data, userId) {
        const normalizedData = this.normalizeTeamData(data);

        const member =
            await teamRepository.findById(id);

        if (!member) {
            throw new ApiError(
                404,
                "Team member not found."
            );
        }

        if (
            normalizedData.email &&
            normalizedData.email !== member.email
        ) {

            const existing =
                await teamRepository.findByEmail(
                    normalizedData.email
                );

            if (existing) {

                throw new ApiError(
                    409,
                    "Email already exists."
                );

            }

        }

        return teamRepository.updateById(
            id,
            {
                ...normalizedData,
                updatedBy: userId,
            }
        );

    }

    /**
     * Activate Member
     */
    async activateMember(id, userId) {

        const member =
            await teamRepository.findById(id);

        if (!member) {

            throw new ApiError(
                404,
                "Team member not found."
            );

        }

        return teamRepository.updateById(
            id,
            {
                isActive: true,
                updatedBy: userId,
            }
        );

    }

    /**
     * Deactivate Member
     */
    async deactivateMember(id, userId) {

        const member =
            await teamRepository.findById(id);

        if (!member) {

            throw new ApiError(
                404,
                "Team member not found."
            );

        }

        return teamRepository.updateById(
            id,
            {
                isActive: false,
                updatedBy: userId,
            }
        );

    }

    /**
     * Delete Member
     */
    async deleteMember(id) {

        const member =
            await teamRepository.findById(id);

        if (!member) {

            throw new ApiError(
                404,
                "Team member not found."
            );

        }

        await teamRepository.deleteById(id);

        return {
            success: true,
        };

    }

    /**
     * Search Members
     */
    async searchMembers(keyword) {

        return teamRepository.search(keyword);

    }

}

export default new TeamService();