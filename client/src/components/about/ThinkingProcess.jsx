// APP/client/src/components/about/ThinkingProcess.jsx

import { motion } from "framer-motion";
import "./ThinkingProcess.css";

const THINKING_STEPS = [
    { label: "Understand", desc: "Core problem & user needs" },
    { label: "Simplify", desc: "Remove unnecessary friction" },
    { label: "Design", desc: "Intuitive interface UX" },
    { label: "Engineer", desc: "Clean & resilient stack" },
    { label: "Test", desc: "Validate stability & speed" },
    { label: "Improve", desc: "Iterate from real usage" },
];

const ThinkingProcess = () => {
    return (
        <section className="thinking-process section-lg">
            <div className="container">
                {/* Large Statement Header */}
                <div className="thinking-process__header">
                    <motion.h2
                        className="thinking-process__statement"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        We don&apos;t start with technology. <br />
                        We start with <span className="text-gradient">the problem</span>.
                    </motion.h2>
                    <motion.p
                        className="thinking-process__copy"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        viewport={{ once: true }}
                    >
                        Technologies are tools. They are selected based on what the product actually needs—not simply because a framework or platform happens to be trending.
                    </motion.p>
                </div>

                {/* Pipeline Flow */}
                <div className="thinking-pipeline">
                    <div className="thinking-pipeline__track">
                        <motion.div
                            className="thinking-pipeline__progress"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        />
                    </div>

                    <div className="thinking-pipeline__nodes">
                        {THINKING_STEPS.map((step, i) => (
                            <motion.div
                                key={step.label}
                                className="thinking-pipeline__node"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <span className="thinking-pipeline__dot" />
                                <span className="thinking-pipeline__label">{step.label}</span>
                                <span className="thinking-pipeline__desc">{step.desc}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ThinkingProcess;
