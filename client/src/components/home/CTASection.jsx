// APP/client/src/components/home/CTASection.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiSparkles } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import "./CTASection.css";

const CTASection = () => {
    return (
        <section className="cta-section section-lg">
            <div className="container">
                <motion.div
                    className="cta-panel"
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {/* Background mesh lighting */}
                    <div className="cta-panel__mesh" aria-hidden="true" />

                    <div className="cta-panel__content">
                        <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                            <HiSparkles />
                            LET&apos;S COLLABORATE
                        </div>

                        <h2 className="cta-panel__title">
                            Have an idea <span className="text-gradient">worth building</span>?
                        </h2>

                        <p className="cta-panel__subtitle">
                            Let&apos;s turn it into something real. Our team is ready to design, engineer, and deploy your next digital product.
                        </p>

                        <div className="cta-panel__actions">
                            <Link to={ROUTES.CONTACT} className="btn btn--primary btn--lg">
                                Start Your Project <HiArrowRight />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
