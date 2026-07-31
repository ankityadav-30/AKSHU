// APP/client/src/components/team/TeamCTA.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import "./TeamCTA.css";

const TeamCTA = () => {
    return (
        <section className="team-cta section-lg">
            <div className="container">
                <motion.div
                    className="team-cta__panel"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="team-cta__glow" aria-hidden="true" />

                    <div className="team-cta__content">
                        <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                            <span className="section-tag-dot" />
                            LET&apos;S CREATE
                        </div>

                        <h2 className="team-cta__title">
                            We build together. <br />
                            <span className="text-gradient">Maybe the next idea is yours.</span>
                        </h2>

                        <p className="team-cta__subtitle">
                            Explore what we&apos;ve built—or start a conversation about something new.
                        </p>

                        <div className="team-cta__actions">
                            <Link to={ROUTES.CONTACT} className="btn btn--primary btn--lg">
                                Start a Project <HiArrowRight />
                            </Link>
                            <Link to={ROUTES.PROJECTS} className="btn btn--outline btn--lg">
                                Explore Projects
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TeamCTA;
