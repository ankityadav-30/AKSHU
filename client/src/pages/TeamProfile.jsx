// APP/client/src/pages/TeamProfile.jsx

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaLinkedinIn,
    FaGithub,
    FaTwitter,
    FaInstagram,
    FaGlobe,
    FaBehance,
    FaDribbble,
    FaAward,
} from "react-icons/fa";
import {
    HiArrowLeft,
    HiMail,
    HiPhone,
    HiLocationMarker,
    HiAcademicCap,
    HiBriefcase,
    HiCode,
    HiSparkles,
    HiCheckCircle,
    HiArrowRight,
    HiUserGroup,
} from "react-icons/hi";
import api from "../services/api.js";
import { ROUTES } from "../utils/constants.js";
import ProjectCard from "../components/projects/ProjectCard.jsx";
import "./TeamProfile.css";

const TeamProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [member, setMember] = useState(null);
    const [projects, setProjects] = useState([]);
    const [relatedMembers, setRelatedMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(false);

        // Fetch team member by ID or Slug
        api.get(`/team/${id}`)
            .then((res) => {
                if (!isMounted) return;
                const m = res.data?.data?.member || res.data?.data || null;
                if (m && (m._id || m.firstName || m.name)) {
                    setMember(m);

                    // Fetch projects associated with team
                    api.get("/projects")
                        .then((pRes) => {
                            if (!isMounted) return;
                            const allProjects = pRes.data?.data?.projects || pRes.data?.data || [];
                            setProjects(allProjects.slice(0, 3));
                        })
                        .catch(() => {});

                    // Fetch related team members
                    api.get("/team")
                        .then((tRes) => {
                            if (!isMounted) return;
                            const allMembers = tRes.data?.data?.team || tRes.data?.data || [];
                            const filtered = allMembers
                                .filter((item) => item._id !== m._id && item.slug !== m.slug)
                                .slice(0, 3);
                            setRelatedMembers(filtered);
                        })
                        .catch(() => {});
                } else {
                    setError(true);
                }
            })
            .catch(() => {
                if (isMounted) setError(true);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (loading) {
        return (
            <div className="team-profile-page">
                <div className="container" style={{ paddingTop: 140, paddingBottom: 100 }}>
                    <div className="admin-skeleton admin-skeleton--title" style={{ width: "30%", height: 28, marginBottom: 20 }} />
                    <div className="admin-skeleton admin-skeleton--rect" style={{ width: "100%", height: 460, borderRadius: 24 }} />
                </div>
            </div>
        );
    }

    if (error || !member) {
        return (
            <div className="team-profile-page">
                <div className="container" style={{ paddingTop: 140, paddingBottom: 100, textAlign: "center" }}>
                    <div className="team-profile-card-block" style={{ maxWidth: 540, margin: "0 auto", padding: 40 }}>
                        <h2 style={{ fontSize: "1.75rem", color: "#ffffff", marginBottom: 12 }}>Team Member Not Found</h2>
                        <p style={{ color: "#94a3b8", marginBottom: 24 }}>The requested profile could not be found or has been moved.</p>
                        <button className="btn btn--primary" onClick={() => navigate(ROUTES.TEAM)}>
                            <HiArrowLeft /> Return to Team
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const fullName =
        member.displayName ||
        member.name ||
        `${member.firstName || ""} ${member.lastName || ""}`.trim() ||
        "Team Member";

    const role = member.designation || member.role || "Software Engineer";
    const avatarUrl = member.profileImage || member.avatar || member.image || "";
    const coverUrl = member.coverImage || "";
    const socials = member.socialLinks || member.socials || {};

    const initials = fullName
        .split(" ")
        .filter(Boolean)
        .map((p) => p[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    const techStack = member.techStack || member.skills || [];
    const achievements = member.achievements || [];
    const certifications = member.certifications || [];

    return (
        <div className="team-profile-page">
            {/* Top Navigation & Breadcrumbs */}
            <div className="container">
                <div className="team-profile-nav">
                    <Link to={ROUTES.TEAM} className="team-profile-back-link">
                        <HiArrowLeft /> Back to All Team Members
                    </Link>
                    <div className="team-profile-breadcrumb">
                        <Link to={ROUTES.HOME}>Home</Link> / <Link to={ROUTES.TEAM}>Team</Link> / <span>{fullName}</span>
                    </div>
                </div>
            </div>

            {/* PROFILE HERO & COVER */}
            <section className="team-profile-hero">
                <div className="container">
                    <div className="team-profile-hero__card">
                        {/* Cover Image / Ambient Backdrop */}
                        <div
                            className="team-profile-hero__cover"
                            style={{
                                backgroundImage: coverUrl ? `url(${coverUrl})` : undefined,
                            }}
                        >
                            <div className="team-profile-hero__cover-overlay" />
                        </div>

                        {/* Profile Header Content */}
                        <div className="team-profile-hero__content">
                            <div className="team-profile-hero__avatar-box">
                                <div className="team-profile-hero__avatar-ring">
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt={fullName} className="team-profile-hero__avatar" />
                                    ) : (
                                        <div className="team-profile-hero__placeholder">
                                            <span>{initials}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="team-profile-hero__main-info">
                                <div className="team-profile-hero__badge-row">
                                    <span className="team-profile-hero__dept-badge">{member.department || "Engineering"}</span>
                                    <span className="team-status-badge">
                                        <span className="team-status-dot" /> Available for Projects
                                    </span>
                                    {member.featured && <span className="team-featured-badge">★ FEATURED EXPERT</span>}
                                </div>

                                <h1 className="team-profile-hero__name">{fullName}</h1>
                                <p className="team-profile-hero__role">{role}</p>

                                {member.location && (
                                    <p className="team-profile-hero__location">
                                        <HiLocationMarker /> {member.location}
                                    </p>
                                )}

                                {member.bio && <p className="team-profile-hero__intro">{member.bio}</p>}

                                {/* Quick Stats Bar */}
                                {(member.experience > 0 || member.projectsCompleted > 0 || member.happyClients > 0) && (
                                    <div className="team-profile-hero__stats">
                                        {member.experience > 0 && (
                                            <div className="team-stat-item">
                                                <span className="team-stat-val">{member.experience}+</span>
                                                <span className="team-stat-lbl">Years Exp.</span>
                                            </div>
                                        )}
                                        {member.projectsCompleted > 0 && (
                                            <div className="team-stat-item">
                                                <span className="team-stat-val">{member.projectsCompleted}+</span>
                                                <span className="team-stat-lbl">Projects Built</span>
                                            </div>
                                        )}
                                        {member.happyClients > 0 && (
                                            <div className="team-stat-item">
                                                <span className="team-stat-val">{member.happyClients}+</span>
                                                <span className="team-stat-lbl">Happy Clients</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Action Buttons & Socials */}
                                <div className="team-profile-hero__actions">
                                    <Link to={ROUTES.CONTACT} className="btn btn--primary btn--md">
                                        <HiMail /> Contact {member.firstName || "Expert"}
                                    </Link>

                                    {/* Social Links */}
                                    <div className="team-profile-hero__socials">
                                        {socials.linkedin && (
                                            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                                <FaLinkedinIn />
                                            </a>
                                        )}
                                        {socials.github && (
                                            <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                                <FaGithub />
                                            </a>
                                        )}
                                        {socials.portfolio && (
                                            <a href={socials.portfolio} target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
                                                <FaGlobe />
                                            </a>
                                        )}
                                        {socials.twitter && (
                                            <a href={socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                                <FaTwitter />
                                            </a>
                                        )}
                                        {socials.instagram && (
                                            <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                                <FaInstagram />
                                            </a>
                                        )}
                                        {socials.behance && (
                                            <a href={socials.behance} target="_blank" rel="noopener noreferrer" aria-label="Behance">
                                                <FaBehance />
                                            </a>
                                        )}
                                        {socials.dribbble && (
                                            <a href={socials.dribbble} target="_blank" rel="noopener noreferrer" aria-label="Dribbble">
                                                <FaDribbble />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BODY CONTENT GRID */}
            <section className="section-sm">
                <div className="container">
                    <div className="team-profile-grid">
                        {/* Main Column */}
                        <div className="team-profile-grid__main">
                            {/* Detailed Biography */}
                            {(member.detailedBio || member.bio) && (
                                <motion.div
                                    className="team-profile-card-block"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="team-block-header">
                                        <HiBriefcase className="team-block-icon" />
                                        <h2>About & Biography</h2>
                                    </div>
                                    <div className="team-block-body">
                                        <p className="team-profile-longbio">{member.detailedBio || member.bio}</p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Skills & Tech Stack */}
                            {techStack.length > 0 && (
                                <motion.div
                                    className="team-profile-card-block"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="team-block-header">
                                        <HiCode className="team-block-icon" />
                                        <h2>Skills & Technical Expertise</h2>
                                    </div>
                                    <div className="team-block-body">
                                        <div className="team-tech-grid">
                                            {techStack.map((tech) => (
                                                <div key={tech} className="team-tech-pill">
                                                    <HiSparkles className="team-tech-pill-icon" />
                                                    <span>{tech}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Achievements & Recognition */}
                            {achievements.length > 0 && (
                                <motion.div
                                    className="team-profile-card-block"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="team-block-header">
                                        <FaAward className="team-block-icon" />
                                        <h2>Achievements & Milestones</h2>
                                    </div>
                                    <div className="team-block-body">
                                        <div className="team-achievements-list">
                                            {achievements.map((ach, idx) => (
                                                <div key={idx} className="team-achievement-item">
                                                    <div className="team-achievement-dot" />
                                                    <div className="team-achievement-content">
                                                        <div className="team-achievement-header">
                                                            <h3>{ach.title}</h3>
                                                            {ach.year && <span className="team-achievement-year">{ach.year}</span>}
                                                        </div>
                                                        {ach.organization && <span className="team-achievement-org">{ach.organization}</span>}
                                                        {ach.description && <p>{ach.description}</p>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Featured Projects */}
                            {projects.length > 0 && (
                                <motion.div
                                    className="team-profile-card-block"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="team-block-header">
                                        <HiCode className="team-block-icon" />
                                        <h2>Featured Projects Contributed</h2>
                                    </div>
                                    <div className="team-block-body">
                                        <div className="team-related-grid" style={{ marginTop: 0 }}>
                                            {projects.map((proj) => (
                                                <ProjectCard key={proj._id} project={proj} />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Sidebar Column */}
                        <div className="team-profile-grid__sidebar">
                            {/* Professional Info Card */}
                            <motion.div
                                className="team-profile-card-block"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="team-block-header">
                                    <HiAcademicCap className="team-block-icon" />
                                    <h2>Professional Info</h2>
                                </div>
                                <div className="team-block-body">
                                    <ul className="team-info-list">
                                        {member.specialization && (
                                            <li>
                                                <span className="team-info-label">Specialization:</span>
                                                <span className="team-info-val">{member.specialization}</span>
                                            </li>
                                        )}
                                        {member.education && (
                                            <li>
                                                <span className="team-info-label">Education:</span>
                                                <span className="team-info-val">{member.education}</span>
                                            </li>
                                        )}
                                        {member.department && (
                                            <li>
                                                <span className="team-info-label">Department:</span>
                                                <span className="team-info-val">{member.department}</span>
                                            </li>
                                        )}
                                        {member.email && (
                                            <li>
                                                <span className="team-info-label">Direct Email:</span>
                                                <a href={`mailto:${member.email}`} className="team-info-val team-info-link">
                                                    {member.email}
                                                </a>
                                            </li>
                                        )}
                                        {member.phone && (
                                            <li>
                                                <span className="team-info-label">Phone:</span>
                                                <span className="team-info-val">{member.phone}</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </motion.div>

                            {/* Certifications Card */}
                            {certifications.length > 0 && (
                                <motion.div
                                    className="team-profile-card-block"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="team-block-header">
                                        <HiCheckCircle className="team-block-icon" />
                                        <h2>Certifications</h2>
                                    </div>
                                    <div className="team-block-body">
                                        <ul className="team-cert-list">
                                            {certifications.map((cert) => (
                                                <li key={cert}>
                                                    <HiCheckCircle className="team-cert-check" />
                                                    <span>{cert}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* RELATED TEAM MEMBERS SECTION */}
            {relatedMembers.length > 0 && (
                <section className="section-sm">
                    <div className="container">
                        <div className="team-profile-card-block">
                            <div className="team-block-header">
                                <HiUserGroup className="team-block-icon" />
                                <h2>Meet Other Team Experts</h2>
                            </div>
                            <div className="team-related-grid">
                                {relatedMembers.map((rel) => {
                                    const relName = rel.displayName || rel.name || `${rel.firstName || ""} ${rel.lastName || ""}`.trim();
                                    const relAvatar = rel.profileImage || rel.avatar || rel.image || "";
                                    const relRole = rel.designation || rel.role || "Software Engineer";
                                    return (
                                        <Link to={`/team/${rel.slug || rel._id}`} key={rel._id} className="team-related-card">
                                            <div className="team-related-avatar-ring">
                                                {relAvatar ? (
                                                    <img src={relAvatar} alt={relName} className="team-related-avatar" />
                                                ) : (
                                                    <div className="team-profile-hero__placeholder" style={{ fontSize: "1.5rem" }}>
                                                        <span>{relName.substring(0, 2).toUpperCase()}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <h4 className="team-related-name">{relName}</h4>
                                            <span className="team-related-role">{relRole}</span>
                                            <span className="team-related-link">
                                                View Profile <HiArrowRight />
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CONTACT MEMBER CTA */}
            <section className="section-sm">
                <div className="container">
                    <div className="project-cta-block" style={{ padding: "48px 32px" }}>
                        <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                            <HiSparkles /> WORK WITH OUR EXPERTS
                        </div>
                        <h3>Interested in collaborating with {member.firstName || fullName}?</h3>
                        <p>Our team of software engineers, architects, and product designers are ready to bring your digital product vision to life.</p>
                        <div className="project-cta-actions">
                            <Link to={ROUTES.CONTACT} className="btn btn--primary btn--lg">
                                Start Your Project →
                            </Link>
                            <Link to={ROUTES.TEAM} className="btn btn--outline btn--lg">
                                View Entire Team
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TeamProfile;
