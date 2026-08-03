// APP/client/src/components/about/RoadAhead.jsx

import { motion } from "framer-motion";
import "./RoadAhead.css";

const ROAD_NODES = [
    { label: "LEARN", sub: "Continuous R&D" },
    { label: "BUILD", sub: "Ambitious Products" },
    { label: "IMPROVE", sub: "Refine Engineering" },
    { label: "SCALE", sub: "Expand Capacity" },
    { label: "CREATE IMPACT", sub: "Lasting Digital Value" },
];

const RoadAhead = () => {
    return (
        <section className="road-ahead section-lg">
            <div className="container">
                <div className="road-ahead__content" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        THE ROAD AHEAD
                    </div>
                    <h2 className="road-ahead__title">
                        We&apos;re <span className="text-gradient">just getting started</span>.
                    </h2>
                    <p className="road-ahead__subtitle" style={{ margin: "0 auto" }}>
                        AKSHU Technologies is being built with a long-term mindset: learn continuously, build increasingly ambitious products, strengthen our engineering capabilities, and create technology we&apos;re proud to put our name on.
                    </p>
                </div>

                {/* Horizon Progression Path */}
                <div className="road-horizon">
                    <div className="road-horizon__line">
                        <motion.div
                            className="road-horizon__progress"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        />
                    </div>

                    <div className="road-horizon__nodes">
                        {ROAD_NODES.map((node, i) => (
                            <motion.div
                                key={node.label}
                                className="road-node"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                viewport={{ once: true }}
                            >
                                <span className="road-node__dot" />
                                <span className="road-node__label">{node.label}</span>
                                <span className="road-node__sub">{node.sub}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoadAhead;
