import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import teamService from "../services/team.service.js";

/**
 * Create Team Member
 */
export const createMember = asyncHandler(async (req, res) => {

    const member = await teamService.createMember(
        req.body,
        req.user._id
    );

    res.status(201).json(
        new ApiResponse(
            201,
            "Team member created successfully.",
            member
        )
    );

});

/**
 * Get Active Members
 */
export const getMembers = asyncHandler(async (req, res) => {

    const members =
        await teamService.getActiveMembers();

    res.status(200).json(
        new ApiResponse(
            200,
            "Team members fetched successfully.",
            members
        )
    );

});

/**
 * Get Member By ID
 */
export const getMember = asyncHandler(async (req, res) => {

    const member =
        await teamService.getMemberById(
            req.params.id
        );

    res.status(200).json(
        new ApiResponse(
            200,
            "Team member fetched successfully.",
            member
        )
    );

});

/**
 * Update Team Member
 */
export const updateMember = asyncHandler(async (req, res) => {

    const member =
        await teamService.updateMember(
            req.params.id,
            req.body,
            req.user._id
        );

    res.status(200).json(
        new ApiResponse(
            200,
            "Team member updated successfully.",
            member
        )
    );

});

/**
 * Activate Member
 */
export const activateMember = asyncHandler(async (req, res) => {

    const member =
        await teamService.activateMember(
            req.params.id,
            req.user._id
        );

    res.status(200).json(
        new ApiResponse(
            200,
            "Team member activated successfully.",
            member
        )
    );

});

/**
 * Deactivate Member
 */
export const deactivateMember = asyncHandler(async (req, res) => {

    const member =
        await teamService.deactivateMember(
            req.params.id,
            req.user._id
        );

    res.status(200).json(
        new ApiResponse(
            200,
            "Team member deactivated successfully.",
            member
        )
    );

});

/**
 * Delete Team Member
 */
export const deleteMember = asyncHandler(async (req, res) => {

    await teamService.deleteMember(
        req.params.id
    );

    res.status(200).json(
        new ApiResponse(
            200,
            "Team member deleted successfully."
        )
    );

});

/**
 * Search Team Members
 */
export const searchMembers = asyncHandler(async (req, res) => {

    const members =
        await teamService.searchMembers(
            req.query.keyword || ""
        );

    res.status(200).json(
        new ApiResponse(
            200,
            "Search completed successfully.",
            members
        )
    );

});