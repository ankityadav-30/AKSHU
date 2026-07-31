// APP/client/src/components/blog/BlogGallery.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowNarrowRight, HiRefresh, HiClock, HiCalendar } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import { getReadingTime } from "../../utils/readingTime.js";
import "./BlogGallery.css";

const BlogGallery = ({ posts, loading, error, onRetry, searchQuery, activeCategory, onClearFilters }) => {
    if (loading) {
        return (
            <section className="blog-gallery section-sm">
                <div className="container">
                    <div className="blog-gallery-grid">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="blog-skeleton-card" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="blog-gallery section-sm">
                <div className="container">
                    <div className="blog-error-card">
                        <h3>We couldn&apos;t load Insights right now.</h3>
                        <p>There was a connection issue fetching articles from the server.</p>
                        <button type="button" className="btn btn--outline" onClick={onRetry}>
                            <HiRefresh /> Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (posts.length === 0) {
        const isFiltering = searchQuery !== "" || activeCategory !== "ALL";
        return (
            <section className="blog-gallery section-sm">
                <div className="container">
                    <div className="blog-empty-card">
                        {isFiltering ? (
                            <>
                                <h3>No insights found.</h3>
                                <p>Try searching for a different keyword or clear your active category filter.</p>
                                <button type="button" className="btn btn--outline" onClick={onClearFilters}>
                                    Clear Filters
                                </button>
                            </>
                        ) : (
                            <>
                                <h3>Ideas are brewing.</h3>
                                <p>We&apos;re working on new thoughts, lessons, and technical stories. They&apos;ll appear here soon.</p>
                                <Link to={ROUTES.PROJECTS} className="btn btn--outline">
                                    Explore Our Projects →
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="blog-gallery section-sm">
            <div className="container">
                <div className="blog-gallery-grid">
                    {posts.map((post, index) => {
                        const detailUrl = ROUTES.BLOG_DETAIL(post.slug || post._id);
                        const coverUrl = post.coverImage?.url || (typeof post.coverImage === "string" ? post.coverImage : "");
                        const readMins = getReadingTime(post);
                        const formattedDate = post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                            : "Recent";

                        return (
                            <motion.div
                                key={post._id || index}
                                className="blog-card-item"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link to={detailUrl} className="blog-card-item__link">
                                    {/* Cover Image / Editorial Placeholder */}
                                    <div className="blog-card-item__image-wrapper">
                                        {coverUrl ? (
                                            <img
                                                src={coverUrl}
                                                alt={post.title}
                                                className="blog-card-item__image"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="blog-card-item__placeholder">
                                                <span className="blog-card-item__placeholder-logo">INSIGHTS</span>
                                                <span className="blog-card-item__placeholder-cat">{post.category || "TECHNOLOGY"}</span>
                                            </div>
                                        )}
                                        <div className="blog-card-item__overlay" />
                                    </div>

                                    {/* Article Info */}
                                    <div className="blog-card-item__info">
                                        <div className="blog-card-item__meta">
                                            <span className="blog-card-item__cat">{post.category || "ARTICLE"}</span>
                                            <span className="meta-dot" />
                                            <span className="meta-text"><HiCalendar /> {formattedDate}</span>
                                            <span className="meta-dot" />
                                            <span className="meta-text"><HiClock /> {readMins} min</span>
                                        </div>

                                        <h3 className="blog-card-item__title">{post.title}</h3>

                                        <p className="blog-card-item__desc">
                                            {post.shortDescription || post.excerpt || post.content?.substring(0, 110)}
                                        </p>

                                        {post.tags && post.tags.length > 0 && (
                                            <div className="blog-card-item__tags">
                                                {post.tags.slice(0, 3).map((tag) => (
                                                    <span key={tag} className="blog-tag-chip">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="blog-card-item__action">
                                            <span>Read Article</span>
                                            <HiArrowNarrowRight className="blog-card-item__arrow" />
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

export default BlogGallery;
