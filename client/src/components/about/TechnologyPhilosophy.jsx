// APP/client/src/components/about/TechnologyPhilosophy.jsx

import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { SiJavascript, SiExpress, SiMongodb, SiCloudinary } from "react-icons/si";
import { HiLightningBolt } from "react-icons/hi";
import "./TechnologyPhilosophy.css";

const PHILOSOPHY_STACK = [
    { name: "React 18", role: "UI & Component Layer", icon: <FaReact color="#61DAFB" /> },
    { name: "JavaScript ES6+", role: "Core Language", icon: <SiJavascript color="#F7DF1E" /> },
    { name: "Node.js", role: "Server Runtime", icon: <FaNodeJs color="#339933" /> },
    { name: "Express.js", role: "API Framework", icon: <SiExpress color="#ffffff" /> },
    { name: "MongoDB", role: "NoSQL Database", icon: <SiMongodb color="#47A248" /> },
    { name: "REST APIs", role: "Service Communication", icon: <HiLightningBolt color="#22D3EE" /> },
    { name: "Cloudinary", role: "Media CDN Service", icon: <SiCloudinary color="#3448C5" /> },
    { name: "Git & Versioning", role: "Code Maintenance", icon: <FaGitAlt color="#F05032" /> },
];

const TechnologyPhilosophy = () => {
    return (
        <section className="tech-philosophy section-lg">
            <div className="container">
                <div className="tech-philosophy__header">
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        TECHNOLOGY
                    </div>
                    <motion.h2
                        className="tech-philosophy__statement"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Tools change. <br />
                        <span className="text-gradient">Engineering principles don&apos;t.</span>
                    </motion.h2>
                    <p className="tech-philosophy__copy">
                        We choose technologies according to the problem we&apos;re solving—not simply because a framework or platform is trending.
                    </p>
                </div>

                {/* Structured Tech Network */}
                <div className="tech-philosophy__network">
                    {PHILOSOPHY_STACK.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            className="tech-node"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            viewport={{ once: true }}
                        >
                            <div className="tech-node__icon">{tech.icon}</div>
                            <div className="tech-node__info">
                                <span className="tech-node__name">{tech.name}</span>
                                <span className="tech-node__role">{tech.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechnologyPhilosophy;
