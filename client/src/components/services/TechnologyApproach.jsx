// APP/client/src/components/services/TechnologyApproach.jsx

import { motion } from "framer-motion";
import "./TechnologyApproach.css";

const TECH_GROUPS = [
    {
        category: "FRONTEND & UI",
        accent: "var(--color-accent)",
        items: ["React 18", "JavaScript ES6+", "HTML5 & Modern CSS", "CSS Modules"],
    },
    {
        category: "BACKEND & APIS",
        accent: "var(--color-primary-light)",
        items: ["Node.js", "Express.js Framework", "RESTful Architecture", "JWT Auth"],
    },
    {
        category: "DATABASE LAYER",
        accent: "var(--color-success)",
        items: ["MongoDB Atlas", "Mongoose ORM", "Structured Schemas", "Indexing"],
    },
    {
        category: "SERVICES & INFRA",
        accent: "var(--color-secondary)",
        items: ["Cloudinary CDN", "Nodemailer SMTP", "Third-party APIs", "Cloud Hosting"],
    },
    {
        category: "DEVELOPMENT WORKFLOW",
        accent: "var(--color-accent-blue)",
        items: ["Git & GitHub", "Vite Build Tooling", "ESLint Code Quality", "npm Package Mgr"],
    },
];

const TechnologyApproach = () => {
    return (
        <section className="tech-approach section-lg">
            <div className="container">
                <div className="tech-approach__header">
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        OUR TECHNOLOGY APPROACH
                    </div>
                    <motion.h2
                        className="tech-approach__title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Technology is the tool. <br />
                        <span className="text-gradient">Not the product.</span>
                    </motion.h2>
                    <p className="tech-approach__copy">
                        We choose technologies around the requirements of the product rather than forcing every idea into the same stack.
                    </p>
                </div>

                <div className="tech-approach__grid">
                    {TECH_GROUPS.map((group, i) => (
                        <motion.div
                            key={group.category}
                            className="tech-group-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <span className="tech-group-card__badge" style={{ color: group.accent }}>
                                {group.category}
                            </span>
                            <ul className="tech-group-card__list">
                                {group.items.map((item) => (
                                    <li key={item} className="tech-group-card__item">
                                        <span className="tech-group-card__dot" style={{ background: group.accent }} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechnologyApproach;
