import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import contactService from "../services/contact.service.js";

/**
 * Create Contact
 */
export const createContact = asyncHandler(async (req, res) => {

    const contact = await contactService.createContact({

        ...req.body,

        ipAddress: req.ip,

        userAgent: req.get("user-agent")

    });

    return res.status(201).json(
        new ApiResponse(
            201,
            "Contact inquiry submitted successfully.",
            contact
        )
    );

});

/**
 * Get Contact
 */
export const getContact = asyncHandler(async (req, res) => {

    const contact = await contactService.getContact(
        req.params.id
    );

    return res.json(
        new ApiResponse(
            200,
            "Contact fetched successfully.",
            contact
        )
    );

});

/**
 * Get Unread Contacts
 */
export const getUnreadContacts = asyncHandler(async (req, res) => {

    const contacts =
        await contactService.getUnreadContacts();

    return res.json(
        new ApiResponse(
            200,
            "Unread contacts fetched successfully.",
            contacts
        )
    );

});

/**
 * Get Recent Contacts
 */
export const getRecentContacts = asyncHandler(async (req, res) => {

    const limit =
        Number(req.query.limit) || 10;

    const contacts =
        await contactService.getRecentContacts(limit);

    return res.json(
        new ApiResponse(
            200,
            "Recent contacts fetched successfully.",
            contacts
        )
    );

});

/**
 * Assign Contact
 */
export const assignContact = asyncHandler(async (req, res) => {

    const contact =
        await contactService.assignContact(
            req.params.id,
            req.body.adminId,
            req.user._id
        );

    return res.json(
        new ApiResponse(
            200,
            "Contact assigned successfully.",
            contact
        )
    );

});

/**
 * Mark Read
 */
export const markAsRead = asyncHandler(async (req, res) => {

    const contact =
        await contactService.markAsRead(
            req.params.id,
            req.user._id
        );

    return res.json(
        new ApiResponse(
            200,
            "Marked as read.",
            contact
        )
    );

});

/**
 * Mark Unread
 */
export const markAsUnread = asyncHandler(async (req, res) => {

    const contact =
        await contactService.markAsUnread(
            req.params.id,
            req.user._id
        );

    return res.json(
        new ApiResponse(
            200,
            "Marked as unread.",
            contact
        )
    );

});

/**
 * Update Status
 */
export const updateStatus = asyncHandler(async (req, res) => {

    const contact =
        await contactService.updateStatus(
            req.params.id,
            req.body.status,
            req.user._id
        );

    return res.json(
        new ApiResponse(
            200,
            "Status updated successfully.",
            contact
        )
    );

});

/**
 * Add Note
 */
export const addNote = asyncHandler(async (req, res) => {

    const contact =
        await contactService.addNote(
            req.params.id,
            req.body.message,
            req.user._id
        );

    return res.json(
        new ApiResponse(
            200,
            "Note added successfully.",
            contact
        )
    );

});

/**
 * Mark Spam
 */
export const markSpam = asyncHandler(async (req, res) => {

    const contact =
        await contactService.markSpam(
            req.params.id,
            req.user._id
        );

    return res.json(
        new ApiResponse(
            200,
            "Marked as spam.",
            contact
        )
    );

});

/**
 * Archive Contact
 */
export const archiveContact = asyncHandler(async (req, res) => {

    const contact =
        await contactService.archiveContact(
            req.params.id,
            req.user._id
        );

    return res.json(
        new ApiResponse(
            200,
            "Contact archived successfully.",
            contact
        )
    );

});

/**
 * Search Contacts
 */
export const searchContacts = asyncHandler(async (req, res) => {

    const contacts =
        await contactService.search(
            req.query.keyword
        );

    return res.json(
        new ApiResponse(
            200,
            "Search completed successfully.",
            contacts
        )
    );

});

/**
 * Dashboard Statistics
 */
export const dashboardStats = asyncHandler(async (req, res) => {

    const stats =
        await contactService.getDashboardStats();

    return res.json(
        new ApiResponse(
            200,
            "Dashboard statistics fetched successfully.",
            stats
        )
    );

});

/**
 * Delete Contact
 */
export const deleteContact = asyncHandler(async (req, res) => {

    const result =
        await contactService.deleteContact(
            req.params.id
        );

    return res.json(
        new ApiResponse(
            200,
            "Contact deleted successfully.",
            result
        )
    );

});