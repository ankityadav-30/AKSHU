import ApiError from "../utils/ApiError.js";
import teamRepository from "../repositories/team.repository.js";

class TeamService {

    /**
     * Create Team Member
     */
    async createMember(data, userId) {

        const existingMember =
            await teamRepository.findByEmail(data.email);

        if (existingMember) {
            throw new ApiError(
                409,
                "A team member with this email already exists."
            );
        }

        return teamRepository.create({
            ...data,
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

        const member =
            await teamRepository.findById(id);

        if (!member) {
            throw new ApiError(
                404,
                "Team member not found."
            );
        }

        if (
            data.email &&
            data.email !== member.email
        ) {

            const existing =
                await teamRepository.findByEmail(
                    data.email
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
                ...data,
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