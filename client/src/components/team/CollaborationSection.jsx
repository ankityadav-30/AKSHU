// APP/client/src/components/team/CollaborationSection.jsx

import { motion } from "framer-motion";
import "./CollaborationSection.css";

const COLLAB_STEPS = [
    { label: "IDEAS", desc: "Discover & Scope" },
    { label: "DESIGN", desc: "UX & Interfaces" },
    { label: "ENGINEERING", desc: "Full-Stack Build" },
    { label: "FEEDBACK", desc: "Review & Validate" },
    { label: "IMPROVEMENT", desc: "Refine & Evolve" },
];

const CollaborationSection = () => {
    return (
        <section className="collab-section section-lg">
            <div className="container">
                <div className="collab-section__header">
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        COLLABORATION
                    </div>
                    <motion.h2
                        className="collab-section__title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Great products are <span className="text-gradient">collaborative</span>.
                    </motion.h2>
                    <p className="collab-section__copy">
                        Strong product decisions emerge when different perspectives interact. Designers, engineers, and strategists work in tight feedback loops.
                    </p>
                </div>

                <div className="collab-pipeline">
                    <div className="collab-pipeline__track">
                        <motion.div
                            className="collab-pipeline__progress"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        />
                    </div>

                    <div className="collab-pipeline__nodes">
                        {COLLAB_STEPS.map((step, i) => (
                            <motion.div
                                key={step.label}
                                className="collab-node"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.12 }}
                                viewport={{ once: true }}
                            >
                                <span className="collab-node__dot" />
                                <span className="collab-node__label">{step.label}</span>
                                <span className="collab-node__desc">{step.desc}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CollaborationSection;
