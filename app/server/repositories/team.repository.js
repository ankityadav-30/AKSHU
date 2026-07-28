import BaseRepository from "./base.repository.js";
import Team from "../models/team.model.js";

class TeamRepository extends BaseRepository {

    constructor() {
        super(Team);
    }

    /**
     * Get active members
     */
    async findActive() {

        return this.model
            .find({
                isActive: true,
            })
            .sort({
                order: 1,
                createdAt: 1,
            });

    }

    /**
     * Search members
     */
    async search(keyword) {

        return this.model.find({
            $or: [
                {
                    name: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
                {
                    designation: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
                {
                    department: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
                {
                    skills: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
            ],
        });

    }

    /**
     * Count Active Members
     */
    async countActive() {

        return this.model.countDocuments({
            isActive: true,
        });

    }

}

export default new TeamRepository();