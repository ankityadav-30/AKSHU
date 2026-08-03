import ApiError from "../utils/ApiError.js";
import contactRepository from "../repositories/contact.repository.js";

class ContactService {

    /**
     * Create Contact Inquiry
     */
    async createContact(data) {

        return contactRepository.create(data);

    }

    /**
     * Get Contact
     */
    async getContact(id) {

        const contact =
            await contactRepository.findById(id);

        if (!contact) {

            throw new ApiError(
                404,
                "Contact inquiry not found."
            );

        }

        return contact;

    }

    /**
     * Get Unread
     */
    async getUnreadContacts() {

        return contactRepository.findUnread();

    }

    /**
     * Get Recent
     */
    async getRecentContacts(limit = 10) {

        return contactRepository.findRecent(limit);

    }

    /**
     * Assign Contact
     */
    async assignContact(
        id,
        adminId,
        updatedBy
    ) {

        const contact =
            await this.getContact(id);

        return contactRepository.updateById(
            id,
            {
                assignedTo: adminId,
                updatedBy,
            }
        );

    }

    /**
     * Mark Read
     */
    async markAsRead(
        id,
        updatedBy
    ) {

        await this.getContact(id);

        return contactRepository.updateById(
            id,
            {
                isRead: true,
                updatedBy,
            }
        );

    }

    /**
     * Mark Unread
     */
    async markAsUnread(
        id,
        updatedBy
    ) {

        await this.getContact(id);

        return contactRepository.updateById(
            id,
            {
                isRead: false,
                updatedBy,
            }
        );

    }

    /**
     * Update Status
     */
    async updateStatus(
        id,
        status,
        updatedBy
    ) {

        await this.getContact(id);

        const update = {
            status,
            updatedBy,
        };

        if (status === "REPLIED") {

            update.repliedAt = new Date();

        }

        return contactRepository.updateById(
            id,
            update
        );

    }

    /**
     * Add Internal Note
     */
    async addNote(
        id,
        message,
        userId
    ) {

        const contact =
            await this.getContact(id);

        contact.notes.push({

            message,

            addedBy: userId,

        });

        contact.updatedBy = userId;

        await contact.save();

        return contact;

    }

    /**
     * Mark Spam
     */
    async markSpam(
        id,
        updatedBy
    ) {

        await this.getContact(id);

        return contactRepository.updateById(
            id,
            {
                isSpam: true,
                updatedBy,
            }
        );

    }

    /**
     * Archive Contact
     */
    async archiveContact(
        id,
        updatedBy
    ) {

        await this.getContact(id);

        return contactRepository.updateById(
            id,
            {
                isArchived: true,
                updatedBy,
            }
        );

    }

    /**
     * Search
     */
    async search(keyword) {

        return contactRepository.search(
            keyword
        );

    }

    /**
     * Dashboard Stats
     */
    async getDashboardStats() {

        const [

            unread,

            newContacts,

        ] = await Promise.all([

            contactRepository.countUnread(),

            contactRepository.countNew(),

        ]);

        return {

            unread,

            new: newContacts,

        };

    }

    /**
     * Delete Contact
     */
    async deleteContact(id) {

        await this.getContact(id);

        await contactRepository.deleteById(id);

        return {

            success: true,

        };

    }

}

export default new ContactService();