// APP/client/src/components/about/OurStory.jsx

import { motion } from "framer-motion";
import "./OurStory.css";

const OurStory = () => {
    return (
        <section className="our-story section-lg">
            <div className="container">
                <div className="our-story__grid">
                    {/* Left Sticky Column */}
                    <motion.div
                        className="our-story__left"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="section-tag">
                            <span className="section-tag-dot" />
                            OUR STORY
                        </div>
                        <h2 className="our-story__statement">
                            Built from curiosity. <br />
                            Driven by the <span className="text-gradient">desire to create</span>.
                        </h2>
                    </motion.div>

                    {/* Illuminated Divider */}
                    <div className="our-story__divider" aria-hidden="true">
                        <motion.div
                            className="our-story__divider-line"
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        />
                    </div>

                    {/* Right Narrative Paragraphs */}
                    <motion.div
                        className="our-story__right"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <p className="our-story__paragraph">
                            AKSHU Technologies began with a simple observation: software development is often treated as a mechanical assembly line rather than a craft of design and intelligent engineering.
                        </p>
                        <p className="our-story__paragraph">
                            We founded AKSHU to build digital products with intent. Every decision—from user flow architecture to database schema design—is made to solve real problems and support long-term growth.
                        </p>
                        <p className="our-story__paragraph">
                            We don&apos;t measure success by corporate headcount or inflated statistics. We measure it by the reliability of the software we write, the elegance of the experiences we craft, and the real value created for the people who build with us.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;
