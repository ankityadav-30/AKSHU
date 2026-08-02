// APP/client/src/components/team/TeamGallery.jsx

import { motion } from "framer-motion";
import { HiRefresh } from "react-icons/hi";
import TeamCard from "./TeamCard.jsx";
import "./TeamGallery.css";

const TeamGallery = ({ members, loading, error, onRetry }) => {
    if (loading) {
        return (
            <section className="team-gallery section-lg">
                <div className="container">
                    <div className="team-members-grid">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="team-skeleton-card" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="team-gallery section-lg">
                <div className="container">
                    <div className="team-error-card">
                        <h3>We couldn&apos;t load the team right now.</h3>
                        <p>There was a connection issue loading member profiles from the server.</p>
                        <button type="button" className="btn btn--outline" onClick={onRetry}>
                            <HiRefresh /> Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (!members || members.length === 0) {
        return (
            <section className="team-gallery section-lg">
                <div className="container">
                    <div className="team-empty-card">
                        <h3>We&apos;re assembling something special.</h3>
                        <p>The people behind AKSHU Technologies will appear here soon.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="team-gallery section-lg">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        MEET THE TEAM
                    </div>
                    <h2 className="section-title">
                        The people turning <span className="text-gradient">ideas into products</span>.
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        Meet the engineers, designers, and thinkers shaping AKSHU Technologies.
                    </p>
                </div>

                <div className="team-members-grid">
                    {members.map((member, index) => {
                        const size = member.cardSize || "medium";
                        return (
                            <motion.div
                                key={member._id || index}
                                className={`team-grid-item team-grid-item--${size}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                viewport={{ once: true }}
                                style={{
                                    gridColumn: size === "large" ? "span 2" : "span 1"
                                }}
                            >
                                <TeamCard member={member} />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TeamGallery;
