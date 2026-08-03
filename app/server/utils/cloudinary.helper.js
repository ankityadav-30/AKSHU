import { v2 as cloudinary } from "cloudinary";
import env from "../config/env.js";
import ApiError from "./ApiError.js";

/**
 * Cloudinary Configuration
 */
cloudinary.config({
    cloud_name: env.cloudinary.cloudName,
    api_key: env.cloudinary.apiKey,
    api_secret: env.cloudinary.apiSecret,
    secure: true,
});

class CloudinaryHelper {
    /**
     * Upload file from local path
     *
     * @param {string} filePath
     * @param {Object} options
     * @returns {Promise<Object>}
     */
    async upload(filePath, options = {}) {
        if (!filePath) {
            throw new ApiError(
                400,
                "File path is required."
            );
        }

        try {
            const result =
                await cloudinary.uploader.upload(
                    filePath,
                    {
                        resource_type: "auto",
                        folder: "akshu-technologies",
                        ...options,
                    }
                );

            return {
                url: result.secure_url,
                publicId: result.public_id,
                resourceType: result.resource_type,
                format: result.format,
                width: result.width ?? null,
                height: result.height ?? null,
                bytes: result.bytes ?? null,
            };
        } catch (error) {
            throw new ApiError(
                500,
                error?.message ||
                    "Failed to upload file to Cloudinary."
            );
        }
    }

    /**
     * Upload file from memory buffer.
     *
     * Useful when Multer uses memoryStorage().
     *
     * @param {Buffer} buffer
     * @param {Object} options
     * @returns {Promise<Object>}
     */
    async uploadBuffer(buffer, options = {}) {
        if (!buffer || !Buffer.isBuffer(buffer)) {
            throw new ApiError(
                400,
                "Valid file buffer is required."
            );
        }

        return new Promise((resolve, reject) => {
            const uploadStream =
                cloudinary.uploader.upload_stream(
                    {
                        resource_type: "auto",
                        folder: "akshu-technologies",
                        ...options,
                    },
                    (error, result) => {
                        if (error) {
                            return reject(
                                new ApiError(
                                    500,
                                    error?.message ||
                                        "Failed to upload file to Cloudinary."
                                )
                            );
                        }

                        if (!result) {
                            return reject(
                                new ApiError(
                                    500,
                                    "Cloudinary returned no upload result."
                                )
                            );
                        }

                        resolve({
                            url: result.secure_url,
                            publicId: result.public_id,
                            resourceType:
                                result.resource_type,
                            format:
                                result.format ?? null,
                            width:
                                result.width ?? null,
                            height:
                                result.height ?? null,
                            bytes:
                                result.bytes ?? null,
                        });
                    }
                );

            uploadStream.end(buffer);
        });
    }

    /**
     * Delete resource from Cloudinary
     *
     * @param {string} publicId
     * @param {string} resourceType
     * @returns {Promise<Object>}
     */
    async delete(
        publicId,
        resourceType = "image"
    ) {
        if (!publicId) {
            throw new ApiError(
                400,
                "Cloudinary public ID is required."
            );
        }

        try {
            const result =
                await cloudinary.uploader.destroy(
                    publicId,
                    {
                        resource_type: resourceType,
                        invalidate: true,
                    }
                );

            if (
                result.result !== "ok" &&
                result.result !== "not found"
            ) {
                throw new ApiError(
                    500,
                    "Failed to delete Cloudinary resource."
                );
            }

            return result;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }

            throw new ApiError(
                500,
                error?.message ||
                    "Failed to delete file from Cloudinary."
            );
        }
    }

    /**
     * Delete multiple Cloudinary resources
     *
     * @param {string[]} publicIds
     * @param {string} resourceType
     * @returns {Promise<Object>}
     */
    async deleteMany(
        publicIds,
        resourceType = "image"
    ) {
        if (
            !Array.isArray(publicIds) ||
            publicIds.length === 0
        ) {
            throw new ApiError(
                400,
                "At least one Cloudinary public ID is required."
            );
        }

        try {
            return await cloudinary.api.delete_resources(
                publicIds,
                {
                    resource_type: resourceType,
                    invalidate: true,
                }
            );
        } catch (error) {
            throw new ApiError(
                500,
                error?.message ||
                    "Failed to delete Cloudinary resources."
            );
        }
    }

    /**
     * Generate optimized Cloudinary URL
     *
     * @param {string} publicId
     * @param {Object} transformations
     * @returns {string}
     */
    getUrl(publicId, transformations = {}) {
        if (!publicId) {
            throw new ApiError(
                400,
                "Cloudinary public ID is required."
            );
        }

        return cloudinary.url(publicId, {
            secure: true,
            fetch_format: "auto",
            quality: "auto",
            ...transformations,
        });
    }
}

export default new CloudinaryHelper();