// APP/client/src/components/blog/BlogsCTA.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import "./BlogsCTA.css";

const BlogsCTA = () => {
    return (
        <section className="blogs-cta section-lg">
            <div className="container">
                <motion.div
                    className="blogs-cta__panel"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="blogs-cta__glow" aria-hidden="true" />

                    <div className="blogs-cta__content">
                        <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                            <span className="section-tag-dot" />
                            START A CONVERSATION
                        </div>

                        <h2 className="blogs-cta__title">
                            Ideas are better when they&apos;re shared. <br />
                            <span className="text-gradient">Products are better when they&apos;re built.</span>
                        </h2>

                        <p className="blogs-cta__subtitle">
                            Explore what we&apos;re building—or start a conversation about an idea of your own.
                        </p>

                        <div className="blogs-cta__actions">
                            <Link to={ROUTES.PROJECTS} className="btn btn--primary btn--lg">
                                Explore Projects <HiArrowRight />
                            </Link>
                            <Link to={ROUTES.CONTACT} className="btn btn--outline btn--lg">
                                Start a Conversation
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BlogsCTA;
