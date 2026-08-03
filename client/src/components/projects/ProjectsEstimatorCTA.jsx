// APP/client/src/components/projects/ProjectsEstimatorCTA.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiCalculator } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import "./ProjectsEstimatorCTA.css";

const ProjectsEstimatorCTA = () => {
    return (
        <section className="projects-estimator-cta section-lg">
            <div className="container">
                <motion.div
                    className="projects-estimator-cta__card"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="projects-estimator-cta__glow" aria-hidden="true" />

                    <div className="projects-estimator-cta__content">
                        <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                            <span className="section-tag-dot" />
                            SEEN SOMETHING THAT SPARKED AN IDEA?
                        </div>

                        <h2 className="projects-estimator-cta__title">
                            Your project doesn&apos;t need to look like these. <br />
                            <span className="text-gradient">It needs to solve your problem.</span>
                        </h2>

                        <p className="projects-estimator-cta__desc">
                            Explore a rough, non-binding project estimate range or tell us what you&apos;re thinking about building.
                        </p>

                        <div className="projects-estimator-cta__actions">
                            <Link to={ROUTES.CONTACT} className="btn btn--primary btn--lg">
                                Discuss Your Idea <HiArrowRight />
                            </Link>
                            <a href="/#estimator" className="btn btn--outline btn--lg">
                                <HiCalculator /> Get a Rough Estimate
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsEstimatorCTA;
