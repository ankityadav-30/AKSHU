// APP/client/src/components/services/ConnectedProcess.jsx

import { motion } from "framer-motion";
import "./ConnectedProcess.css";

const CONNECTED_STAGES = [
    { label: "STRATEGY", desc: "Scope & Goals" },
    { label: "UX", desc: "User Journeys" },
    { label: "INTERFACE", desc: "Design Systems" },
    { label: "ENGINEERING", desc: "Full-Stack Tech" },
    { label: "INTEGRATION", desc: "APIs & Services" },
    { label: "LAUNCH", desc: "Cloud & Monitoring" },
];

const ConnectedProcess = () => {
    return (
        <section className="connected-process section-lg">
            <div className="container">
                <div className="connected-process__header">
                    <motion.h2
                        className="connected-process__title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        One product. Multiple disciplines. <br />
                        <span className="text-gradient">One connected process.</span>
                    </motion.h2>
                    <p className="connected-process__copy">
                        You don&apos;t need to figure out which separate agency to hire for UI/UX, backend, or cloud hosting. AKSHU Technologies handles the entire product stack under one cohesive engineering workflow.
                    </p>
                </div>

                <div className="connected-pipeline">
                    <div className="connected-pipeline__track">
                        <motion.div
                            className="connected-pipeline__progress"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        />
                    </div>

                    <div className="connected-pipeline__nodes">
                        {CONNECTED_STAGES.map((stage, i) => (
                            <motion.div
                                key={stage.label}
                                className="connected-node"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <span className="connected-node__dot" />
                                <span className="connected-node__label">{stage.label}</span>
                                <span className="connected-node__desc">{stage.desc}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConnectedProcess;
