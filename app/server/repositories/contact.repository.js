import BaseRepository from "./base.repository.js";
import Contact from "../models/contact.model.js";

class ContactRepository extends BaseRepository {

    constructor() {
        super(Contact);
    }

    /**
     * Get Unread Contacts
     */
    async findUnread() {

        return Contact.find({
            isRead: false,
            isArchived: false,
        }).sort({
            createdAt: -1,
        });

    }

    /**
     * Find by Status
     */
    async findByStatus(status) {

        return Contact.find({
            status,
            isArchived: false,
        }).sort({
            createdAt: -1,
        });

    }

    /**
     * Find by Inquiry Type
     */
    async findByInquiryType(type) {

        return Contact.find({
            inquiryType: type,
            isArchived: false,
        }).sort({
            createdAt: -1,
        });

    }

    /**
     * Assigned Contacts
     */
    async findAssigned(userId) {

        return Contact.find({
            assignedTo: userId,
            isArchived: false,
        }).sort({
            createdAt: -1,
        });

    }

    /**
     * Recent Contacts
     */
    async findRecent(limit = 10) {

        return Contact.find({
            isArchived: false,
        })
            .sort({
                createdAt: -1,
            })
            .limit(limit);

    }

    /**
     * Search Contacts
     */
    async search(keyword) {

        return Contact.find({

            isArchived: false,

            $or: [

                {
                    name: {
                        $regex: keyword,
                        $options: "i",
                    },
                },

                {
                    email: {
                        $regex: keyword,
                        $options: "i",
                    },
                },

                {
                    company: {
                        $regex: keyword,
                        $options: "i",
                    },
                },

                {
                    subject: {
                        $regex: keyword,
                        $options: "i",
                    },
                },

                {
                    message: {
                        $regex: keyword,
                        $options: "i",
                    },
                },

            ],

        }).sort({
            createdAt: -1,
        });

    }

    /**
     * Count Unread
     */
    async countUnread() {

        return Contact.countDocuments({

            isRead: false,

            isArchived: false,

        });

    }

    /**
     * Count New
     */
    async countNew() {

        return Contact.countDocuments({

            status: "NEW",

            isArchived: false,

        });

    }

    /**
     * Count By Status
     */
    async countByStatus(status) {

        return Contact.countDocuments({

            status,

            isArchived: false,

        });

    }

}

export default new ContactRepository();