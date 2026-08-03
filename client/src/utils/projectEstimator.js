// APP/client/src/utils/projectEstimator.js

export const PROJECT_TYPES = [
    {
        id: "business-website",
        title: "Business Website",
        desc: "Modern corporate website, landing pages, or marketing platform.",
        baseMin: 40000,
        baseMax: 75000,
        icon: "🌐",
    },
    {
        id: "ecommerce",
        title: "E-commerce Website",
        desc: "Online storefront, product catalog, cart, and checkout system.",
        baseMin: 70000,
        baseMax: 135000,
        icon: "🛒",
    },
    {
        id: "web-app",
        title: "Web Application",
        desc: "Custom interactive web app, client portal, or internal tool.",
        baseMin: 95000,
        baseMax: 175000,
        icon: "💻",
    },
    {
        id: "mobile-app",
        title: "Mobile Application",
        desc: "Cross-platform iOS/Android app built with modern tech.",
        baseMin: 120000,
        baseMax: 220000,
        icon: "📱",
    },
    {
        id: "saas",
        title: "SaaS Product",
        desc: "Multi-tenant subscription software platform with user dashboards.",
        baseMin: 160000,
        baseMax: 300000,
        icon: "🚀",
    },
    {
        id: "custom-software",
        title: "Custom Software",
        desc: "Enterprise workflows, specialized APIs, or legacy system overhaul.",
        baseMin: 220000,
        baseMax: 450000,
        icon: "⚙️",
    },
];

export const PROJECT_SIZES = [
    {
        id: "starter",
        title: "Starter",
        desc: "A focused product with essential MVP functionality.",
        multiplier: 0.85,
    },
    {
        id: "standard",
        title: "Standard",
        desc: "A complete product with multiple pages, features, and responsive layouts.",
        multiplier: 1.0,
    },
    {
        id: "advanced",
        title: "Advanced",
        desc: "A larger application with advanced functionality and integrations.",
        multiplier: 1.45,
    },
    {
        id: "enterprise",
        title: "Enterprise / Custom",
        desc: "Complex workflows, integrations, high scale, or specialized security requirements.",
        multiplier: 2.1,
    },
];

export const FEATURE_OPTIONS = [
    { id: "auth", title: "Authentication", costMin: 10000, costMax: 18000 },
    { id: "dashboard", title: "Admin Dashboard", costMin: 15000, costMax: 30000 },
    { id: "database", title: "Database Layer", costMin: 12000, costMax: 25000 },
    { id: "payments", title: "Payment Integration", costMin: 15000, costMax: 28000 },
    { id: "apis", title: "Third-party APIs", costMin: 12000, costMax: 24000 },
    { id: "uploads", title: "File / Image Uploads", costMin: 8000, costMax: 16000 },
    { id: "notifications", title: "Email / Notifications", costMin: 8000, costMax: 15000 },
    { id: "search", title: "Search & Filtering", costMin: 10000, costMax: 20000 },
    { id: "analytics", title: "Analytics Dashboard", costMin: 14000, costMax: 28000 },
    { id: "realtime", title: "Real-time Features", costMin: 18000, costMax: 35000 },
    { id: "roles", title: "Role-based Access", costMin: 12000, costMax: 22000 },
    { id: "cms", title: "CMS / Content Management", costMin: 15000, costMax: 30000 },
];

export const DESIGN_LEVELS = [
    {
        id: "simple",
        title: "Simple & Functional",
        desc: "Clean, accessible layout built using standard UI components.",
        multiplier: 0.9,
    },
    {
        id: "professional",
        title: "Professional Custom UI",
        desc: "Custom tailored brand identity, bespoke components, and micro-interactions.",
        multiplier: 1.15,
    },
    {
        id: "premium",
        title: "Premium Product Experience",
        desc: "World-class design, custom motion graphics, high-end aesthetics, and glassmorphism.",
        multiplier: 1.4,
    },
    {
        id: "not-sure",
        title: "Not Sure Yet",
        desc: "We will help determine the optimal design level during discovery.",
        multiplier: 1.0,
    },
];

export const TIMELINES = [
    { id: "flexible", title: "Flexible", desc: "No strict deadline; steady progress.", multiplier: 0.95 },
    { id: "normal", title: "2–3 Months", desc: "Standard recommended delivery pace.", multiplier: 1.0 },
    { id: "fast", title: "1–2 Months", desc: "Accelerated development sprint.", multiplier: 1.18 },
    { id: "urgent", title: "Urgent", desc: "Priority allocation for tight deadlines.", multiplier: 1.35 },
];

/**
 * Calculates a rough preliminary estimate range based on user selections
 */
export function calculateEstimateRange(state) {
    const projectType = PROJECT_TYPES.find((p) => p.id === state.projectType) || PROJECT_TYPES[0];
    const projectSize = PROJECT_SIZES.find((s) => s.id === state.projectSize) || PROJECT_SIZES[1];
    const designLevel = DESIGN_LEVELS.find((d) => d.id === state.designLevel) || DESIGN_LEVELS[1];
    const timeline = TIMELINES.find((t) => t.id === state.timeline) || TIMELINES[1];

    let min = projectType.baseMin * projectSize.multiplier * designLevel.multiplier * timeline.multiplier;
    let max = projectType.baseMax * projectSize.multiplier * designLevel.multiplier * timeline.multiplier;

    // Add cost of selected features
    if (state.features && state.features.length > 0) {
        state.features.forEach((featId) => {
            const feat = FEATURE_OPTIONS.find((f) => f.id === featId);
            if (feat) {
                min += feat.costMin * timeline.multiplier;
                max += feat.costMax * timeline.multiplier;
            }
        });
    }

    // Round to nearest 5,000 INR
    min = Math.round(min / 5000) * 5000;
    max = Math.round(max / 5000) * 5000;

    const formatter = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    });

    return {
        min,
        max,
        formattedRange: `${formatter.format(min)} – ${formatter.format(max)}`,
        projectTypeTitle: projectType.title,
        projectSizeTitle: projectSize.title,
        designLevelTitle: designLevel.title,
        timelineTitle: timeline.title,
        featureCount: state.features ? state.features.length : 0,
    };
}
