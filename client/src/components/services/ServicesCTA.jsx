// APP/client/src/components/services/ServicesCTA.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiCalculator } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import "./ServicesCTA.css";

const ServicesCTA = () => {
    return (
        <section className="services-cta section-lg">
            <div className="container">
                <motion.div
                    className="services-cta__panel"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="services-cta__glow" aria-hidden="true" />

                    <div className="services-cta__content">
                        <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                            <span className="section-tag-dot" />
                            START SOMETHING
                        </div>

                        <h2 className="services-cta__title">
                            You bring the problem. <br />
                            <span className="text-gradient">We&apos;ll help shape the technology.</span>
                        </h2>

                        <p className="services-cta__subtitle">
                            Whether you&apos;re starting with a detailed specification or simply an idea, the first step is understanding what you&apos;re trying to create.
                        </p>

                        <div className="services-cta__actions">
                            <Link to={ROUTES.CONTACT} className="btn btn--primary btn--lg">
                                Start a Project <HiArrowRight />
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

export default ServicesCTA;
