// APP/client/src/components/services/ServicesHero.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiCalculator, HiSparkles } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import "./ServicesHero.css";

const STACK_LAYERS = [
    { label: "EXPERIENCE", desc: "User Journeys & Touchpoints", accent: "#22D3EE" },
    { label: "INTERFACE", desc: "Design Systems & React UI", accent: "#8B5CF6" },
    { label: "APPLICATION", desc: "Business Logic & State", accent: "#6366F1" },
    { label: "API & SERVICES", desc: "REST Services & Auth", accent: "#3B82F6" },
    { label: "DATA LAYER", desc: "MongoDB & Cloud Storage", accent: "#10B981" },
];

const ServicesHero = () => {
    return (
        <section className="services-hero">
            <div className="services-hero__bg" aria-hidden="true">
                <div className="services-hero__orb services-hero__orb--primary" />
                <div className="services-hero__orb services-hero__orb--cyan" />
                <div className="services-hero__grid" />
            </div>

            <div className="container services-hero__container">
                {/* Left Content */}
                <div className="services-hero__content">
                    <motion.div
                        className="services-hero__eyebrow"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <HiSparkles className="services-hero__eyebrow-icon" />
                        <span>WHAT WE BUILD</span>
                    </motion.div>

                    <motion.h1
                        className="services-hero__title"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        From ambitious ideas <br />
                        to <span className="text-gradient">products people can use.</span>
                    </motion.h1>

                    <motion.p
                        className="services-hero__subtitle"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        From interfaces to backend systems, AKSHU Technologies combines design and engineering to turn ideas into reliable digital products.
                    </motion.p>

                    <motion.div
                        className="services-hero__actions"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Link to={ROUTES.CONTACT} className="btn btn--primary btn--lg">
                            Discuss Your Project <HiArrowRight />
                        </Link>
                        <a href="/#estimator" className="btn btn--outline btn--lg">
                            <HiCalculator /> Get a Rough Estimate
                        </a>
                    </motion.div>
                </div>

                {/* Right Visual — Product Architecture Stack */}
                <motion.div
                    className="services-hero__visual-wrapper"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <div className="product-stack">
                        {STACK_LAYERS.map((layer, index) => (
                            <motion.div
                                key={layer.label}
                                className="product-stack__layer"
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <span className="product-stack__dot" style={{ background: layer.accent, boxShadow: `0 0 10px ${layer.accent}` }} />
                                <div className="product-stack__info">
                                    <span className="product-stack__label">{layer.label}</span>
                                    <span className="product-stack__desc">{layer.desc}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesHero;
