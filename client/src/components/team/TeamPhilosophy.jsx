// APP/client/src/components/team/TeamPhilosophy.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import { HiArrowNarrowRight } from "react-icons/hi";
import "./TeamPhilosophy.css";

const PRINCIPLES = [
    {
        num: "01",
        title: "CURIOSITY",
        subtitle: "Keep asking better questions.",
        desc: "We explore problems deeply before jumping to implementation. Asking the right technical and product questions leads to simpler, more resilient solutions.",
    },
    {
        num: "02",
        title: "OWNERSHIP",
        subtitle: "Take responsibility for the work and its outcome.",
        desc: "We take pride in the code, design decisions, and products we build. Ownership means caring about long-term reliability and user experience.",
    },
    {
        num: "03",
        title: "COLLABORATION",
        subtitle: "Strong products come from shared thinking.",
        desc: "Great software is rarely built in isolation. We bridge design, frontend, backend, and cloud engineering through constant feedback and open dialogue.",
    },
    {
        num: "04",
        title: "GROWTH",
        subtitle: "Keep improving the craft.",
        desc: "Technology moves fast. We continuously refine our engineering patterns, study modern frameworks, and incorporate better tooling with every project.",
    },
];

const TeamPhilosophy = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="team-philosophy section-lg">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        HOW WE THINK TOGETHER
                    </div>
                    <h2 className="section-title">
                        Different strengths. <span className="text-gradient">One direction.</span>
                    </h2>
                </div>

                <div className="team-philosophy-list">
                    {PRINCIPLES.map((principle, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <motion.div
                                key={principle.num}
                                className={`team-principle-row ${isOpen ? "team-principle-row--active" : ""}`}
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
                                <div className="team-principle-row__header">
                                    <span className="team-principle-row__num">{principle.num}</span>
                                    <div className="team-principle-row__titles">
                                        <h3 className="team-principle-row__title">{principle.title}</h3>
                                        <span className="team-principle-row__subtitle">{principle.subtitle}</span>
                                    </div>
                                    <HiArrowNarrowRight className="team-principle-row__arrow" />
                                </div>

                                {isOpen && (
                                    <motion.div
                                        className="team-principle-row__body"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p className="team-principle-row__desc">{principle.desc}</p>
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

export default TeamPhilosophy;
