// APP/client/src/utils/readingTime.js

/**
 * Calculates estimated reading time in minutes for a given text or blog post object.
 * @param {string|object} contentOrPost - The raw content string or blog object.
 * @param {number} wordsPerMinute - Average reading speed (default: 200 wpm).
 * @returns {number} Reading time in minutes (minimum 1).
 */
export function getReadingTime(contentOrPost, wordsPerMinute = 200) {
    if (!contentOrPost) return 1;

    // If post has an explicit readingTime property from backend
    if (typeof contentOrPost === "object" && typeof contentOrPost.readingTime === "number" && contentOrPost.readingTime > 0) {
        return contentOrPost.readingTime;
    }

    const text = typeof contentOrPost === "string" 
        ? contentOrPost 
        : (contentOrPost.content || contentOrPost.shortDescription || "");

    if (!text) return 1;

    // Strip HTML tags if any
    const cleanText = text.replace(/<[^>]*>/g, " ");
    const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.ceil(words / wordsPerMinute);

    return Math.max(1, minutes);
}
