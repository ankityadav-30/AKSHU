// APP/client/src/admin/components/Badge.jsx

/**
 * Status Badge Component
 *
 * Automatically maps status values to semantic colors.
 *
 * @param {string} status - Status value (PUBLISHED, DRAFT, ARCHIVED, etc.)
 * @param {string} className - Additional CSS class
 */

const STATUS_MAP = {
    // Blog / Project status
    PUBLISHED: "published",
    DRAFT: "draft",
    ARCHIVED: "archived",

    // Contact status
    NEW: "new",
    IN_PROGRESS: "in_progress",
    REPLIED: "replied",
    CLOSED: "closed",

    // Team status
    ACTIVE: "active",
    INACTIVE: "neutral",

    // Newsletter
    SUBSCRIBED: "subscribed",
    UNSUBSCRIBED: "unsubscribed",

    // Generic
    FEATURED: "featured",
    SPAM: "spam",
    true: "success",
    false: "neutral",
};

const Badge = ({ status, children, className = "" }) => {
    const label = children || status;
    const variant = STATUS_MAP[status] || "neutral";

    return (
        <span className={`badge badge--${variant} ${className}`}>
            {typeof label === "string" ? label.replace(/_/g, " ") : label}
        </span>
    );
};

export default Badge;
