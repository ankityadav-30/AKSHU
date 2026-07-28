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

            contact,

            "Contact inquiry submitted successfully."

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

            contact,

            "Contact fetched successfully."

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

            contacts,

            "Unread contacts fetched successfully."

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

            contacts,

            "Recent contacts fetched successfully."

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

            contact,

            "Contact assigned successfully."

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

            contact,

            "Marked as read."

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

            contact,

            "Marked as unread."

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

            contact,

            "Status updated successfully."

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

            contact,

            "Note added successfully."

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

            contact,

            "Marked as spam."

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

            contact,

            "Contact archived successfully."

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

            contacts,

            "Search completed successfully."

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

            stats,

            "Dashboard statistics fetched successfully."

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

            result,

            "Contact deleted successfully."

        )

    );

});