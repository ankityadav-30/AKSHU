// APP/client/src/components/blog/ThinkingToBuilding.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import "./ThinkingToBuilding.css";

const ThinkingToBuilding = () => {
    return (
        <section className="thinking-building section-lg">
            <div className="container">
                <div className="thinking-building__panel">
                    <div className="thinking-building__content">
                        <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                            <span className="section-tag-dot" />
                            FROM THINKING TO BUILDING
                        </div>

                        <motion.h2
                            className="thinking-building__title"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            Ideas become more useful when <br />
                            <span className="text-gradient">they&apos;re tested through real products.</span>
                        </motion.h2>

                        <p className="thinking-building__subtitle">
                            Explore how ideas, engineering, and design come together in the digital products we&apos;re building at AKSHU Technologies.
                        </p>

                        <div className="thinking-building__actions">
                            <Link to={ROUTES.PROJECTS} className="btn btn--outline btn--lg">
                                Explore Our Projects <HiArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ThinkingToBuilding;
