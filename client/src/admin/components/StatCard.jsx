// APP/client/src/admin/components/StatCard.jsx

import { useEffect, useRef, useState } from "react";

/**
 * Dashboard Stat Card
 *
 * @param {string}          label   - Stat label
 * @param {number|string}   value   - Stat value
 * @param {React.ReactNode} icon    - Icon element
 * @param {string}          color   - Accent color
 * @param {string}          trend   - Trend text (e.g. "+12%")
 * @param {"up"|"down"}     trendDir - Trend direction
 */
const StatCard = ({ label, value, icon, color = "var(--color-primary)", trend, trendDir }) => {
    const [displayed, setDisplayed] = useState(0);
    const ref = useRef(null);

    // Animated count-up
    useEffect(() => {
        const numVal = typeof value === "number" ? value : parseInt(value, 10);
        if (isNaN(numVal) || numVal === 0) {
            setDisplayed(value ?? 0);
            return;
        }

        let start = 0;
        const duration = 600;
        const startTime = performance.now();

        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            start = Math.round(ease * numVal);
            setDisplayed(start);

            if (progress < 1) {
                ref.current = requestAnimationFrame(animate);
            }
        };

        ref.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(ref.current);
    }, [value]);

    return (
        <div className="admin-stat-card" style={{ "--stat-accent": color }}>
            <div className="admin-stat-card__header">
                <div className="admin-stat-card__icon" style={{ background: `${color}18`, color }}>
                    {icon}
                </div>
                {trend && (
                    <span className={`admin-stat-card__trend admin-stat-card__trend--${trendDir || "up"}`}>
                        {trendDir === "down" ? "↓" : "↑"} {trend}
                    </span>
                )}
            </div>
            <div className="admin-stat-card__value">{displayed}</div>
            <div className="admin-stat-card__label">{label}</div>
        </div>
    );
};

export default StatCard;
