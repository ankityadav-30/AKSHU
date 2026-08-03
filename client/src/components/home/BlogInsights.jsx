// APP/client/src/components/home/BlogInsights.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import api from "../../services/api.js";
import { ROUTES } from "../../utils/constants.js";
import "./BlogInsights.css";

const BlogInsights = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/blogs?limit=3")
            .then((res) => {
                const list = res.data?.data?.blogs || res.data?.data || [];
                setBlogs(list);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (!loading && blogs.length === 0) {
        return null; // Omit gracefully if no blogs exist
    }

    const featured = blogs[0];
    const sideBlogs = blogs.slice(1, 3);

    return (
        <section className="blog-insights section-lg">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        INSIGHTS
                    </div>
                    <h2 className="section-title">
                        Ideas, engineering & <span className="text-gradient">what we&apos;re learning</span>.
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        Thought leadership, architectural deep-dives, and technical lessons from our team.
                    </p>
                </div>

                {loading ? (
                    <div className="featured-projects__loading">
                        <div className="page-loader__spinner" style={{ width: 36, height: 36 }} />
                    </div>
                ) : (
                    <div className="blog-insights__editorial">
                        {/* Featured Large Article */}
                        {featured && (
                            <motion.div
                                className="blog-card blog-card--featured"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <div className="blog-card__image-wrapper">
                                    {featured.coverImage ? (
                                        <img src={featured.coverImage} alt={featured.title} className="blog-card__image" />
                                    ) : (
                                        <div className="blog-card__placeholder">
                                            <span>INSIGHTS</span>
                                        </div>
                                    )}
                                </div>
                                <div className="blog-card__content">
                                    <span className="blog-card__tag">{featured.category || "Engineering"}</span>
                                    <h3 className="blog-card__title">{featured.title}</h3>
                                    <p className="blog-card__excerpt">
                                        {featured.excerpt || featured.content?.substring(0, 140)}...
                                    </p>
                                    <Link to={ROUTES.BLOG_DETAIL(featured.slug)} className="blog-card__link">
                                        Read Article <HiArrowRight />
                                    </Link>
                                </div>
                            </motion.div>
                        )}

                        {/* Side Articles */}
                        <div className="blog-insights__side">
                            {sideBlogs.map((blog, i) => (
                                <motion.div
                                    key={blog._id || blog.slug || i}
                                    className="blog-card blog-card--side"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.15 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="blog-card__tag">{blog.category || "Insights"}</span>
                                    <h3 className="blog-card__title">{blog.title}</h3>
                                    <p className="blog-card__excerpt">
                                        {blog.excerpt || blog.content?.substring(0, 100)}...
                                    </p>
                                    <Link to={ROUTES.BLOG_DETAIL(blog.slug)} className="blog-card__link">
                                        Read Article <HiArrowRight />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ textAlign: "center", marginTop: "var(--space-12)" }}>
                    <Link to={ROUTES.BLOG} className="btn btn--outline">
                        View All Articles <HiArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogInsights;
