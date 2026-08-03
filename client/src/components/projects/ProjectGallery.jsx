// APP/client/src/components/projects/ProjectGallery.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowNarrowRight, HiRefresh } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import "./ProjectGallery.css";

const ProjectGallery = ({ projects, loading, error, onRetry, searchQuery, activeCategory, onClearFilters }) => {
    if (loading) {
        return (
            <section className="project-gallery section-sm">
                <div className="container">
                    <div className="gallery-grid">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="gallery-skeleton-card" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="project-gallery section-sm">
                <div className="container">
                    <div className="gallery-error-card">
                        <h3>We couldn&apos;t load our work right now.</h3>
                        <p>There was a connection error fetching projects from the server.</p>
                        <button type="button" className="btn btn--outline" onClick={onRetry}>
                            <HiRefresh /> Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (projects.length === 0) {
        const isFiltering = searchQuery !== "" || activeCategory !== "ALL";
        return (
            <section className="project-gallery section-sm">
                <div className="container">
                    <div className="gallery-empty-card">
                        {isFiltering ? (
                            <>
                                <h3>Nothing here yet.</h3>
                                <p>Try searching for a different term or clear your active category filter.</p>
                                <button type="button" className="btn btn--outline" onClick={onClearFilters}>
                                    Clear Filters
                                </button>
                            </>
                        ) : (
                            <>
                                <h3>We&apos;re building.</h3>
                                <p>New work will appear here as digital products are ready to share.</p>
                                <Link to={ROUTES.SERVICES} className="btn btn--outline">
                                    Explore Our Services →
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="project-gallery section-sm">
            <div className="container">
                <div className="gallery-grid">
                    {projects.map((project, index) => {
                        const detailUrl = ROUTES.PROJECT_DETAIL(project.slug || project._id);
                        return (
                            <motion.div
                                key={project._id || index}
                                className="gallery-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link to={detailUrl} className="gallery-card__link">
                                    {/* Image / Branded Placeholder */}
                                    <div className="gallery-card__image-wrapper">
                                        {project.thumbnail ? (
                                            <img
                                                src={project.thumbnail}
                                                alt={project.title}
                                                className="gallery-card__image"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="gallery-card__placeholder">
                                                <span className="gallery-card__placeholder-logo">AKSHU</span>
                                                <span className="gallery-card__placeholder-cat">{project.category || "CASE STUDY"}</span>
                                            </div>
                                        )}
                                        <div className="gallery-card__image-overlay" />
                                    </div>

                                    {/* Content Info */}
                                    <div className="gallery-card__info">
                                        <div className="gallery-card__meta">
                                            <span className="gallery-card__num">{String(index + 1).padStart(2, "0")}</span>
                                            <span className="gallery-card__category">{project.category || "PRODUCT"}</span>
                                        </div>

                                        <h3 className="gallery-card__title">{project.title}</h3>
                                        <p className="gallery-card__desc">
                                            {project.shortDescription || project.description?.substring(0, 110)}
                                        </p>

                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="gallery-card__tech">
                                                {project.technologies.slice(0, 3).map((tech) => (
                                                    <span key={tech} className="gallery-tech-tag">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="gallery-card__action">
                                            <span>View Project</span>
                                            <HiArrowNarrowRight className="gallery-card__arrow" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProjectGallery;
