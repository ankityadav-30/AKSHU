class BaseRepository {

    constructor(model) {
        this.model = model;
    }

    /**
     * Create
     */
    async create(data) {
        return this.model.create(data);
    }

    /**
     * Find by ID
     */
    async findById(id) {
        return this.model.findById(id);
    }

    /**
     * Find One
     */
    async findOne(filter) {
        return this.model.findOne(filter);
    }

    /**
     * Find All
     */
    async findAll(filter = {}, options = {}) {
        return this.model.find(filter, null, options);
    }

    /**
     * Update by ID
     */
    async updateById(id, data, options = {}) {
        return this.model.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true,
                ...options,
            }
        );
    }

    /**
     * Delete by ID
     */
    async deleteById(id) {
        return this.model.findByIdAndDelete(id);
    }

    /**
     * Count Documents
     */
    async count(filter = {}) {
        return this.model.countDocuments(filter);
    }

    /**
     * Exists
     */
    async exists(filter = {}) {
        return this.model.exists(filter);
    }

}

export default BaseRepository;