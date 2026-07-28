import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import blogService from "../services/blog.service.js";

/**
 * Create Blog
 */
export const createBlog = asyncHandler(async (req, res) => {

    const blog = await blogService.createBlog(
        req.body,
        req.user._id
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            blog,
            "Blog created successfully."
        )
    );

});

/**
 * Get Published Blogs
 */
export const getBlogs = asyncHandler(async (req, res) => {

    const blogs =
        await blogService.getPublishedBlogs();

    return res.json(
        new ApiResponse(
            200,
            blogs,
            "Blogs fetched successfully."
        )
    );

});

/**
 * Get Blog by Slug
 */
export const getBlog = asyncHandler(async (req, res) => {

    const blog =
        await blogService.getBlogBySlug(
            req.params.slug
        );

    return res.json(
        new ApiResponse(
            200,
            blog,
            "Blog fetched successfully."
        )
    );

});

/**
 * Update Blog
 */
export const updateBlog = asyncHandler(async (req, res) => {

    const blog =
        await blogService.updateBlog(

            req.params.id,

            req.body,

            req.user._id

        );

    return res.json(
        new ApiResponse(
            200,
            blog,
            "Blog updated successfully."
        )
    );

});

/**
 * Publish Blog
 */
export const publishBlog = asyncHandler(async (req, res) => {

    const blog =
        await blogService.publishBlog(

            req.params.id,

            req.user._id

        );

    return res.json(
        new ApiResponse(
            200,
            blog,
            "Blog published successfully."
        )
    );

});

/**
 * Archive Blog
 */
export const archiveBlog = asyncHandler(async (req, res) => {

    const blog =
        await blogService.archiveBlog(

            req.params.id,

            req.user._id

        );

    return res.json(
        new ApiResponse(
            200,
            blog,
            "Blog archived successfully."
        )
    );

});

/**
 * Delete Blog
 */
export const deleteBlog = asyncHandler(async (req, res) => {

    const result =
        await blogService.deleteBlog(
            req.params.id
        );

    return res.json(
        new ApiResponse(
            200,
            result,
            "Blog deleted successfully."
        )
    );

});

/**
 * Get Featured Blogs
 */
export const getFeaturedBlogs = asyncHandler(async (req, res) => {

    const limit =
        Number(req.query.limit) || 5;

    const blogs =
        await blogService.getFeaturedBlogs(limit);

    return res.json(
        new ApiResponse(
            200,
            blogs,
            "Featured blogs fetched successfully."
        )
    );

});

/**
 * Get Latest Blogs
 */
export const getLatestBlogs = asyncHandler(async (req, res) => {

    const limit =
        Number(req.query.limit) || 5;

    const blogs =
        await blogService.getLatestBlogs(limit);

    return res.json(
        new ApiResponse(
            200,
            blogs,
            "Latest blogs fetched successfully."
        )
    );

});

/**
 * Search Blogs
 */
export const searchBlogs = asyncHandler(async (req, res) => {

    const blogs =
        await blogService.searchBlogs(
            req.query.keyword
        );

    return res.json(
        new ApiResponse(
            200,
            blogs,
            "Search completed successfully."
        )
    );

});