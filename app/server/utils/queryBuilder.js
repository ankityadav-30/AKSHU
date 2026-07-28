class QueryBuilder {

    constructor(model, query = {}) {

        this.model = model;

        this.query = query;

        this.mongoQuery = {};

        this.options = {};

    }

    /**
     * Search
     */
    search(fields = []) {

        if (this.query.search) {

            this.mongoQuery.$or =
                fields.map(field => ({

                    [field]: {

                        $regex: this.query.search,

                        $options: "i"

                    }

                }));

        }

        return this;

    }

    /**
     * Filter
     */
    filter(allowedFields = []) {

        allowedFields.forEach(field => {

            if (this.query[field] !== undefined) {

                this.mongoQuery[field] =
                    this.query[field];

            }

        });

        return this;

    }

    /**
     * Sort
     */
    sort(defaultSort = "-createdAt") {

        this.options.sort =
            this.query.sort || defaultSort;

        return this;

    }

    /**
     * Select Fields
     */
    select() {

        if (this.query.fields) {

            this.options.select =
                this.query.fields
                    .split(",")
                    .join(" ");

        }

        return this;

    }

    /**
     * Pagination
     */
    paginate() {

        const page =
            Number(this.query.page) || 1;

        const limit =
            Number(this.query.limit) || 10;

        const skip =
            (page - 1) * limit;

        this.options.skip = skip;

        this.options.limit = limit;

        return this;

    }

    /**
     * Execute
     */
    async execute() {

        let query =
            this.model.find(this.mongoQuery);

        if (this.options.sort) {

            query =
                query.sort(
                    this.options.sort
                );

        }

        if (this.options.select) {

            query =
                query.select(
                    this.options.select
                );

        }

        if (this.options.skip !== undefined) {

            query =
                query.skip(
                    this.options.skip
                );

        }

        if (this.options.limit !== undefined) {

            query =
                query.limit(
                    this.options.limit
                );

        }

        return query;

    }

}

export default QueryBuilder;