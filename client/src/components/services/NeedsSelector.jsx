// APP/client/src/components/services/NeedsSelector.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheckCircle, HiArrowRight, HiSparkles } from "react-icons/hi";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants.js";
import "./NeedsSelector.css";

const GOALS = [
    {
        id: "website",
        title: "Launch a new website",
        desc: "Modern corporate website, landing pages, or digital brand platform.",
        recommended: ["Web & Product Development", "UI/UX Design", "Cloud & Integration"],
    },
    {
        id: "web-app",
        title: "Build a web application",
        desc: "Interactive SaaS product, client portal, or custom software solution.",
        recommended: ["Web & Product Development", "Backend & API Engineering", "UI/UX Design"],
    },
    {
        id: "admin-dashboard",
        title: "Create an admin or dashboard system",
        desc: "Internal analytics platform, control panel, or inventory workflow.",
        recommended: ["Web & Product Development", "Backend & API Engineering", "Commerce & Business Systems"],
    },
    {
        id: "improve-existing",
        title: "Improve an existing digital product",
        desc: "UI/UX redesign, performance audit, new feature additions, or backend overhaul.",
        recommended: ["UI/UX Design", "Technical Consulting", "Backend & API Engineering"],
    },
    {
        id: "apis-integrations",
        title: "Connect APIs or external services",
        desc: "Third-party API integration, payment gateway setup, or database migration.",
        recommended: ["Backend & API Engineering", "Cloud & Integration", "Commerce & Business Systems"],
    },
    {
        id: "mvp",
        title: "Build an MVP",
        desc: "Fast, focused product release to validate a startup idea with real users.",
        recommended: ["Web & Product Development", "Technical Consulting", "UI/UX Design"],
    },
    {
        id: "idea-only",
        title: "I only have an idea",
        desc: "Need technical guidance, feature scope planning, and architectural advice.",
        recommended: ["Technical Consulting", "UI/UX Design", "Web & Product Development"],
    },
];

const NeedsSelector = () => {
    const [selectedGoalId, setSelectedGoalId] = useState("web-app");

    const activeGoal = GOALS.find((g) => g.id === selectedGoalId) || GOALS[1];

    return (
        <section className="needs-selector section-lg">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <HiSparkles />
                        GOAL-BASED NAVIGATION
                    </div>
                    <h2 className="section-title">
                        What are you trying to <span className="text-gradient">achieve</span>?
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        You don&apos;t need to know which service you need. Start with what you&apos;re trying to accomplish.
                    </p>
                </div>

                <div className="needs-selector__layout">
                    {/* Goal Selector Column */}
                    <div className="needs-selector__goals">
                        {GOALS.map((goal) => {
                            const isSelected = goal.id === selectedGoalId;
                            return (
                                <button
                                    key={goal.id}
                                    type="button"
                                    className={`goal-card ${isSelected ? "goal-card--selected" : ""}`}
                                    onClick={() => setSelectedGoalId(goal.id)}
                                >
                                    <div className="goal-card__check">
                                        <HiCheckCircle className={isSelected ? "goal-check--active" : "goal-check--idle"} />
                                    </div>
                                    <div className="goal-card__info">
                                        <span className="goal-card__title">{goal.title}</span>
                                        <span className="goal-card__desc">{goal.desc}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Dynamic Recommendations Panel */}
                    <div className="needs-selector__recommendation">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeGoal.id}
                                className="recommendation-card"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className="recommendation-card__tag">RECOMMENDED APPROACH</span>
                                <h3 className="recommendation-card__title">{activeGoal.title}</h3>
                                <p className="recommendation-card__desc">{activeGoal.desc}</p>

                                <div className="recommendation-card__divider" />

                                <span className="recommendation-card__caps-label">RECOMMENDED AKSHU CAPABILITIES</span>
                                <div className="recommendation-card__caps-list">
                                    {activeGoal.recommended.map((cap) => (
                                        <div key={cap} className="recommendation-chip">
                                            <HiCheckCircle className="recommendation-chip__icon" /> {cap}
                                        </div>
                                    ))}
                                </div>

                                <div className="recommendation-card__actions">
                                    <Link to={ROUTES.CONTACT} className="btn btn--primary w-full">
                                        Discuss This Goal <HiArrowRight />
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NeedsSelector;
