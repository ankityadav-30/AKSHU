// APP/client/src/components/home/Hero.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiSparkles } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import "./Hero.css";

const Hero = () => {
    return (
        <section className="hero">
            {/* Background lighting & tech grid */}
            <div className="hero__bg" aria-hidden="true">
                <div className="hero__orb hero__orb--primary" />
                <div className="hero__orb hero__orb--cyan" />
                <div className="hero__orb hero__orb--violet" />
                <div className="hero__grid-pattern" />
            </div>

            <div className="container hero__container">
                {/* Left Content */}
                <div className="hero__content">
                    <motion.div
                        className="hero__eyebrow"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <HiSparkles className="hero__eyebrow-icon" />
                        <span>DIGITAL PRODUCTS · ENGINEERING · INNOVATION</span>
                    </motion.div>

                    <motion.h1
                        className="hero__title"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        We Build Digital <br />
                        Experiences That <br />
                        <span className="hero__title-gradient">Move Ideas Forward.</span>
                    </motion.h1>

                    <motion.p
                        className="hero__subtitle"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        AKSHU Technologies designs and engineers modern digital products, scalable web experiences, and technology solutions built for what comes next.
                    </motion.p>

                    <motion.div
                        className="hero__actions"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Link to={ROUTES.CONTACT} className="btn btn--primary btn--lg">
                            Start a Project <HiArrowRight />
                        </Link>
                        <Link to={ROUTES.PROJECTS} className="btn btn--outline btn--lg">
                            Explore Our Work
                        </Link>
                    </motion.div>
                </div>

                {/* Right Visual — Interactive Abstract Tech Visual */}
                <motion.div
                    className="hero__visual-wrapper"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <div className="hero__visual">
                        {/* Outer rotating ring */}
                        <div className="hero__ring hero__ring--outer" />
                        <div className="hero__ring hero__ring--inner" />

                        {/* Central glowing core */}
                        <div className="hero__core">
                            <div className="hero__core-glow" />
                            <div className="hero__core-text">AKSHU</div>
                        </div>

                        {/* Floating glass technology nodes */}
                        <motion.div
                            className="hero__card hero__card--1"
                            animate={{ y: [-6, 6, -6] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span className="hero__card-dot" />
                            <div>
                                <span className="hero__card-title">Scalable Architecture</span>
                                <span className="hero__card-sub">Cloud Native</span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="hero__card hero__card--2"
                            animate={{ y: [6, -6, 6] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span className="hero__card-dot hero__card-dot--cyan" />
                            <div>
                                <span className="hero__card-title">High Performance</span>
                                <span className="hero__card-sub">Sub-100ms Latency</span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="hero__card hero__card--3"
                            animate={{ y: [-8, 4, -8] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span className="hero__card-dot hero__card-dot--violet" />
                            <div>
                                <span className="hero__card-title">Enterprise Security</span>
                                <span className="hero__card-sub">Encrypted End-to-End</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
