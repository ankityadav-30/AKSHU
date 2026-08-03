// APP/client/src/components/projects/ProjectCard.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import "./ProjectCard.css";

const ProjectCard = ({ project, index = 0 }) => {
    if (!project) return null;

    const detailUrl = ROUTES.PROJECT_DETAIL(project.slug || project._id);

    return (
        <motion.div
            className="project-card-component"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            viewport={{ once: true }}
        >
            <Link to={detailUrl} className="project-card-link">
                {/* Image / Branded Placeholder */}
                <div className="project-card-image-wrapper">
                    {project.thumbnail ? (
                        <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="project-card-image"
                            loading="lazy"
                        />
                    ) : (
                        <div className="project-card-placeholder">
                            <span className="project-card-placeholder-logo">AKSHU</span>
                            <span className="project-card-placeholder-cat">{project.category || "CASE STUDY"}</span>
                        </div>
                    )}
                    <div className="project-card-image-overlay" />
                </div>

                {/* Content Info */}
                <div className="project-card-info">
                    <div className="project-card-meta">
                        <span className="project-card-category">{project.category || "PRODUCT"}</span>
                    </div>

                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-desc">
                        {project.shortDescription || project.description?.substring(0, 110)}
                    </p>

                    {project.technologies && project.technologies.length > 0 && (
                        <div className="project-card-tech">
                            {project.technologies.slice(0, 3).map((tech) => (
                                <span key={tech} className="project-tech-tag">
                                    {tech}
                                </span>
                            ))}
                            {project.technologies.length > 3 && (
                                <span className="project-tech-tag project-tech-tag--more">
                                    +{project.technologies.length - 3}
                                </span>
                            )}
                        </div>
                    )}

                    <div className="project-card-action">
                        <span>View Project</span>
                        <HiArrowNarrowRight className="project-card-arrow" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProjectCard;
