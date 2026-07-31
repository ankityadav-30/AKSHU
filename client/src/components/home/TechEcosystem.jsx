// APP/client/src/components/home/TechEcosystem.jsx

import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaGitAlt, FaCloud } from "react-icons/fa";
import { SiJavascript, SiExpress, SiMongodb, SiCloudinary } from "react-icons/si";
import { HiLightningBolt } from "react-icons/hi";
import "./TechEcosystem.css";

const TECH_STACK = [
    { name: "React 18", category: "Frontend Core", icon: <FaReact size={32} color="#61DAFB" /> },
    { name: "JavaScript ES6+", category: "Language", icon: <SiJavascript size={30} color="#F7DF1E" /> },
    { name: "Node.js", category: "Runtime", icon: <FaNodeJs size={32} color="#339933" /> },
    { name: "Express.js", category: "Backend Framework", icon: <SiExpress size={30} color="#ffffff" /> },
    { name: "MongoDB", category: "Database Layer", icon: <SiMongodb size={32} color="#47A248" /> },
    { name: "REST APIs", category: "Architecture", icon: <HiLightningBolt size={32} color="#22D3EE" /> },
    { name: "Cloudinary", category: "Media CDN", icon: <SiCloudinary size={30} color="#3448C5" /> },
    { name: "Git & GitHub", category: "Version Control", icon: <FaGitAlt size={32} color="#F05032" /> },
    { name: "Cloud Infra", category: "Deployment", icon: <FaCloud size={30} color="#6366F1" /> },
];

const TechEcosystem = () => {
    return (
        <section className="tech-ecosystem section-lg">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        ENGINEERED WITH MODERN TECHNOLOGY
                    </div>
                    <h2 className="section-title">
                        Powered by a modern, <span className="text-gradient">resilient stack</span>.
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        We leverage industry-standard technologies to ensure high performance, security, and long-term maintainability.
                    </p>
                </div>

                {/* Tech Constellation Grid */}
                <div className="tech-grid">
                    {TECH_STACK.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            className="tech-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            viewport={{ once: true }}
                        >
                            <div className="tech-card__icon">{tech.icon}</div>
                            <div className="tech-card__info">
                                <span className="tech-card__name">{tech.name}</span>
                                <span className="tech-card__cat">{tech.category}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechEcosystem;
