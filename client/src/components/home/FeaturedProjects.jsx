// APP/client/src/components/home/FeaturedProjects.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import api from "../../services/api.js";
import { ROUTES } from "../../utils/constants.js";
import "./FeaturedProjects.css";

const FeaturedProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/projects?limit=4")
            .then((res) => {
                const list = res.data?.data?.projects || res.data?.data || [];
                setProjects(list);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (!loading && projects.length === 0) {
        return null; // Gracefully omit section if no projects exist in database
    }

    return (
        <section className="featured-projects section-lg">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        SELECTED WORK
                    </div>
                    <h2 className="section-title">
                        Products we&apos;ve <span className="text-gradient">brought to life</span>.
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        A showcase of engineering excellence, user-centric design, and measurable impact.
                    </p>
                </div>

                {loading ? (
                    <div className="featured-projects__loading">
                        <div className="page-loader__spinner" style={{ width: 36, height: 36 }} />
                    </div>
                ) : (
                    <div className="featured-projects__list">
                        {projects.map((project, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={project._id || project.slug || index}
                                    className={`case-study ${isEven ? "case-study--normal" : "case-study--reverse"}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    {/* Image Container */}
                                    <div className="case-study__image-wrapper">
                                        {project.thumbnail || project.coverImage ? (
                                            <img
                                                src={project.thumbnail || project.coverImage}
                                                alt={project.title}
                                                className="case-study__image"
                                            />
                                        ) : (
                                            <div className="case-study__placeholder">
                                                <span className="case-study__placeholder-title">{project.title}</span>
                                            </div>
                                        )}
                                        <div className="case-study__image-overlay" />
                                    </div>

                                    {/* Info Container */}
                                    <div className="case-study__info">
                                        <span className="case-study__category">
                                            {project.category || "Case Study"}
                                        </span>
                                        <h3 className="case-study__title">{project.title}</h3>
                                        <p className="case-study__desc">
                                            {project.shortDescription || project.description?.substring(0, 160)}...
                                        </p>

                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="case-study__techs">
                                                {project.technologies.map((tech) => (
                                                    <span key={tech} className="case-study__tech">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <Link
                                            to={ROUTES.PROJECT_DETAIL(project.slug)}
                                            className="btn btn--outline case-study__cta"
                                        >
                                            View Case Study <HiArrowRight />
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                <div style={{ textAlign: "center", marginTop: "var(--space-12)" }}>
                    <Link to={ROUTES.PROJECTS} className="btn btn--primary btn--lg">
                        Explore All Projects <HiArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
