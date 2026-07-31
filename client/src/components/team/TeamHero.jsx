// APP/client/src/components/team/TeamHero.jsx

import { motion } from "framer-motion";
import { HiSparkles, HiOutlineArrowNarrowDown } from "react-icons/hi";
import "./TeamHero.css";

const TeamHero = () => {
    return (
        <section className="team-hero">
            <div className="team-hero__bg" aria-hidden="true">
                <div className="team-hero__orb team-hero__orb--primary" />
                <div className="team-hero__orb team-hero__orb--cyan" />
                <div className="team-hero__grid" />
            </div>

            <div className="container team-hero__container">
                <div className="team-hero__content">
                    <motion.div
                        className="team-hero__eyebrow"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <HiSparkles className="team-hero__eyebrow-icon" />
                        <span>THE PEOPLE BEHIND AKSHU</span>
                    </motion.div>

                    <motion.h1
                        className="team-hero__title"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Technology is built with code. <br />
                        Progress is <span className="text-gradient">built by people.</span>
                    </motion.h1>

                    <motion.p
                        className="team-hero__subtitle"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Meet the people bringing together ideas, design, engineering, and curiosity to build AKSHU Technologies.
                    </motion.p>
                </div>

                {/* Animated Scroll Indicator */}
                <motion.div
                    className="team-hero__scroll"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <span className="team-hero__scroll-text">MEET THE TEAM</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <HiOutlineArrowNarrowDown className="team-hero__scroll-icon" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default TeamHero;
