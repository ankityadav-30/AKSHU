import ApiError from "../utils/ApiError.js";
import cloudinaryHelper from "../utils/cloudinary.helper.js";

class UploadService {
    /**
     * Upload Single File
     */
    async uploadSingle(file, options = {}) {
        if (!file?.buffer) {
            throw new ApiError(
                400,
                "Valid file is required."
            );
        }

        const uploadOptions = {
            resource_type:
                options.resourceType || "auto",
        };

        if (options.folder) {
            uploadOptions.folder = options.folder;
        }

        const uploadedFile =
            await cloudinaryHelper.uploadBuffer(
                file.buffer,
                uploadOptions
            );

        return {
            ...uploadedFile,
            originalName: file.originalname,
            mimeType: file.mimetype,
        };
    }

    /**
     * Upload Multiple Files
     */
    async uploadMultiple(files, options = {}) {
        if (
            !Array.isArray(files) ||
            files.length === 0
        ) {
            throw new ApiError(
                400,
                "At least one file is required."
            );
        }

        const uploadOptions = {
            resource_type:
                options.resourceType || "auto",
        };

        if (options.folder) {
            uploadOptions.folder = options.folder;
        }

        const results = await Promise.allSettled(
            files.map((file) =>
                cloudinaryHelper.uploadBuffer(
                    file.buffer,
                    uploadOptions
                )
            )
        );

        const successfulUploads = [];
        const failedUploads = [];

        results.forEach((result, index) => {
            const file = files[index];

            if (result.status === "fulfilled") {
                successfulUploads.push({
                    ...result.value,
                    originalName:
                        file.originalname,
                    mimeType:
                        file.mimetype,
                });

                return;
            }

            failedUploads.push({
                originalName:
                    file.originalname,
                message:
                    result.reason?.message ||
                    "Upload failed.",
            });
        });

        /*
         * If every upload failed, the entire
         * operation is considered unsuccessful.
         */
        if (successfulUploads.length === 0) {
            throw new ApiError(
                500,
                "Failed to upload files."
            );
        }

        return {
            uploaded: successfulUploads,
            failed: failedUploads,
            total: files.length,
            successCount:
                successfulUploads.length,
            failureCount:
                failedUploads.length,
        };
    }

    /**
     * Delete Single File
     */
    async deleteUpload(
        publicId,
        resourceType = "image"
    ) {
        if (!publicId) {
            throw new ApiError(
                400,
                "Cloudinary public ID is required."
            );
        }

        await cloudinaryHelper.delete(
            publicId,
            resourceType
        );

        return {
            publicId,
            deleted: true,
        };
    }

    /**
     * Delete Multiple Files
     */
    async deleteMultiple(
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

        const result =
            await cloudinaryHelper.deleteMany(
                publicIds,
                resourceType
            );

        return {
            publicIds,
            deleted: result.deleted || {},
        };
    }

    /**
     * Replace Existing Upload
     *
     * Uploads the new file first.
     * The old resource is deleted only after
     * the new upload succeeds.
     */
    async replaceUpload(
        file,
        oldPublicId,
        options = {}
    ) {
        if (!file?.buffer) {
            throw new ApiError(
                400,
                "Valid replacement file is required."
            );
        }

        if (!oldPublicId) {
            throw new ApiError(
                400,
                "Existing Cloudinary public ID is required."
            );
        }

        const resourceType =
            options.resourceType || "image";

        const uploadOptions = {
            resource_type:
                options.newResourceType ||
                "auto",
        };

        if (options.folder) {
            uploadOptions.folder =
                options.folder;
        }

        /*
         * Upload new resource first.
         * This prevents losing the existing
         * file if the new upload fails.
         */
        const uploadedFile =
            await cloudinaryHelper.uploadBuffer(
                file.buffer,
                uploadOptions
            );

        try {
            await cloudinaryHelper.delete(
                oldPublicId,
                resourceType
            );
        } catch (error) {
            /*
             * Roll back the newly uploaded file
             * when deletion of the old resource
             * fails.
             */
            try {
                await cloudinaryHelper.delete(
                    uploadedFile.publicId,
                    uploadedFile.resourceType
                );
            } catch {
                // Preserve the original failure.
            }

            throw error;
        }

        return {
            ...uploadedFile,
            originalName: file.originalname,
            mimeType: file.mimetype,
            replacedPublicId: oldPublicId,
        };
    }

    /**
     * Generate Optimized Resource URL
     */
    getOptimizedUrl(
        publicId,
        transformations = {}
    ) {
        if (!publicId) {
            throw new ApiError(
                400,
                "Cloudinary public ID is required."
            );
        }

        return cloudinaryHelper.getUrl(
            publicId,
            transformations
        );
    }
}

export default new UploadService();