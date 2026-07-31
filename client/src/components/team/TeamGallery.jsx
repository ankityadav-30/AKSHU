// APP/client/src/components/team/TeamGallery.jsx

import { motion } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";
import "./TeamGallery.css";

const TeamGallery = ({ members, loading, error, onRetry }) => {
    if (loading) {
        return (
            <section className="team-gallery section-lg">
                <div className="container">
                    <div className="team-members-grid">
                        {[1, 2, 3].map((n) => (
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
                        const fullName =
                            member.name ||
                            `${member.firstName || ""} ${member.lastName || ""}`.trim() ||
                            "Team Member";

                        const role = member.designation || member.role || member.position || "Software Engineer";
                        const avatarUrl = member.profileImage || member.avatar || member.image || "";
                        const socials = member.socialLinks || member.socials || {};

                        // Generate initials (e.g. Ankit Yadav -> AY)
                        const initials = fullName
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase();

                        return (
                            <motion.div
                                key={member._id || index}
                                className="team-profile-card"
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {/* Member Portrait or Programmatic Initials Placeholder */}
                                <div className="team-profile-card__image-wrapper">
                                    {avatarUrl ? (
                                        <img
                                            src={avatarUrl}
                                            alt={`${fullName} — ${role}`}
                                            className="team-profile-card__image"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="team-profile-card__placeholder">
                                            <span className="team-profile-card__initials">{initials}</span>
                                            <span className="team-profile-card__placeholder-tag">AKSHU</span>
                                        </div>
                                    )}
                                    <div className="team-profile-card__overlay" />
                                </div>

                                {/* Member Information */}
                                <div className="team-profile-card__info">
                                    <span className="team-profile-card__role">{role}</span>
                                    <h3 className="team-profile-card__name">{fullName}</h3>

                                    {member.bio && (
                                        <p className="team-profile-card__bio">{member.bio}</p>
                                    )}

                                    {/* Member Skills Tags */}
                                    {member.skills && member.skills.length > 0 && (
                                        <div className="team-profile-card__skills">
                                            {member.skills.slice(0, 4).map((skill) => (
                                                <span key={skill} className="team-skill-chip">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Social Links */}
                                    <div className="team-profile-card__socials">
                                        {socials.linkedin && (
                                            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${fullName} LinkedIn`}>
                                                <FaLinkedinIn />
                                            </a>
                                        )}
                                        {socials.github && (
                                            <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label={`${fullName} GitHub`}>
                                                <FaGithub />
                                            </a>
                                        )}
                                        {socials.portfolio && (
                                            <a href={socials.portfolio} target="_blank" rel="noopener noreferrer" aria-label={`${fullName} Portfolio`}>
                                                <FaGlobe />
                                            </a>
                                        )}
                                        {socials.twitter && (
                                            <a href={socials.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${fullName} Twitter`}>
                                                <FaTwitter />
                                            </a>
                                        )}
                                        {socials.instagram && (
                                            <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${fullName} Instagram`}>
                                                <FaInstagram />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TeamGallery;
