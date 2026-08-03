import slugify from "slugify";

/**
 * Slug Helper
 */
class SlugHelper {
    /**
     * Generate a slug from text.
     * @param {string} text
     * @returns {string}
     */
    generate(text) {
        if (!text || typeof text !== "string") {
            return "";
        }

        return slugify(text.trim(), {
            lower: true,
            strict: true,
            trim: true,
        });
    }

    /**
     * Generate a unique slug.
     *
     * @param {string} text
     * @param {Object} repository Repository instance
     * @param {string|null} excludeId Ignore current document while updating
     * @returns {Promise<string>}
     */
    async generateUnique(text, repository, excludeId = null) {
        const baseSlug = this.generate(text);

        let slug = baseSlug;
        let counter = 1;

        while (
            await repository.existsBySlug(
                slug,
                excludeId
            )
        ) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        return slug;
    }

    /**
     * Check if slug is valid.
     * @param {string} slug
     * @returns {boolean}
     */
    isValid(slug) {
        return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
    }

    /**
     * Convert slug back to readable title.
     * @param {string} slug
     * @returns {string}
     */
    toTitle(slug) {
        if (!slug) return "";

        return slug
            .split("-")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() +
                    word.slice(1)
            )
            .join(" ");
    }
}

export default new SlugHelper();