import bcrypt from "bcrypt";

import ApiError from "../utils/ApiError.js";
import userRepository from "../repositories/user.repository.js";

class ProfileService {

    /**
     * Get Profile
     */
    async getProfile(userId) {

        const user = await userRepository.findById(userId);

        if (!user) {
            throw new ApiError(
                404,
                "User not found."
            );
        }

        return user;
    }

    /**
     * Update Profile
     */
    async updateProfile(userId, data) {

        const allowedFields = [
            "firstName",
            "lastName",
            "avatar",
        ];

        const updates = {};

        for (const key of allowedFields) {
            if (data[key] !== undefined) {
                updates[key] = data[key];
            }
        }

        const updatedUser =
            await userRepository.updateById(
                userId,
                updates
            );

        if (!updatedUser) {
            throw new ApiError(
                404,
                "User not found."
            );
        }

        return updatedUser;
    }

    /**
     * Change Password
     */
    async changePassword(userId, data) {

        const {
            currentPassword,
            newPassword,
        } = data;

        const user =
            await userRepository.findById(userId);

        if (!user) {
            throw new ApiError(
                404,
                "User not found."
            );
        }

        const isPasswordCorrect =
            await bcrypt.compare(
                currentPassword,
                user.password
            );

        if (!isPasswordCorrect) {
            throw new ApiError(
                400,
                "Current password is incorrect."
            );
        }

        user.password = newPassword;

        await user.save();

        return {
            success: true,
        };
    }

}

export default new ProfileService();