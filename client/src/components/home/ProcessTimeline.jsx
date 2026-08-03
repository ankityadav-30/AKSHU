// APP/client/src/components/home/ProcessTimeline.jsx

import { motion } from "framer-motion";
import "./ProcessTimeline.css";

const STEPS = [
    {
        num: "01",
        title: "Discover",
        desc: "We analyze business requirements, map target user flows, and define clear technical goals.",
    },
    {
        num: "02",
        title: "Design",
        desc: "Interactive wireframes, UX prototypes, and scalable component design systems.",
    },
    {
        num: "03",
        title: "Engineer",
        desc: "Full-stack development, API integration, database design, and rigorous unit testing.",
    },
    {
        num: "04",
        title: "Launch",
        desc: "Cloud deployment, performance tuning, security checks, and zero-downtime go-live.",
    },
    {
        num: "05",
        title: "Evolve",
        desc: "Continuous feature enhancements, analytics tracking, and automated maintenance.",
    },
];

const ProcessTimeline = () => {
    return (
        <section className="process-timeline section-lg">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        HOW WE BUILD
                    </div>
                    <h2 className="section-title">
                        A disciplined, <span className="text-gradient">agile process</span>.
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        From initial discovery to continuous post-launch evolution, every phase is engineered for quality.
                    </p>
                </div>

                {/* Timeline Grid */}
                <div className="timeline">
                    <div className="timeline__track" aria-hidden="true">
                        <motion.div
                            className="timeline__progress"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        />
                    </div>

                    <div className="timeline__steps">
                        {STEPS.map((step, i) => (
                            <motion.div
                                key={step.num}
                                className="timeline__step"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.12 }}
                                viewport={{ once: true }}
                            >
                                <div className="timeline__node">
                                    <span className="timeline__node-dot" />
                                    <span className="timeline__num">{step.num}</span>
                                </div>
                                <h3 className="timeline__title">{step.title}</h3>
                                <p className="timeline__desc">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessTimeline;
