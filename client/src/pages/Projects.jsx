// APP/client/src/pages/Projects.jsx

import { useEffect, useState, useMemo } from "react";
import api from "../services/api.js";
import ProjectsHero from "../components/projects/ProjectsHero.jsx";
import FeaturedProject from "../components/projects/FeaturedProject.jsx";
import ProjectExplorer from "../components/projects/ProjectExplorer.jsx";
import ProjectGallery from "../components/projects/ProjectGallery.jsx";
import ProjectProcess from "../components/projects/ProjectProcess.jsx";
import ProjectsEstimatorCTA from "../components/projects/ProjectsEstimatorCTA.jsx";
import ProjectsCTA from "../components/projects/ProjectsCTA.jsx";

const Projects = () => {
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("ALL");

    const fetchProjects = () => {
        setLoading(true);
        setError(false);
        api.get("/projects")
            .then((res) => {
                const list = res.data?.data?.projects || res.data?.data || [];
                setAllProjects(list);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Featured Project (explicit featured flag or first item)
    const featuredProject = useMemo(() => {
        if (allProjects.length === 0) return null;
        return allProjects.find((p) => p.featured === true) || allProjects[0];
    }, [allProjects]);

    // Filtered Projects List for Explorer Gallery
    const filteredProjects = useMemo(() => {
        return allProjects.filter((p) => {
            // Category Match
            const matchesCategory =
                activeCategory === "ALL" ||
                (p.category && p.category.toUpperCase() === activeCategory.toUpperCase());

            // Search Match
            const query = searchQuery.trim().toLowerCase();
            const matchesSearch =
                query === "" ||
                p.title?.toLowerCase().includes(query) ||
                p.shortDescription?.toLowerCase().includes(query) ||
                p.description?.toLowerCase().includes(query) ||
                (p.technologies && p.technologies.some((t) => t.toLowerCase().includes(query)));

            return matchesCategory && matchesSearch;
        });
    }, [allProjects, searchQuery, activeCategory]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setActiveCategory("ALL");
    };

    return (
        <div className="projects-page">
            {/* 01: Hero */}
            <ProjectsHero />

            {/* 02: Featured Showcase */}
            <FeaturedProject project={featuredProject} loading={loading} />

            {/* 03: Search & Category Explorer */}
            <ProjectExplorer
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />

            {/* 04: Project Gallery Grid */}
            <ProjectGallery
                projects={filteredProjects}
                loading={loading}
                error={error}
                onRetry={fetchProjects}
                searchQuery={searchQuery}
                activeCategory={activeCategory}
                onClearFilters={handleClearFilters}
            />

            {/* 05: Process Transition */}
            <ProjectProcess />

            {/* 06: Estimator CTA */}
            <ProjectsEstimatorCTA />

            {/* 07: Final Contact CTA */}
            <ProjectsCTA />
        </div>
    );
};

export default Projects;
