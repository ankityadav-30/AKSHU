/**
 * Pagination Utility
 */
class Pagination {

    static build({

        page = 1,

        limit = 10,

        total = 0,

    }) {

        page = Number(page);

        limit = Number(limit);

        const totalPages =
            Math.ceil(total / limit);

        return {

            page,

            limit,

            total,

            totalPages,

            hasNextPage:
                page < totalPages,

            hasPreviousPage:
                page > 1,

            nextPage:
                page < totalPages
                    ? page + 1
                    : null,

            previousPage:
                page > 1
                    ? page - 1
                    : null,

        };

    }

}

export default Pagination;