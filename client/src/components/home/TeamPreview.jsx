// APP/client/src/components/home/TeamPreview.jsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";
import api from "../../services/api.js";
import "./TeamPreview.css";

const TeamPreview = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/team")
            .then((res) => {
                const list = res.data?.data?.members || res.data?.data || [];
                setTeam(list);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (!loading && team.length === 0) {
        return null; // Gracefully omit if no team members exist in database
    }

    return (
        <section className="team-preview section-lg">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        OUR TEAM
                    </div>
                    <h2 className="section-title">
                        The people <span className="text-gradient">behind AKSHU</span>.
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        Small team. Serious ambition. Driven by technical curiosity and quality craftsmanship.
                    </p>
                </div>

                {loading ? (
                    <div className="featured-projects__loading">
                        <div className="page-loader__spinner" style={{ width: 36, height: 36 }} />
                    </div>
                ) : (
                    <div className="team-grid">
                        {team.map((member, i) => (
                            <motion.div
                                key={member._id || member.name || i}
                                className="team-member-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="team-member-card__avatar-wrapper">
                                    {member.avatar || member.image ? (
                                        <img
                                            src={member.avatar || member.image}
                                            alt={member.name}
                                            className="team-member-card__avatar"
                                        />
                                    ) : (
                                        <div className="team-member-card__placeholder">
                                            {member.name?.[0] || "A"}
                                        </div>
                                    )}
                                </div>

                                <div className="team-member-card__info">
                                    <h3 className="team-member-card__name">{member.name}</h3>
                                    <span className="team-member-card__role">
                                        {member.role || member.position || "Engineer"}
                                    </span>
                                    {member.bio && (
                                        <p className="team-member-card__bio">{member.bio}</p>
                                    )}

                                    {/* Social Links if present */}
                                    <div className="team-member-card__socials">
                                        {member.socials?.linkedin && (
                                            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                                <FaLinkedinIn />
                                            </a>
                                        )}
                                        {member.socials?.github && (
                                            <a href={member.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                                <FaGithub />
                                            </a>
                                        )}
                                        {member.socials?.twitter && (
                                            <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                                <FaTwitter />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TeamPreview;
