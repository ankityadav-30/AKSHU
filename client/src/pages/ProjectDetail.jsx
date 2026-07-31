// APP/client/src/pages/ProjectDetail.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowLeft, HiExternalLink, HiCode, HiSparkles } from "react-icons/hi";
import api from "../services/api.js";
import { ROUTES } from "../utils/constants.js";
import "./PageShared.css";

const ProjectDetail = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/projects/${slug}`)
            .then((res) => setProject(res.data?.data || res.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <div className="page" style={{ paddingTop: 140, textAlign: "center", minHeight: "60vh" }}>
                <div className="container">
                    <div className="page-loader__spinner" style={{ margin: "0 auto var(--space-4)" }} />
                    <p style={{ color: "var(--color-text-secondary)" }}>Loading case study...</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="page" style={{ paddingTop: 140, textAlign: "center", minHeight: "60vh" }}>
                <div className="container">
                    <h2 style={{ fontSize: "2rem", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>
                        Project Not Found
                    </h2>
                    <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-6)" }}>
                        The project case study you requested could not be located.
                    </p>
                    <Link to={ROUTES.PROJECTS} className="btn btn--primary">
                        <HiArrowLeft /> Back to Selected Work
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            {/* Header Hero */}
            <section className="page-hero" style={{ paddingTop: 140, paddingBottom: 60 }}>
                <div className="container">
                    <Link to={ROUTES.PROJECTS} className="btn btn--outline btn--sm" style={{ marginBottom: "var(--space-6)", display: "inline-flex" }}>
                        <HiArrowLeft /> Back to Selected Work
                    </Link>

                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
                        <span style={{ fontSize: "var(--font-size-xs)", fontWeight: "bold", color: "var(--color-accent)", padding: "2px 10px", background: "rgba(34,211,238,0.1)", borderRadius: "var(--radius-sm)", letterSpacing: "0.1em" }}>
                            {project.category || "CASE STUDY"}
                        </span>
                    </div>

                    <motion.h1
                        className="page-hero__title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)", lineHeight: 1.1, marginBottom: "var(--space-4)" }}
                    >
                        {project.title}
                    </motion.h1>

                    {project.shortDescription && (
                        <p style={{ fontSize: "var(--font-size-lg)", color: "var(--color-text-secondary)", maxWidth: 720, lineHeight: "var(--line-height-relaxed)" }}>
                            {project.shortDescription}
                        </p>
                    )}

                    {/* External Action Links */}
                    <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "var(--space-6)" }}>
                        {project.liveDemoUrl && (
                            <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                                Live Preview <HiExternalLink />
                            </a>
                        )}
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                                View Source <HiCode />
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* Case Study Content */}
            <section className="section-lg" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="content-card" style={{ padding: "var(--space-8)", background: "var(--color-bg-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-2xl)" }}>
                        {/* Main Cover Image */}
                        {project.thumbnail ? (
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                style={{ width: "100%", maxHeight: 540, objectFit: "cover", borderRadius: "var(--radius-xl)", marginBottom: "var(--space-8)", border: "1px solid var(--color-border)" }}
                            />
                        ) : (
                            <div style={{ width: "100%", height: 320, background: "linear-gradient(135deg, rgba(16,20,38,0.95), rgba(10,13,28,0.95))", borderRadius: "var(--radius-xl)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "var(--space-8)", border: "1px solid var(--color-border)" }}>
                                <span style={{ fontSize: "3rem", fontWeight: 900, color: "rgba(255,255,255,0.15)", letterSpacing: "-0.04em" }}>AKSHU</span>
                                <span style={{ fontSize: "var(--font-size-xs)", fontWeight: "bold", color: "var(--color-accent)", letterSpacing: "0.2em" }}>{project.category || "PRODUCT"}</span>
                            </div>
                        )}

                        <h2 style={{ fontSize: "var(--font-size-2xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>
                            Overview & Engineering Architecture
                        </h2>

                        <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-base)", lineHeight: "var(--line-height-relaxed)", whiteSpace: "pre-line", marginBottom: "var(--space-8)" }}>
                            {project.description}
                        </div>

                        {/* Technology Stack Tags */}
                        {project.technologies && project.technologies.length > 0 && (
                            <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-6)" }}>
                                <span style={{ fontSize: "0.7rem", fontWeight: "bold", letterSpacing: "0.1em", color: "var(--color-text-tertiary)", display: "block", marginBottom: "var(--space-3)" }}>
                                    TECHNOLOGIES USED
                                </span>
                                <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                                    {project.technologies.map((tech) => (
                                        <span key={tech} style={{ padding: "6px 16px", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)", borderRadius: "var(--radius-full)", color: "var(--color-primary-light)", fontSize: "var(--font-size-xs)", fontWeight: "600" }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom CTA Panel */}
                    <div style={{ marginTop: "var(--space-12)", padding: "var(--space-12)", background: "var(--color-bg-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-2xl)", textAlign: "center" }}>
                        <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                            <HiSparkles />
                            BUILD A SIMILAR PRODUCT
                        </div>
                        <h3 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>
                            Interested in building a product like this?
                        </h3>
                        <p style={{ fontSize: "var(--font-size-base)", color: "var(--color-text-secondary)", maxWidth: 540, margin: "0 auto var(--space-6)" }}>
                            Let&apos;s discuss your requirements and design an execution plan tailored to your business needs.
                        </p>
                        <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-4)", flexWrap: "wrap" }}>
                            <Link to={ROUTES.CONTACT} className="btn btn--primary">
                                Discuss Your Idea →
                            </Link>
                            <a href="/#estimator" className="btn btn--outline">
                                Get a Rough Estimate
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetail;
