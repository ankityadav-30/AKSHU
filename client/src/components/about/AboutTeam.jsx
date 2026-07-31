// APP/client/src/components/about/AboutTeam.jsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";
import api from "../../services/api.js";
import "./AboutTeam.css";

const AboutTeam = () => {
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
        return null;
    }

    return (
        <section className="about-team section-lg">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        BEHIND THE TECHNOLOGY
                    </div>
                    <h2 className="section-title">
                        Products are built by people, <span className="text-gradient">not stacks</span>.
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        Meet the engineers, designers, and thinkers shaping AKSHU Technologies.
                    </p>
                </div>

                {loading ? (
                    <div className="featured-projects__loading">
                        <div className="page-loader__spinner" style={{ width: 36, height: 36 }} />
                    </div>
                ) : (
                    <div className="portrait-team-grid">
                        {team.map((member, i) => (
                            <motion.div
                                key={member._id || member.name || i}
                                className="portrait-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="portrait-card__image-wrapper">
                                    {member.avatar || member.image ? (
                                        <img
                                            src={member.avatar || member.image}
                                            alt={member.name}
                                            className="portrait-card__image"
                                        />
                                    ) : (
                                        <div className="portrait-card__placeholder">
                                            {member.name?.[0] || "A"}
                                        </div>
                                    )}
                                    <div className="portrait-card__overlay" />
                                </div>

                                <div className="portrait-card__info">
                                    <span className="portrait-card__role">
                                        {member.role || member.position || "Team Member"}
                                    </span>
                                    <h3 className="portrait-card__name">{member.name}</h3>
                                    {member.bio && (
                                        <p className="portrait-card__bio">{member.bio}</p>
                                    )}

                                    <div className="portrait-card__socials">
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

export default AboutTeam;
