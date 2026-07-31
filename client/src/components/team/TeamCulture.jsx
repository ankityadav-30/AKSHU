// APP/client/src/components/team/TeamCulture.jsx

import { motion } from "framer-motion";
import "./TeamCulture.css";

const CULTURE_PILLARS = [
    { num: "01", title: "LEARN OPENLY", desc: "Share what you discover with the rest of the team." },
    { num: "02", title: "BUILD THOUGHTFULLY", desc: "Understand goals, constraints, and architecture before implementing." },
    { num: "03", title: "GIVE USEFUL FEEDBACK", desc: "Challenge ideas constructively to make the product better." },
    { num: "04", title: "TAKE OWNERSHIP", desc: "Care about the final result and user experience, not only assigned tasks." },
    { num: "05", title: "STAY CURIOUS", desc: "Technology never stops changing. Neither do we." },
];

const TeamCulture = () => {
    return (
        <section className="team-culture section-lg">
            <div className="container">
                <div className="team-culture__header">
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        THE CULTURE WE&apos;RE BUILDING
                    </div>
                    <motion.h2
                        className="team-culture__statement"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        The culture we&apos;re building <br />
                        matters as much as the <br />
                        <span className="text-gradient">products we&apos;re building.</span>
                    </motion.h2>
                </div>

                <div className="team-culture__list">
                    {CULTURE_PILLARS.map((pillar, i) => (
                        <motion.div
                            key={pillar.num}
                            className="culture-pillar-item"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <span className="culture-pillar-item__num">{pillar.num}</span>
                            <div className="culture-pillar-item__info">
                                <h3 className="culture-pillar-item__title">{pillar.title}</h3>
                                <p className="culture-pillar-item__desc">{pillar.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamCulture;
