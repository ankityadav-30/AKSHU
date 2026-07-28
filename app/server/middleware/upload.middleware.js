import multer from "multer";
import ApiError from "../utils/ApiError.js";

/**
 * Maximum upload size: 10 MB
 */
const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * Allowed MIME types
 */
const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/avif",
    "application/pdf",
];

/**
 * Memory Storage
 *
 * Files are stored temporarily in memory
 * and uploaded directly to Cloudinary.
 */
const storage = multer.memoryStorage();

/**
 * File Filter
 */
const fileFilter = (req, file, callback) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return callback(
            new ApiError(
                415,
                "Unsupported file type. Allowed types: JPEG, PNG, WEBP, GIF, AVIF and PDF."
            )
        );
    }

    callback(null, true);
};

/**
 * Base Multer Instance
 */
const multerUpload = multer({
    storage,

    limits: {
        fileSize: MAX_FILE_SIZE,
        files: 10,
    },

    fileFilter,
});

/**
 * Handle Multer errors consistently
 */
const handleMulterError =
    (middleware) => (req, res, next) => {
        middleware(req, res, (error) => {
            if (!error) {
                return next();
            }

            if (
                error instanceof multer.MulterError
            ) {
                switch (error.code) {
                    case "LIMIT_FILE_SIZE":
                        return next(
                            new ApiError(
                                413,
                                "File size cannot exceed 10 MB."
                            )
                        );

                    case "LIMIT_FILE_COUNT":
                        return next(
                            new ApiError(
                                400,
                                "Maximum 10 files can be uploaded at once."
                            )
                        );

                    case "LIMIT_UNEXPECTED_FILE":
                        return next(
                            new ApiError(
                                400,
                                "Unexpected file field."
                            )
                        );

                    default:
                        return next(
                            new ApiError(
                                400,
                                error.message ||
                                    "File upload failed."
                            )
                        );
                }
            }

            return next(error);
        });
    };

/**
 * Single File Upload
 *
 * Expected field:
 * file
 */
const uploadSingle = handleMulterError(
    multerUpload.single("file")
);

/**
 * Multiple File Upload
 *
 * Expected field:
 * files
 *
 * Maximum: 10 files
 */
const uploadMultiple = handleMulterError(
    multerUpload.array("files", 10)
);

/**
 * Image-only upload middleware
 *
 * Must be placed after Multer middleware.
 */
const requireImage = (req, res, next) => {
    if (!req.file) {
        return next(
            new ApiError(
                400,
                "File is required."
            )
        );
    }

    if (
        !req.file.mimetype.startsWith("image/")
    ) {
        return next(
            new ApiError(
                415,
                "Only image files are allowed."
            )
        );
    }

    next();
};

/**
 * Ensure single file exists
 */
const requireFile = (req, res, next) => {
    if (!req.file) {
        return next(
            new ApiError(
                400,
                "File is required."
            )
        );
    }

    next();
};

/**
 * Ensure multiple files exist
 */
const requireFiles = (req, res, next) => {
    if (
        !Array.isArray(req.files) ||
        req.files.length === 0
    ) {
        return next(
            new ApiError(
                400,
                "At least one file is required."
            )
        );
    }

    next();
};

export {
    uploadSingle,
    uploadMultiple,
    requireFile,
    requireFiles,
    requireImage,
};