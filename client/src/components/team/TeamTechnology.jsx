// APP/client/src/components/team/TeamTechnology.jsx

import { motion } from "framer-motion";
import { HiColorSwatch, HiCode, HiServer, HiCube } from "react-icons/hi";
import "./TeamTechnology.css";

const ECOSYSTEM_NODES = [
    { label: "DESIGN", desc: "UI/UX Systems & Prototypes", icon: <HiColorSwatch size={24} />, accent: "var(--color-primary-light)" },
    { label: "FRONTEND", desc: "React 18 & Modern CSS", icon: <HiCode size={24} />, accent: "var(--color-accent)" },
    { label: "BACKEND", desc: "Node.js & Express REST APIs", icon: <HiServer size={24} />, accent: "var(--color-secondary)" },
    { label: "PRODUCT", desc: "Data, Security & Architecture", icon: <HiCube size={24} />, accent: "var(--color-success)" },
];

const TeamTechnology = () => {
    return (
        <section className="team-tech section-lg">
            <div className="container">
                <div className="team-tech__header">
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        THE ECOSYSTEM
                    </div>
                    <motion.h2
                        className="team-tech__title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Where design, engineering, <br />
                        and <span className="text-gradient">product meet.</span>
                    </motion.h2>
                    <p className="team-tech__copy">
                        We connect disciplines into one cohesive technical environment, combining design systems with resilient server architectures.
                    </p>
                </div>

                <div className="team-tech__grid">
                    {ECOSYSTEM_NODES.map((node, i) => (
                        <motion.div
                            key={node.label}
                            className="team-tech-node"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="team-tech-node__icon" style={{ color: node.accent }}>
                                {node.icon}
                            </div>
                            <span className="team-tech-node__label">{node.label}</span>
                            <span className="team-tech-node__desc">{node.desc}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamTechnology;
