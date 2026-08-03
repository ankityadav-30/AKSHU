// APP/client/src/components/about/Principles.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import { HiArrowNarrowRight } from "react-icons/hi";
import "./Principles.css";

const PRINCIPLES_LIST = [
    {
        num: "01",
        title: "Think Before Building",
        subtitle: "Technology starts with understanding the problem.",
        desc: "We spend time understanding goals, constraints, workflows, and edge cases before writing code. A well-conceived architecture prevents months of rework later.",
    },
    {
        num: "02",
        title: "Simplicity Is Powerful",
        subtitle: "Complex engineering should not create complicated experiences.",
        desc: "The hardest part of software engineering is making the complex feel effortless. We strip away friction until only what is intuitive remains.",
    },
    {
        num: "03",
        title: "Build for Tomorrow",
        subtitle: "Architecture should support growth rather than become tomorrow's limitation.",
        desc: "We write clean, modular, tested code that allows products to scale seamlessly as user bases and business demands expand.",
    },
    {
        num: "04",
        title: "Never Stop Learning",
        subtitle: "Technology evolves constantly. So should the people building it.",
        desc: "We stay curious, continuously refine our engineering stack, adopt modern patterns thoughtfully, and pass those gains directly to our products.",
    },
];

const Principles = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="principles-section section-lg">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        THE PRINCIPLES BEHIND OUR WORK
                    </div>
                    <h2 className="section-title">
                        How we approach <span className="text-gradient">every product</span>.
                    </h2>
                </div>

                {/* Principles Editorial Accordion List */}
                <div className="principles-list">
                    {PRINCIPLES_LIST.map((principle, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <motion.div
                                key={principle.num}
                                className={`principle-row ${isOpen ? "principle-row--active" : ""}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                onClick={() => setActiveIndex(index)}
                                onMouseEnter={() => setActiveIndex(index)}
                                tabIndex={0}
                                role="button"
                                aria-expanded={isOpen}
                                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveIndex(index)}
                            >
                                <div className="principle-row__header">
                                    <span className="principle-row__num">{principle.num}</span>
                                    <div className="principle-row__titles">
                                        <h3 className="principle-row__title">{principle.title}</h3>
                                        <span className="principle-row__subtitle">{principle.subtitle}</span>
                                    </div>
                                    <HiArrowNarrowRight className="principle-row__arrow" />
                                </div>

                                {isOpen && (
                                    <motion.div
                                        className="principle-row__body"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p className="principle-row__desc">{principle.desc}</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Principles;
