// APP/client/src/components/about/AboutHero.jsx

import { motion } from "framer-motion";
import { HiSparkles, HiOutlineArrowNarrowDown } from "react-icons/hi";
import "./AboutHero.css";

const AboutHero = () => {
    return (
        <section className="about-hero">
            {/* Ambient Lighting & Tech Grid */}
            <div className="about-hero__bg" aria-hidden="true">
                <div className="about-hero__orb about-hero__orb--primary" />
                <div className="about-hero__orb about-hero__orb--cyan" />
                <div className="about-hero__grid" />
                <div className="about-hero__wordmark">AKSHU</div>
            </div>

            <div className="container about-hero__container">
                <div className="about-hero__content">
                    <motion.div
                        className="about-hero__eyebrow"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <HiSparkles className="about-hero__eyebrow-icon" />
                        <span>ABOUT AKSHU TECHNOLOGIES</span>
                    </motion.div>

                    <motion.h1
                        className="about-hero__title"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Technology should do <br />
                        more than work. <br />
                        It should <span className="text-gradient">move ideas forward.</span>
                    </motion.h1>

                    <motion.p
                        className="about-hero__subtitle"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        AKSHU Technologies is focused on turning ideas into thoughtful digital products through design, engineering, and modern technology.
                    </motion.p>
                </div>

                {/* Animated Scroll Indicator */}
                <motion.div
                    className="about-hero__scroll"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <span className="about-hero__scroll-text">SCROLL TO DISCOVER</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <HiOutlineArrowNarrowDown className="about-hero__scroll-icon" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutHero;
