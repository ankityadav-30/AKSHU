// APP/client/src/admin/components/AdminChart.jsx

import { useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Filler,
    Tooltip,
    Legend
);

/**
 * Admin Chart wrapper with dark theme defaults
 *
 * @param {"line"|"bar"|"doughnut"} type   - Chart type
 * @param {object}                  data   - Chart.js data object
 * @param {object}                  options - Chart.js options (merged with defaults)
 * @param {string}                  height - Container CSS height
 */

const DARK_GRID = "rgba(255, 255, 255, 0.05)";
const DARK_TEXT = "#94A3B8";

const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            backgroundColor: "#101426",
            titleColor: "#F8FAFC",
            bodyColor: "#94A3B8",
            borderColor: "rgba(99, 102, 241, 0.2)",
            borderWidth: 1,
            padding: 10,
            cornerRadius: 8,
            displayColors: true,
            boxPadding: 4,
        },
    },
    scales: {
        x: {
            grid: { color: DARK_GRID, drawBorder: false },
            ticks: { color: DARK_TEXT, font: { size: 11 } },
            border: { display: false },
        },
        y: {
            grid: { color: DARK_GRID, drawBorder: false },
            ticks: { color: DARK_TEXT, font: { size: 11 } },
            border: { display: false },
            beginAtZero: true,
        },
    },
};

const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "bottom",
            labels: {
                color: DARK_TEXT,
                padding: 16,
                usePointStyle: true,
                pointStyleWidth: 8,
                font: { size: 12 },
            },
        },
        tooltip: {
            backgroundColor: "#101426",
            titleColor: "#F8FAFC",
            bodyColor: "#94A3B8",
            borderColor: "rgba(99, 102, 241, 0.2)",
            borderWidth: 1,
            padding: 10,
            cornerRadius: 8,
        },
    },
    cutout: "65%",
};

/** Preset gradient-compatible color palette */
export const CHART_COLORS = [
    "#6366F1", // Indigo
    "#22D3EE", // Cyan
    "#8B5CF6", // Violet
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#3B82F6", // Blue
    "#EC4899", // Pink
];

const AdminChart = ({ type = "line", data, options = {}, height = "280px" }) => {
    const mergedOptions = useMemo(() => {
        if (type === "doughnut") {
            return { ...doughnutOptions, ...options };
        }
        return {
            ...baseOptions,
            ...options,
            plugins: { ...baseOptions.plugins, ...options.plugins },
            scales: type !== "doughnut" ? {
                x: { ...baseOptions.scales.x, ...options.scales?.x },
                y: { ...baseOptions.scales.y, ...options.scales?.y },
            } : undefined,
        };
    }, [type, options]);

    const ChartComponent = type === "bar" ? Bar : type === "doughnut" ? Doughnut : Line;

    return (
        <div style={{ position: "relative", height }}>
            <ChartComponent data={data} options={mergedOptions} />
        </div>
    );
};

export default AdminChart;
