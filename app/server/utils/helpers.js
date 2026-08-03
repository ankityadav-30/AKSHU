import crypto from "crypto";

/**
 * Common Helper Utilities
 */
class Helpers {
    /**
     * Check if a value is null, undefined, or an empty string.
     * @param {*} value
     * @returns {boolean}
     */
    isEmpty(value) {
        return (
            value === null ||
            value === undefined ||
            (typeof value === "string" && value.trim() === "")
        );
    }

    /**
     * Generate a cryptographically secure random string.
     * @param {number} length
     * @returns {string}
     */
    generateRandomString(length = 32) {
        return crypto.randomBytes(length).toString("hex");
    }

    /**
     * Generate a numeric OTP.
     * @param {number} digits
     * @returns {string}
     */
    generateOTP(digits = 6) {
        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;

        return String(
            Math.floor(Math.random() * (max - min + 1)) + min
        );
    }

    /**
     * Capitalize first character.
     * @param {string} text
     * @returns {string}
     */
    capitalize(text = "") {
        if (!text) return "";

        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    /**
     * Convert text to Title Case.
     * @param {string} text
     * @returns {string}
     */
    titleCase(text = "") {
        return text
            .toLowerCase()
            .split(" ")
            .filter(Boolean)
            .map((word) => this.capitalize(word))
            .join(" ");
    }

    /**
     * Remove undefined properties from an object.
     * @param {Object} object
     * @returns {Object}
     */
    removeUndefined(object = {}) {
        return Object.fromEntries(
            Object.entries(object).filter(
                ([, value]) => value !== undefined
            )
        );
    }

    /**
     * Pick only specified keys from an object.
     * @param {Object} object
     * @param {string[]} keys
     * @returns {Object}
     */
    pick(object = {}, keys = []) {
        return keys.reduce((result, key) => {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                result[key] = object[key];
            }

            return result;
        }, {});
    }

    /**
     * Omit specified keys from an object.
     * @param {Object} object
     * @param {string[]} keys
     * @returns {Object}
     */
    omit(object = {}, keys = []) {
        return Object.fromEntries(
            Object.entries(object).filter(
                ([key]) => !keys.includes(key)
            )
        );
    }

    /**
     * Sleep for a specified duration.
     * @param {number} ms
     * @returns {Promise<void>}
     */
    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    /**
     * Format a Date as YYYY-MM-DD.
     * @param {Date|string} date
     * @returns {string|null}
     */
    formatDate(date) {
        if (!date) return null;

        const d = new Date(date);

        if (Number.isNaN(d.getTime())) {
            return null;
        }

        return d.toISOString().split("T")[0];
    }

    /**
     * Check if an object has no own properties.
     * @param {Object} object
     * @returns {boolean}
     */
    isObjectEmpty(object = {}) {
        return Object.keys(object).length === 0;
    }

    /**
     * Convert bytes to a human-readable size.
     * @param {number} bytes
     * @returns {string}
     */
    formatBytes(bytes = 0) {
        if (bytes === 0) return "0 Bytes";

        const units = [
            "Bytes",
            "KB",
            "MB",
            "GB",
            "TB",
        ];

        const index = Math.floor(
            Math.log(bytes) / Math.log(1024)
        );

        return `${(
            bytes / Math.pow(1024, index)
        ).toFixed(2)} ${units[index]}`;
    }
}

export default new Helpers();