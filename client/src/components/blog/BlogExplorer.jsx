// APP/client/src/components/blog/BlogExplorer.jsx

import { HiSearch, HiX } from "react-icons/hi";
import "./BlogExplorer.css";

const CATEGORIES = ["ALL", "Technology", "Programming", "AI", "Tutorial", "Company", "Career", "News", "Other"];

const BlogExplorer = ({ searchQuery, setSearchQuery, activeCategory, setActiveCategory }) => {
    return (
        <section className="blog-explorer section-sm">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        EXPLORE INSIGHTS
                    </div>
                    <h2 className="section-title">
                        Fresh thinking from <br />
                        <span className="text-gradient">what we&apos;re learning and building.</span>
                    </h2>
                </div>

                {/* Controls Bar */}
                <div className="blog-controls">
                    {/* Search Input */}
                    <div className="blog-search">
                        <HiSearch className="blog-search__icon" />
                        <input
                            type="text"
                            placeholder="Search insights, topics, technologies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="blog-search__input"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                className="blog-search__clear"
                                onClick={() => setSearchQuery("")}
                                aria-label="Clear search"
                            >
                                <HiX />
                            </button>
                        )}
                    </div>

                    {/* Filter Pills */}
                    <div className="blog-categories">
                        {CATEGORIES.map((cat) => {
                            const isSelected = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    className={`blog-pill ${isSelected ? "blog-pill--active" : ""}`}
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

export default BlogExplorer;
