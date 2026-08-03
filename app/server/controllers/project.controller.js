import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import projectService from "../services/project.service.js";

/**
 * Create Project
 */
export const createProject = asyncHandler(async (req, res) => {

    const project = await projectService.createProject(
        req.body,
        req.user._id
    );

    res.status(201).json(
        new ApiResponse(
            201,
            "Project created successfully.",
            project
        )
    );

});

/**
 * Get Published Projects
 */
export const getProjects = asyncHandler(async (req, res) => {

    const projects =
        await projectService.getPublishedProjects();

    res.status(200).json(
        new ApiResponse(
            200,
            "Projects fetched successfully.",
            projects
        )
    );

});

/**
 * Get Project by Slug
 */
export const getProject = asyncHandler(async (req, res) => {

    const project =
        await projectService.getProjectBySlug(
            req.params.slug
        );

    res.status(200).json(
        new ApiResponse(
            200,
            "Project fetched successfully.",
            project
        )
    );

});

/**
 * Update Project
 */
export const updateProject = asyncHandler(async (req, res) => {

    const project =
        await projectService.updateProject(
            req.params.id,
            req.body,
            req.user._id
        );

    res.status(200).json(
        new ApiResponse(
            200,
            "Project updated successfully.",
            project
        )
    );

});

/**
 * Publish Project
 */
export const publishProject = asyncHandler(async (req, res) => {

    const project =
        await projectService.publishProject(
            req.params.id,
            req.user._id
        );

    res.status(200).json(
        new ApiResponse(
            200,
            "Project published successfully.",
            project
        )
    );

});

/**
 * Archive Project
 */
export const archiveProject = asyncHandler(async (req, res) => {

    const project =
        await projectService.archiveProject(
            req.params.id,
            req.user._id
        );

    res.status(200).json(
        new ApiResponse(
            200,
            "Project archived successfully.",
            project
        )
    );

});

/**
 * Delete Project
 */
export const deleteProject = asyncHandler(async (req, res) => {

    await projectService.deleteProject(
        req.params.id
    );

    res.status(200).json(
        new ApiResponse(
            200,
            "Project deleted successfully."
        )
    );

});