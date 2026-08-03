// APP/client/src/components/projects/ProjectProcess.jsx

import { motion } from "framer-motion";
import "./ProjectProcess.css";

const PROCESS_STEPS = [
    { label: "Understand", sub: "Problem Discovery" },
    { label: "Define", sub: "Scope & Architecture" },
    { label: "Design", sub: "UI/UX & Prototypes" },
    { label: "Engineer", sub: "Clean Stack Build" },
    { label: "Validate", sub: "Testing & QA" },
    { label: "Evolve", sub: "Launch & Improve" },
];

const ProjectProcess = () => {
    return (
        <section className="project-process section-lg">
            <div className="container">
                <div className="project-process__header">
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        OUR PROCESS
                    </div>
                    <motion.h2
                        className="project-process__title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Different products. <br />
                        <span className="text-gradient">The same thoughtful process.</span>
                    </motion.h2>
                    <p className="project-process__copy">
                        Every project begins differently, but the goal remains the same: understand the problem clearly and build the right solution thoughtfully.
                    </p>
                </div>

                <div className="project-process-pipeline">
                    <div className="project-process-pipeline__track">
                        <motion.div
                            className="project-process-pipeline__progress"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        />
                    </div>

                    <div className="project-process-pipeline__nodes">
                        {PROCESS_STEPS.map((step, i) => (
                            <motion.div
                                key={step.label}
                                className="project-process-node"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <span className="project-process-node__dot" />
                                <span className="project-process-node__label">{step.label}</span>
                                <span className="project-process-node__sub">{step.sub}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectProcess;
