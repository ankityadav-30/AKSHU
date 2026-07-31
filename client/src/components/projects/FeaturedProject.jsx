// APP/client/src/components/projects/FeaturedProject.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiExternalLink } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import "./FeaturedProject.css";

const FeaturedProject = ({ project, loading }) => {
    if (loading) {
        return (
            <div className="featured-project-skeleton container">
                <div className="featured-skeleton__card" />
            </div>
        );
    }

    if (!project) return null;

    const detailUrl = ROUTES.PROJECT_DETAIL(project.slug || project._id);

    return (
        <section className="featured-project-section">
            <div className="container">
                <motion.div
                    className="featured-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    {/* Visual Banner */}
                    <div className="featured-card__image-wrapper">
                        {project.thumbnail ? (
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="featured-card__image"
                            />
                        ) : (
                            <div className="featured-card__placeholder">
                                <span className="featured-card__placeholder-logo">AKSHU</span>
                                <span className="featured-card__placeholder-cat">{project.category || "WEB PRODUCT"}</span>
                            </div>
                        )}
                        <div className="featured-card__overlay" />
                    </div>

                    {/* Glass Content Overlay */}
                    <div className="featured-card__content">
                        <div className="featured-card__badge">
                            <span className="featured-card__badge-dot" />
                            FEATURED CASE STUDY
                        </div>

                        <h2 className="featured-card__title">{project.title}</h2>

                        <p className="featured-card__desc">
                            {project.shortDescription || project.description?.substring(0, 160)}
                        </p>

                        {/* Tech tags */}
                        {project.technologies && project.technologies.length > 0 && (
                            <div className="featured-card__tech">
                                {project.technologies.slice(0, 5).map((tech) => (
                                    <span key={tech} className="featured-tech-tag">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="featured-card__actions">
                            <Link to={detailUrl} className="btn btn--primary">
                                View Case Study <HiArrowRight />
                            </Link>

                            {project.liveDemoUrl && (
                                <a
                                    href={project.liveDemoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn--outline"
                                >
                                    Live Demo <HiExternalLink />
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedProject;
