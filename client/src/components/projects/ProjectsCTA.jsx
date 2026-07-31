// APP/client/src/components/projects/ProjectsCTA.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import "./ProjectsCTA.css";

const ProjectsCTA = () => {
    return (
        <section className="projects-cta section-lg">
            <div className="container">
                <motion.div
                    className="projects-cta__panel"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="projects-cta__glow" aria-hidden="true" />

                    <div className="projects-cta__content">
                        <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                            <span className="section-tag-dot" />
                            YOUR IDEA COULD BE NEXT
                        </div>

                        <h2 className="projects-cta__title">
                            The next project here <br />
                            <span className="text-gradient">could be yours.</span>
                        </h2>

                        <p className="projects-cta__subtitle">
                            Tell us what you&apos;re trying to create. We&apos;ll help turn the idea into a clearer product direction.
                        </p>

                        <div className="projects-cta__actions">
                            <Link to={ROUTES.CONTACT} className="btn btn--primary btn--lg">
                                Start a Project <HiArrowRight />
                            </Link>
                            <Link to={ROUTES.SERVICES} className="btn btn--outline btn--lg">
                                Explore Services
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsCTA;
