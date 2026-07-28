import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import profileService from "../services/profile.service.js";
import { MESSAGES } from "../utils/constants.js";

/**
 * GET /api/v1/profile
 */
export const getProfile = asyncHandler(async (req, res) => {

    const profile = await profileService.getProfile(
        req.user._id
    );

    res.status(200).json(
        new ApiResponse(
            200,
            "Profile fetched successfully.",
            profile
        )
    );

});

/**
 * PATCH /api/v1/profile
 */
export const updateProfile = asyncHandler(async (req, res) => {

    const profile = await profileService.updateProfile(
        req.user._id,
        req.body
    );

    res.status(200).json(
        new ApiResponse(
            200,
            "Profile updated successfully.",
            profile
        )
    );

});

/**
 * PATCH /api/v1/profile/password
 */
export const changePassword = asyncHandler(async (req, res) => {

    const result =
        await profileService.changePassword(
            req.user._id,
            req.body
        );

    res.status(200).json(
        new ApiResponse(
            200,
            "Password changed successfully.",
            result
        )
    );

});