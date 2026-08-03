// APP/client/src/admin/components/Skeleton.jsx

/**
 * Skeleton Loading Component
 *
 * Variants: text, title, circle, rect
 */

const Skeleton = ({ width, height, variant = "text", style = {}, className = "" }) => {
    const baseStyle = { width, height, ...style };

    return (
        <div
            className={`admin-skeleton admin-skeleton--${variant} ${className}`}
            style={baseStyle}
            aria-hidden="true"
        />
    );
};

/**
 * Skeleton row for tables (matches typical table row height)
 */
export const SkeletonRow = ({ columns = 4 }) => (
    <tr>
        {Array.from({ length: columns }).map((_, i) => (
            <td key={i} style={{ padding: "var(--space-4)" }}>
                <Skeleton
                    variant="text"
                    width={i === 0 ? "70%" : i === columns - 1 ? "40%" : "60%"}
                    height="14px"
                />
            </td>
        ))}
    </tr>
);

/**
 * Skeleton card for stat cards
 */
export const SkeletonStatCard = () => (
    <div className="admin-stat-card" style={{ gap: "var(--space-4)" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton variant="rect" width="40px" height="40px" />
        </div>
        <Skeleton variant="title" width="40%" height="28px" />
        <Skeleton variant="text" width="50%" height="12px" />
    </div>
);

export default Skeleton;
