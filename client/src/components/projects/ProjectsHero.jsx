// APP/client/src/components/projects/ProjectsHero.jsx

import { motion } from "framer-motion";
import { HiSparkles, HiOutlineArrowNarrowDown } from "react-icons/hi";
import "./ProjectsHero.css";

const ProjectsHero = () => {
    return (
        <section className="projects-hero">
            <div className="projects-hero__bg" aria-hidden="true">
                <div className="projects-hero__orb projects-hero__orb--primary" />
                <div className="projects-hero__orb projects-hero__orb--cyan" />
                <div className="projects-hero__grid" />
            </div>

            <div className="container projects-hero__container">
                <div className="projects-hero__content">
                    <motion.div
                        className="projects-hero__eyebrow"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <HiSparkles className="projects-hero__eyebrow-icon" />
                        <span>SELECTED WORK</span>
                    </motion.div>

                    <motion.h1
                        className="projects-hero__title"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Ideas become more convincing <br />
                        when you can <span className="text-gradient">see them working.</span>
                    </motion.h1>

                    <motion.p
                        className="projects-hero__subtitle"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Explore digital products, platforms, and experiences we&apos;ve designed and engineered to turn ideas into working technology.
                    </motion.p>
                </div>

                {/* Animated Scroll Indicator */}
                <motion.div
                    className="projects-hero__scroll"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <span className="projects-hero__scroll-text">EXPLORE OUR WORK</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <HiOutlineArrowNarrowDown className="projects-hero__scroll-icon" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsHero;
