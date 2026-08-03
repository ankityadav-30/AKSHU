// APP/client/src/components/home/TeamPreview.jsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../services/api.js";
import TeamCard from "../team/TeamCard.jsx";
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
        return null;
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
                        {team.map((member, i) => {
                            const size = member.cardSize || "medium";
                            return (
                                <motion.div
                                    key={member._id || member.name || i}
                                    className={`team-grid-item team-grid-item--${size}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    style={{ gridColumn: size === "large" ? "span 2" : "span 1" }}
                                >
                                    <TeamCard member={member} />
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TeamPreview;
