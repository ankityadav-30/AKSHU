import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadService from "../services/upload.service.js";

/**
 * Upload Single File
 *
 * Protected
 */
const uploadSingle = asyncHandler(
    async (req, res) => {
        const result =
            await uploadService.uploadSingle(
                req.file,
                {
                    folder: req.body.folder,
                    resourceType:
                        req.body.resourceType,
                }
            );

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    result,
                    "File uploaded successfully."
                )
            );
    }
);

/**
 * Upload Multiple Files
 *
 * Protected
 */
const uploadMultiple = asyncHandler(
    async (req, res) => {
        const result =
            await uploadService.uploadMultiple(
                req.files,
                {
                    folder: req.body.folder,
                    resourceType:
                        req.body.resourceType,
                }
            );

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    result,
                    "Files uploaded successfully."
                )
            );
    }
);

/**
 * Delete Single Upload
 *
 * Protected
 */
const deleteUpload = asyncHandler(
    async (req, res) => {
        const {
            publicId,
            resourceType,
        } = req.body;

        const result =
            await uploadService.deleteUpload(
                publicId,
                resourceType
            );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    result,
                    "File deleted successfully."
                )
            );
    }
);

/**
 * Delete Multiple Uploads
 *
 * Protected
 */
const deleteMultipleUploads = asyncHandler(
    async (req, res) => {
        const {
            publicIds,
            resourceType,
        } = req.body;

        const result =
            await uploadService.deleteMultiple(
                publicIds,
                resourceType
            );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    result,
                    "Files deleted successfully."
                )
            );
    }
);

/**
 * Replace Existing Upload
 *
 * Protected
 */
const replaceUpload = asyncHandler(
    async (req, res) => {
        const {
            publicId,
            resourceType,
            folder,
        } = req.body;

        const result =
            await uploadService.replaceUpload(
                req.file,
                publicId,
                {
                    resourceType,
                    folder,
                }
            );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    result,
                    "File replaced successfully."
                )
            );
    }
);

export {
    uploadSingle,
    uploadMultiple,
    deleteUpload,
    deleteMultipleUploads,
    replaceUpload,
};