// APP/client/src/components/team/TeamGrowth.jsx

import { motion } from "framer-motion";
import "./TeamGrowth.css";

const GROWTH_STEPS = [
    { label: "LEARN", sub: "R&D & Frameworks" },
    { label: "BUILD", sub: "Ambitious Products" },
    { label: "SHARE", sub: "Team Knowledge" },
    { label: "IMPROVE", sub: "Refine Execution" },
    { label: "GROW", sub: "Expand Capacity" },
];

const TeamGrowth = () => {
    return (
        <section className="team-growth section-lg">
            <div className="container">
                <div className="team-growth__header">
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        EVOLUTION
                    </div>
                    <motion.h2
                        className="team-growth__title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        We&apos;re <span className="text-gradient">growing with every project</span>.
                    </motion.h2>
                    <p className="team-growth__copy">
                        Every project gives us another opportunity to learn, improve our process, strengthen our engineering, and expand what AKSHU can build.
                    </p>
                </div>

                <div className="team-growth-horizon">
                    <div className="team-growth-horizon__line">
                        <motion.div
                            className="team-growth-horizon__progress"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        />
                    </div>

                    <div className="team-growth-horizon__nodes">
                        {GROWTH_STEPS.map((step, i) => (
                            <motion.div
                                key={step.label}
                                className="team-growth-node"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.12 }}
                                viewport={{ once: true }}
                            >
                                <span className="team-growth-node__dot" />
                                <span className="team-growth-node__label">{step.label}</span>
                                <span className="team-growth-node__sub">{step.sub}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamGrowth;
