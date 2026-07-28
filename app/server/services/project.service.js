import slugify from "slugify";
import ApiError from "../utils/ApiError.js";
import projectRepository from "../repositories/project.repository.js";

class ProjectService {

    async createProject(data, userId) {

        const slug = slugify(data.title, {
            lower: true,
            strict: true,
        });

        const existing =
            await projectRepository.findBySlug(slug);

        if (existing) {
            throw new ApiError(
                400,
                "Project with this title already exists."
            );
        }

        return projectRepository.create({
            ...data,
            slug,
            createdBy: userId,
        });

    }

    async getPublishedProjects() {

        return projectRepository.findPublished();

    }

    async getProjectBySlug(slug) {

        const project =
            await projectRepository.findBySlug(slug);

        if (!project) {
            throw new ApiError(
                404,
                "Project not found."
            );
        }

        return project;

    }

    async updateProject(id, data, userId) {

        const project =
            await projectRepository.findById(id);

        if (!project) {
            throw new ApiError(
                404,
                "Project not found."
            );
        }

        if (data.title) {

            data.slug = slugify(data.title, {
                lower: true,
                strict: true,
            });

        }

        return projectRepository.update(id, {
            ...data,
            updatedBy: userId,
        });

    }

    async publishProject(id, userId) {

        const project =
            await projectRepository.findById(id);

        if (!project) {
            throw new ApiError(
                404,
                "Project not found."
            );
        }

        return projectRepository.update(id, {
            status: "PUBLISHED",
            publishedAt: new Date(),
            updatedBy: userId,
        });

    }

    async archiveProject(id, userId) {

        const project =
            await projectRepository.findById(id);

        if (!project) {
            throw new ApiError(
                404,
                "Project not found."
            );
        }

        return projectRepository.update(id, {
            status: "ARCHIVED",
            updatedBy: userId,
        });

    }

    async deleteProject(id) {

        const project =
            await projectRepository.findById(id);

        if (!project) {
            throw new ApiError(
                404,
                "Project not found."
            );
        }

        await projectRepository.delete(id);

    }

}

export default new ProjectService();