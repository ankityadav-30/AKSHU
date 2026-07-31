// APP/client/src/components/home/AboutPreview.jsx

import { motion } from "framer-motion";
import { HiLightBulb, HiChip, HiTrendingUp } from "react-icons/hi";
import "./AboutPreview.css";

const PRINCIPLES = [
    {
        number: "01",
        title: "Think Clearly",
        desc: "Understand the problem before choosing technology. We analyze goals, workflows, and user requirements before writing a single line of code.",
        icon: <HiLightBulb size={24} />,
        accent: "var(--color-primary)",
    },
    {
        number: "02",
        title: "Build Intelligently",
        desc: "Create scalable, maintainable, thoughtfully engineered solutions using modern stack best practices, high test coverage, and clean code architecture.",
        icon: <HiChip size={24} />,
        accent: "var(--color-accent)",
    },
    {
        number: "03",
        title: "Keep Evolving",
        desc: "Build products capable of growing with their users and businesses. Continuous deployment, monitoring, and iterative feature refinement.",
        icon: <HiTrendingUp size={24} />,
        accent: "var(--color-secondary)",
    },
];

const AboutPreview = () => {
    return (
        <section className="about-preview">
            <div className="container">
                <div className="about-preview__grid">
                    {/* Left Statement */}
                    <motion.div
                        className="about-preview__left"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="section-tag">
                            <span className="section-tag-dot" />
                            ABOUT AKSHU
                        </div>
                        <h2 className="about-preview__statement">
                            We turn ambitious ideas into <span className="text-gradient">thoughtfully engineered</span> digital products.
                        </h2>
                        <p className="about-preview__desc">
                            AKSHU Technologies operates at the intersection of creative product design, cloud architecture, and robust full-stack engineering. We partner with leaders to craft experiences that scale effortlessly.
                        </p>
                    </motion.div>

                    {/* Right Principles */}
                    <div className="about-preview__principles">
                        {PRINCIPLES.map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="principle-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                viewport={{ once: true }}
                            >
                                <div className="principle-card__header">
                                    <span className="principle-card__num">{item.number}</span>
                                    <div className="principle-card__icon" style={{ color: item.accent }}>
                                        {item.icon}
                                    </div>
                                </div>
                                <h3 className="principle-card__title">{item.title}</h3>
                                <p className="principle-card__desc">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPreview;
