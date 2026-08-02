// APP/client/src/pages/ProjectDetail.jsx

import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    HiArrowLeft,
    HiExternalLink,
    HiCode,
    HiSparkles,
    HiCheckCircle,
    HiLightningBolt,
    HiClock,
    HiUserGroup,
    HiTag,
    HiCube,
    HiX,
    HiZoomIn,
    HiChevronLeft,
    HiChevronRight,
    HiShieldCheck,
    HiDesktopComputer,
} from "react-icons/hi";
import {
    FaReact,
    FaNodeJs,
    FaPython,
    FaDocker,
    FaAws,
    FaDatabase,
    FaGitAlt,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaVuejs,
    FaAngular,
} from "react-icons/fa";

import api from "../services/api.js";
import { ROUTES } from "../utils/constants.js";
import ProjectCard from "../components/projects/ProjectCard.jsx";
import "./ProjectDetail.css";

// Helper map to assign icons to common technology strings
const getTechIcon = (techName = "") => {
    const t = techName.toLowerCase();
    if (t.includes("react")) return <FaReact />;
    if (t.includes("node")) return <FaNodeJs />;
    if (t.includes("python")) return <FaPython />;
    if (t.includes("docker")) return <FaDocker />;
    if (t.includes("aws") || t.includes("cloud")) return <FaAws />;
    if (t.includes("mongo") || t.includes("sql") || t.includes("db")) return <FaDatabase />;
    if (t.includes("git")) return <FaGitAlt />;
    if (t.includes("html")) return <FaHtml5 />;
    if (t.includes("css")) return <FaCss3Alt />;
    if (t.includes("js") || t.includes("javascript")) return <FaJs />;
    if (t.includes("vue")) return <FaVuejs />;
    if (t.includes("angular")) return <FaAngular />;
    return <HiCode />;
};

const ProjectDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [relatedProjects, setRelatedProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Gallery state
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(false);

        // Fetch project detail by slug or id
        api.get(`/projects/${slug}`)
            .then((res) => {
                if (!isMounted) return;
                const p = res.data?.data?.project || res.data?.data || res.data;
                if (p && p.title) {
                    setProject(p);
                    // Fetch related projects excluding current one
                    api.get("/projects")
                        .then((relRes) => {
                            if (!isMounted) return;
                            const all = relRes.data?.data?.projects || relRes.data?.data || relRes.data || [];
                            const filtered = all
                                .filter((item) => item._id !== p._id && item.slug !== p.slug)
                                .slice(0, 3);
                            setRelatedProjects(filtered);
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
    }, [slug]);

    // Handle Keyboard navigation for Lightbox
    const handleKeyDown = useCallback(
        (e) => {
            if (!lightboxOpen || !project) return;
            const images = getGalleryImages(project);
            if (e.key === "Escape") setLightboxOpen(false);
            if (e.key === "ArrowRight") {
                setActiveImageIndex((prev) => (prev + 1) % images.length);
            }
            if (e.key === "ArrowLeft") {
                setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
            }
        },
        [lightboxOpen, project]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    if (loading) {
        return (
            <div className="project-detail-page">
                <div className="container" style={{ paddingTop: 140, paddingBottom: 100 }}>
                    <div className="admin-skeleton admin-skeleton--title" style={{ width: "40%", height: 36, marginBottom: 20 }} />
                    <div className="admin-skeleton admin-skeleton--rect" style={{ width: "100%", height: 480, borderRadius: 24 }} />
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="project-detail-page">
                <div className="container" style={{ paddingTop: 140, paddingBottom: 100, textAlign: "center" }}>
                    <div className="admin-card" style={{ maxWidth: 540, margin: "0 auto", padding: 40 }}>
                        <h2 style={{ fontSize: "1.75rem", marginBottom: 12 }}>Case Study Not Found</h2>
                        <p style={{ color: "#94a3b8", marginBottom: 24 }}>The requested project case study could not be loaded or has been moved.</p>
                        <button className="btn btn--primary" onClick={() => navigate(ROUTES.PROJECTS)}>
                            <HiArrowLeft /> Return to Projects
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Prepare gallery list
    const galleryImages = getGalleryImages(project);
    const activeImage = galleryImages[activeImageIndex] || project.thumbnail || "";

    const techList = project.technologies || [];
    const createdDate = project.createdAt
        ? new Date(project.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
        : "Recent";

    return (
        <div className="project-detail-page">
            {/* Top Navigation & Breadcrumbs */}
            <div className="container">
                <div className="project-nav-bar">
                    <Link to={ROUTES.PROJECTS} className="project-back-btn">
                        <HiArrowLeft /> Back to All Projects
                    </Link>
                    <div className="project-breadcrumb">
                        <Link to={ROUTES.HOME}>Home</Link> / <Link to={ROUTES.PROJECTS}>Projects</Link> / <span>{project.title}</span>
                    </div>
                </div>
            </div>

            {/* HERO SECTION */}
            <section className="project-hero">
                <div className="project-hero__bg-glow" />
                <div className="container">
                    <div className="project-hero__content">
                        {/* Meta Badges */}
                        <div className="project-hero__meta">
                            <span className="project-category-badge">{project.category || "WEB APP"}</span>
                            <span
                                className={`project-status-badge ${
                                    project.status === "PUBLISHED" ? "project-status-badge--published" : "project-status-badge--draft"
                                }`}
                            >
                                <HiCheckCircle /> {project.status === "PUBLISHED" ? "Live Project" : project.status || "In Development"}
                            </span>
                            {project.featured && <span className="project-featured-badge">★ FEATURED CASE STUDY</span>}
                        </div>

                        {/* Title & Tagline */}
                        <h1 className="project-hero__title">{project.title}</h1>
                        {project.shortDescription && <p className="project-hero__tagline">{project.shortDescription}</p>}

                        {/* CTA Buttons */}
                        <div className="project-hero__actions">
                            {project.liveDemoUrl && (
                                <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
                                    Live Demo <HiExternalLink />
                                </a>
                            )}
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--lg">
                                    View Source Code <HiCode />
                                </a>
                            )}
                            <Link to={ROUTES.CONTACT} className="btn btn--secondary btn--lg">
                                Discuss Similar Project →
                            </Link>
                        </div>

                        {/* Technology Pills */}
                        {techList.length > 0 && (
                            <div className="project-hero__tech-pills">
                                {techList.map((tech) => (
                                    <span key={tech} className="project-tech-chip">
                                        <span className="project-tech-chip-icon">{getTechIcon(tech)}</span>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* QUICK INFO CARDS GRID */}
            <section className="section-sm">
                <div className="container">
                    <div className="project-quick-info-grid">
                        <div className="project-info-card">
                            <span className="project-info-card__label">
                                <HiCube /> Category
                            </span>
                            <span className="project-info-card__value">{project.category || "Full Stack Web"}</span>
                        </div>
                        <div className="project-info-card">
                            <span className="project-info-card__label">
                                <HiClock /> Delivered
                            </span>
                            <span className="project-info-card__value">{createdDate}</span>
                        </div>
                        <div className="project-info-card">
                            <span className="project-info-card__label">
                                <HiUserGroup /> Engineering
                            </span>
                            <span className="project-info-card__value">AKSHU Core Team</span>
                        </div>
                        <div className="project-info-card">
                            <span className="project-info-card__label">
                                <HiTag /> Modules Built
                            </span>
                            <span className="project-info-card__value">{techList.length || 4} Tech Stack Modules</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN COVER & INTERACTIVE GALLERY */}
            <section className="section-sm">
                <div className="container">
                    <div className="project-gallery-wrapper">
                        <div className="project-main-cover-frame" onClick={() => setLightboxOpen(true)}>
                            {activeImage ? (
                                <img src={activeImage} alt={project.title} className="project-main-cover-img" />
                            ) : (
                                <div
                                    style={{
                                        height: 420,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: "linear-gradient(135deg, #1e1b4b, #0f172a)",
                                    }}
                                >
                                    <span style={{ fontSize: "3rem", fontWeight: 900, color: "rgba(255,255,255,0.15)" }}>AKSHU</span>
                                    <span style={{ fontSize: "0.85rem", color: "var(--color-accent)", letterSpacing: "0.15em", fontWeight: 700 }}>
                                        {project.category || "CASE STUDY"}
                                    </span>
                                </div>
                            )}

                            <div className="project-cover-hover-overlay">
                                <span className="project-zoom-btn">
                                    <HiZoomIn /> Click to Inspect Full Resolution
                                </span>
                            </div>
                        </div>

                        {/* Thumbnail Strip if multiple images exist */}
                        {galleryImages.length > 1 && (
                            <div className="project-thumb-strip">
                                {galleryImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`project-thumb-item ${activeImageIndex === idx ? "project-thumb-item--active" : ""}`}
                                        onClick={() => setActiveImageIndex(idx)}
                                    >
                                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="project-thumb-img" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* OVERVIEW & DETAILED NARRATIVE */}
            <section className="section-sm">
                <div className="container" style={{ maxWidth: 960 }}>
                    <motion.div
                        className="project-overview-block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="project-section-title">
                            <HiSparkles className="project-section-title-icon" />
                            Project Overview & Architecture
                        </h2>
                        <div className="project-description-text">{project.description}</div>
                    </motion.div>
                </div>
            </section>

            {/* CHALLENGE & SOLUTION CARDS */}
            <section className="section-sm">
                <div className="container" style={{ maxWidth: 960 }}>
                    <div className="project-cs-grid">
                        <motion.div
                            className="project-cs-card project-cs-card--challenge"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="project-cs-header">
                                <div className="project-cs-icon-wrapper">
                                    <HiLightningBolt />
                                </div>
                                <h3>The Challenge</h3>
                            </div>
                            <div className="project-cs-body">
                                Developing a robust, scalable system that seamlessly integrates modern UI aesthetics with high-performance backend infrastructure while maintaining strict security, data consistency, and responsive responsiveness across all screen sizes.
                            </div>
                        </motion.div>

                        <motion.div
                            className="project-cs-card project-cs-card--solution"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="project-cs-header">
                                <div className="project-cs-icon-wrapper">
                                    <HiShieldCheck />
                                </div>
                                <h3>Our Engineering Solution</h3>
                            </div>
                            <div className="project-cs-body">
                                We architected a decoupled application using modular component patterns, optimized database indexing, and streamlined state management. Automated CI/CD pipelines and responsive styling ensure zero layout shift and instant interactive response times.
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* TECHNOLOGY STACK CHIPS */}
            {techList.length > 0 && (
                <section className="section-sm">
                    <div className="container" style={{ maxWidth: 960 }}>
                        <motion.div
                            className="project-tech-section"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="project-section-title">
                                <HiCode className="project-section-title-icon" />
                                Technology Stack & Frameworks
                            </h2>
                            <div className="project-tech-grid">
                                {techList.map((tech) => (
                                    <div key={tech} className="project-tech-chip">
                                        <span className="project-tech-chip-icon">{getTechIcon(tech)}</span>
                                        <span>{tech}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* KEY FEATURES GRID */}
            <section className="section-sm">
                <div className="container" style={{ maxWidth: 960 }}>
                    <div className="project-overview-block" style={{ background: "transparent", border: "none", padding: 0, boxShadow: "none" }}>
                        <h2 className="project-section-title" style={{ marginBottom: 24 }}>
                            <HiDesktopComputer className="project-section-title-icon" />
                            Key Capabilities & Highlights
                        </h2>
                        <div className="project-features-grid">
                            <div className="project-feature-card">
                                <HiLightningBolt className="project-feature-icon" />
                                <h4>High-Performance Rendering</h4>
                                <p>Optimized for fast initial page load, smooth dynamic state transitions, and minimal asset footprints.</p>
                            </div>
                            <div className="project-feature-card">
                                <HiShieldCheck className="project-feature-icon" />
                                <h4>Enterprise-Grade Security</h4>
                                <p>Rigorous input sanitization, token-based authentication, and protected REST API endpoints.</p>
                            </div>
                            <div className="project-feature-card">
                                <HiDesktopComputer className="project-feature-icon" />
                                <h4>Fluid Responsive Design</h4>
                                <p>Tailored layouts that adapt seamlessly from mobile smart devices (320px) up to ultra-wide displays.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECT METRICS */}
            <section className="section-sm">
                <div className="container" style={{ maxWidth: 960 }}>
                    <div className="project-stats-grid">
                        <div className="project-stat-card">
                            <div className="project-stat-card__number">100%</div>
                            <div className="project-stat-card__label">Responsive Layout</div>
                        </div>
                        <div className="project-stat-card">
                            <div className="project-stat-card__number">{techList.length || 5}+</div>
                            <div className="project-stat-card__label">Technologies</div>
                        </div>
                        <div className="project-stat-card">
                            <div className="project-stat-card__number">&lt;100ms</div>
                            <div className="project-stat-card__label">API Response Time</div>
                        </div>
                        <div className="project-stat-card">
                            <div className="project-stat-card__number">Production</div>
                            <div className="project-stat-card__label">Deployment Grade</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECT EXECUTION TIMELINE */}
            <section className="section-sm">
                <div className="container" style={{ maxWidth: 960 }}>
                    <motion.div
                        className="project-timeline-block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="project-section-title">
                            <HiClock className="project-section-title-icon" />
                            Execution & Delivery Timeline
                        </h2>
                        <div className="project-timeline-list">
                            <div className="project-timeline-item">
                                <div className="project-timeline-node" />
                                <div className="project-timeline-title">01. Discovery & System Architecture</div>
                                <p className="project-timeline-desc">Gathered domain requirements, defined REST API schemas, and finalized UX component hierarchy.</p>
                            </div>
                            <div className="project-timeline-item">
                                <div className="project-timeline-node" />
                                <div className="project-timeline-title">02. Interface Design & Prototyping</div>
                                <p className="project-timeline-desc">Created modern dark-theme design systems, interactive state transitions, and responsive grid layouts.</p>
                            </div>
                            <div className="project-timeline-item">
                                <div className="project-timeline-node" />
                                <div className="project-timeline-title">03. Full-Stack Development & Integration</div>
                                <p className="project-timeline-desc">Engineered backend APIs with database models, connected frontend components, and enforced data validators.</p>
                            </div>
                            <div className="project-timeline-item">
                                <div className="project-timeline-node" />
                                <div className="project-timeline-title">04. Testing, Optimization & Deployment</div>
                                <p className="project-timeline-desc">Executed security audits, optimized asset compression, and launched live production deployment.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* RELATED PROJECTS */}
            {relatedProjects.length > 0 && (
                <section className="section-sm project-related-section">
                    <div className="container" style={{ maxWidth: 960 }}>
                        <h2 className="project-section-title">
                            <HiSparkles className="project-section-title-icon" />
                            Explore Related Work
                        </h2>
                        <div className="project-related-grid">
                            {relatedProjects.map((rel) => (
                                <ProjectCard key={rel._id} project={rel} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CALL TO ACTION BLOCK */}
            <section className="section-sm">
                <div className="container" style={{ maxWidth: 960 }}>
                    <div className="project-cta-block">
                        <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                            <HiSparkles /> HAVE A PROJECT IN MIND?
                        </div>
                        <h3>Let&apos;s build something extraordinary.</h3>
                        <p>Whether you need a full-stack web application, custom AI integration, or a modern product redesign, our team is ready to deliver.</p>
                        <div className="project-cta-actions">
                            <Link to={ROUTES.CONTACT} className="btn btn--primary btn--lg">
                                Start Your Project →
                            </Link>
                            <Link to={ROUTES.SERVICES} className="btn btn--outline btn--lg">
                                Explore Our Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* LIGHTBOX MODAL POPOVER */}
            <AnimatePresence>
                {lightboxOpen && activeImage && (
                    <motion.div
                        className="project-lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightboxOpen(false)}
                    >
                        <button
                            type="button"
                            className="project-lightbox__close"
                            onClick={() => setLightboxOpen(false)}
                            aria-label="Close Lightbox"
                        >
                            <HiX />
                        </button>

                        {galleryImages.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    className="project-lightbox__close"
                                    style={{ right: "auto", left: 24 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                                    }}
                                >
                                    <HiChevronLeft />
                                </button>
                                <button
                                    type="button"
                                    className="project-lightbox__close"
                                    style={{ right: 80 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
                                    }}
                                >
                                    <HiChevronRight />
                                </button>
                            </>
                        )}

                        <motion.img
                            key={activeImage}
                            src={activeImage}
                            alt={project.title}
                            className="project-lightbox__img"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

function getGalleryImages(project) {
    const images = [];
    if (project.thumbnail) images.push(project.thumbnail);
    if (Array.isArray(project.gallery)) {
        project.gallery.forEach((g) => {
            if (g && !images.includes(g)) images.push(g);
        });
    }
    return images;
}

export default ProjectDetail;
