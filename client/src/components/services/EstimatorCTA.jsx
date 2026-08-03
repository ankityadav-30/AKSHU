// APP/client/src/components/services/EstimatorCTA.jsx

import { motion } from "framer-motion";
import { HiCalculator, HiArrowRight } from "react-icons/hi";
import "./EstimatorCTA.css";

const EstimatorCTA = () => {
    return (
        <section className="estimator-cta section-lg">
            <div className="container">
                <motion.div
                    className="estimator-cta__card"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="estimator-cta__glow" aria-hidden="true" />

                    <div className="estimator-cta__content">
                        <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                            <HiCalculator />
                            PROJECT PLANNING
                        </div>

                        <h2 className="estimator-cta__title">
                            Curious what your project <span className="text-gradient">might cost</span>?
                        </h2>

                        <p className="estimator-cta__desc">
                            Configure a few basic requirements and get a rough, non-binding estimate range before starting a conversation.
                        </p>

                        <div className="estimator-cta__actions">
                            <a href="/#estimator" className="btn btn--primary btn--lg">
                                Estimate My Project <HiArrowRight />
                            </a>
                        </div>

                        <p className="estimator-cta__disclaimer">
                            Estimates are indicative and non-binding. Final pricing depends on scope, technical requirements, integrations, design complexity and timeline.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default EstimatorCTA;
