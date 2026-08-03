// APP/client/src/components/blog/TopicsExplorer.jsx

import { motion } from "framer-motion";
import { HiCode, HiColorSwatch, HiChip, HiLightningBolt } from "react-icons/hi";
import "./TopicsExplorer.css";

const TOPICS = [
    { num: "01", title: "ENGINEERING", desc: "Systems, architecture & REST APIs", category: "Programming", icon: <HiCode size={24} /> },
    { num: "02", title: "AI & INTELLIGENCE", desc: "Automation, algorithms & ML models", category: "AI", icon: <HiChip size={24} /> },
    { num: "03", title: "WEB & UX", desc: "Interfaces, design systems & frontend", category: "Technology", icon: <HiColorSwatch size={24} /> },
    { num: "04", title: "TUTORIALS & NEWS", desc: "Step-by-step guides & updates", category: "Tutorial", icon: <HiLightningBolt size={24} /> },
];

const TopicsExplorer = ({ onSelectCategory }) => {
    return (
        <section className="topics-explorer section-lg">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        WHAT WE&apos;RE EXPLORING
                    </div>
                    <h2 className="section-title">
                        Engineering, product design, <br />
                        and <span className="text-gradient">modern technology</span>.
                    </h2>
                </div>

                <div className="topics-grid">
                    {TOPICS.map((topic, i) => (
                        <motion.button
                            key={topic.num}
                            type="button"
                            className="topic-card"
                            onClick={() => onSelectCategory(topic.category)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="topic-card__icon">{topic.icon}</div>
                            <span className="topic-card__num">{topic.num}</span>
                            <h3 className="topic-card__title">{topic.title}</h3>
                            <p className="topic-card__desc">{topic.desc}</p>
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopicsExplorer;
