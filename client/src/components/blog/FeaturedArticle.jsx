// APP/client/src/components/blog/FeaturedArticle.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiClock, HiCalendar } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import { getReadingTime } from "../../utils/readingTime.js";
import "./FeaturedArticle.css";

const FeaturedArticle = ({ post, loading }) => {
    if (loading) {
        return (
            <div className="featured-article-skeleton container">
                <div className="featured-article-skeleton__card" />
            </div>
        );
    }

    if (!post) return null;

    const detailUrl = ROUTES.BLOG_DETAIL(post.slug || post._id);
    const coverUrl = post.coverImage?.url || (typeof post.coverImage === "string" ? post.coverImage : "");
    const readMins = getReadingTime(post);
    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : "Recent Insight";

    return (
        <section className="featured-article-section">
            <div className="container">
                <motion.div
                    className="featured-article-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    {/* Cover Banner */}
                    <div className="featured-article-card__image-wrapper">
                        {coverUrl ? (
                            <img
                                src={coverUrl}
                                alt={post.title}
                                className="featured-article-card__image"
                            />
                        ) : (
                            <div className="featured-article-card__placeholder">
                                <span className="featured-article-card__placeholder-logo">INSIGHTS</span>
                                <span className="featured-article-card__placeholder-cat">{post.category || "TECHNOLOGY"}</span>
                            </div>
                        )}
                        <div className="featured-article-card__overlay" />
                    </div>

                    {/* Content Details Panel */}
                    <div className="featured-article-card__content">
                        <div className="featured-article-card__badge">
                            <span className="featured-article-card__badge-dot" />
                            FEATURED INSIGHT
                        </div>

                        <div className="featured-article-card__meta">
                            <span className="meta-item">
                                <HiCalendar /> {formattedDate}
                            </span>
                            <span className="meta-item-dot" />
                            <span className="meta-item">
                                <HiClock /> {readMins} min read
                            </span>
                        </div>

                        <h2 className="featured-article-card__title">{post.title}</h2>

                        <p className="featured-article-card__desc">
                            {post.shortDescription || post.excerpt || post.content?.substring(0, 160)}
                        </p>

                        <div className="featured-article-card__actions">
                            <Link to={detailUrl} className="btn btn--primary">
                                Read Article <HiArrowRight />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedArticle;
