// APP/client/src/components/blog/BlogsHero.jsx

import { motion } from "framer-motion";
import { HiSparkles, HiOutlineArrowNarrowDown } from "react-icons/hi";
import "./BlogsHero.css";

const BlogsHero = () => {
    return (
        <section className="blogs-hero">
            <div className="blogs-hero__bg" aria-hidden="true">
                <div className="blogs-hero__orb blogs-hero__orb--primary" />
                <div className="blogs-hero__orb blogs-hero__orb--cyan" />
                <div className="blogs-hero__grid" />
                <div className="blogs-hero__wordmark">INSIGHTS</div>
            </div>

            <div className="container blogs-hero__container">
                <div className="blogs-hero__content">
                    <motion.div
                        className="blogs-hero__eyebrow"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <HiSparkles className="blogs-hero__eyebrow-icon" />
                        <span>AKSHU INSIGHTS</span>
                    </motion.div>

                    <motion.h1
                        className="blogs-hero__title"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Ideas worth exploring. <br />
                        Lessons <span className="text-gradient">worth sharing.</span>
                    </motion.h1>

                    <motion.p
                        className="blogs-hero__subtitle"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Thoughts on technology, engineering, design, products, and the lessons we discover while building.
                    </motion.p>
                </div>

                {/* Animated Scroll Indicator */}
                <motion.div
                    className="blogs-hero__scroll"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <span className="blogs-hero__scroll-text">EXPLORE INSIGHTS</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <HiOutlineArrowNarrowDown className="blogs-hero__scroll-icon" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default BlogsHero;
