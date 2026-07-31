// APP/client/src/components/services/EngagementProcess.jsx

import { motion } from "framer-motion";
import "./EngagementProcess.css";

const ENGAGEMENT_STEPS = [
    {
        num: "01",
        title: "Tell Us About the Idea",
        desc: "Share your goals, problem statement, target users, expectations, and any preliminary requirements.",
    },
    {
        num: "02",
        title: "Understand the Scope",
        desc: "We discuss feature priorities, technical constraints, integrations, and architectural expectations.",
    },
    {
        num: "03",
        title: "Shape the Approach",
        desc: "We align on a clear product roadmap, tech stack selection, milestone deliverables, and estimate range.",
    },
    {
        num: "04",
        title: "Design & Build",
        desc: "We move through UX design, interface creation, backend engineering, and API integration in agile sprints.",
    },
    {
        num: "05",
        title: "Validate & Launch",
        desc: "We conduct performance tuning, security checks, and cross-browser QA before deploying to production.",
    },
];

const EngagementProcess = () => {
    return (
        <section className="engagement-process section-lg">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        ENGAGEMENT LIFECYCLE
                    </div>
                    <h2 className="section-title">
                        What happens <span className="text-gradient">next</span>?
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        Here is what to expect after reaching out to AKSHU Technologies.
                    </p>
                </div>

                <div className="engagement-timeline">
                    <div className="engagement-timeline__track">
                        <motion.div
                            className="engagement-timeline__progress"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        />
                    </div>

                    <div className="engagement-timeline__steps">
                        {ENGAGEMENT_STEPS.map((step, i) => (
                            <motion.div
                                key={step.num}
                                className="engagement-step"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.12 }}
                                viewport={{ once: true }}
                            >
                                <div className="engagement-step__node">
                                    <span className="engagement-step__num">{step.num}</span>
                                </div>
                                <h3 className="engagement-step__title">{step.title}</h3>
                                <p className="engagement-step__desc">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EngagementProcess;
