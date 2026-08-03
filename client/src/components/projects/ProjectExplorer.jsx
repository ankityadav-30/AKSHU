// APP/client/src/components/projects/ProjectExplorer.jsx

import { HiSearch, HiX } from "react-icons/hi";
import "./ProjectExplorer.css";

const CATEGORIES = ["ALL", "WEB", "MOBILE", "AI", "DESKTOP", "OTHER"];

const ProjectExplorer = ({ searchQuery, setSearchQuery, activeCategory, setActiveCategory }) => {
    return (
        <section className="project-explorer section-sm">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        EXPLORE OUR WORK
                    </div>
                    <h2 className="section-title">
                        Different problems. Different products. <br />
                        <span className="text-gradient">One approach: build thoughtfully.</span>
                    </h2>
                </div>

                {/* Search Bar & Category Filters Bar */}
                <div className="explorer-controls">
                    {/* Search Input */}
                    <div className="explorer-search">
                        <HiSearch className="explorer-search__icon" />
                        <input
                            type="text"
                            placeholder="Search projects, stack, or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="explorer-search__input"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                className="explorer-search__clear"
                                onClick={() => setSearchQuery("")}
                                aria-label="Clear search"
                            >
                                <HiX />
                            </button>
                        )}
                    </div>

                    {/* Category Filter Pills */}
                    <div className="explorer-categories">
                        {CATEGORIES.map((cat) => {
                            const isSelected = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    className={`explorer-pill ${isSelected ? "explorer-pill--active" : ""}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectExplorer;
