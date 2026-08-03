// APP/client/src/components/about/AboutCTA.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiCalculator } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import "./AboutCTA.css";

const AboutCTA = () => {
    return (
        <section className="about-cta section-lg">
            <div className="container">
                <motion.div
                    className="about-cta__panel"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="about-cta__glow" aria-hidden="true" />

                    <div className="about-cta__content">
                        <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                            <span className="section-tag-dot" />
                            LET&apos;S BUILD
                        </div>

                        <h2 className="about-cta__title">
                            Enough about us. <br />
                            <span className="text-gradient">What are you building?</span>
                        </h2>

                        <p className="about-cta__subtitle">
                            Tell us about your idea, challenge, or product vision. Let&apos;s explore what it could become together.
                        </p>

                        <div className="about-cta__actions">
                            <Link to={ROUTES.CONTACT} className="btn btn--primary btn--lg">
                                Start a Project <HiArrowRight />
                            </Link>
                            <Link to={ROUTES.PROJECTS} className="btn btn--outline btn--lg">
                                Explore Our Work
                            </Link>
                            <a href="/#estimator" className="btn btn--outline btn--lg">
                                <HiCalculator /> Estimate Your Project
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutCTA;
