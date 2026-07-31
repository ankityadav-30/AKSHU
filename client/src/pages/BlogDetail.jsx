// APP/client/src/pages/BlogDetail.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowLeft, HiCalendar, HiClock, HiSparkles } from "react-icons/hi";
import api from "../services/api.js";
import { ROUTES } from "../utils/constants.js";
import { getReadingTime } from "../utils/readingTime.js";
import "./PageShared.css";

const BlogDetail = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/blogs/${slug}`)
            .then((res) => setPost(res.data?.data || res.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <div className="page" style={{ paddingTop: 140, textAlign: "center", minHeight: "60vh" }}>
                <div className="container">
                    <div className="page-loader__spinner" style={{ margin: "0 auto var(--space-4)" }} />
                    <p style={{ color: "var(--color-text-secondary)" }}>Loading article...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="page" style={{ paddingTop: 140, textAlign: "center", minHeight: "60vh" }}>
                <div className="container">
                    <h2 style={{ fontSize: "2rem", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>
                        Article Not Found
                    </h2>
                    <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-6)" }}>
                        The article you requested could not be located.
                    </p>
                    <Link to={ROUTES.BLOG} className="btn btn--primary">
                        <HiArrowLeft /> Back to Insights
                    </Link>
                </div>
            </div>
        );
    }

    const coverUrl = post.coverImage?.url || (typeof post.coverImage === "string" ? post.coverImage : "");
    const readMins = getReadingTime(post);
    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : "Recent Insight";

    return (
        <div className="page">
            {/* Header Hero */}
            <section className="page-hero" style={{ paddingTop: 140, paddingBottom: 60 }}>
                <div className="container" style={{ maxWidth: 840 }}>
                    <Link to={ROUTES.BLOG} className="btn btn--outline btn--sm" style={{ marginBottom: "var(--space-6)", display: "inline-flex" }}>
                        <HiArrowLeft /> Back to Insights
                    </Link>

                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginBottom: "var(--space-4)", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "var(--font-size-xs)", fontWeight: "bold", color: "var(--color-accent)", padding: "2px 10px", background: "rgba(34,211,238,0.1)", borderRadius: "var(--radius-sm)", letterSpacing: "0.1em" }}>
                            {post.category || "TECHNOLOGY"}
                        </span>
                        <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <HiCalendar /> {formattedDate}
                        </span>
                        <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <HiClock /> {readMins} min read
                        </span>
                    </div>

                    <motion.h1
                        className="page-hero__title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)", lineHeight: 1.15, marginBottom: "var(--space-4)" }}
                    >
                        {post.title}
                    </motion.h1>

                    {post.shortDescription && (
                        <p style={{ fontSize: "var(--font-size-lg)", color: "var(--color-text-secondary)", lineHeight: "var(--line-height-relaxed)" }}>
                            {post.shortDescription}
                        </p>
                    )}
                </div>
            </section>

            {/* Reading Column */}
            <section className="section-lg" style={{ paddingTop: 0 }}>
                <div className="container" style={{ maxWidth: 840 }}>
                    <div className="content-card" style={{ padding: "var(--space-8)", background: "var(--color-bg-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-2xl)" }}>
                        {/* Article Cover Image */}
                        {coverUrl ? (
                            <img
                                src={coverUrl}
                                alt={post.title}
                                style={{ width: "100%", maxHeight: 480, objectFit: "cover", borderRadius: "var(--radius-xl)", marginBottom: "var(--space-8)", border: "1px solid var(--color-border)" }}
                            />
                        ) : (
                            <div style={{ width: "100%", height: 280, background: "linear-gradient(135deg, rgba(16,20,38,0.95), rgba(10,13,28,0.95))", borderRadius: "var(--radius-xl)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "var(--space-8)", border: "1px solid var(--color-border)" }}>
                                <span style={{ fontSize: "2.5rem", fontWeight: 900, color: "rgba(255,255,255,0.15)", letterSpacing: "-0.04em" }}>INSIGHTS</span>
                                <span style={{ fontSize: "var(--font-size-xs)", fontWeight: "bold", color: "var(--color-accent)", letterSpacing: "0.2em" }}>{post.category || "TECHNOLOGY"}</span>
                            </div>
                        )}

                        {/* Article Content Body */}
                        <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-base)", lineHeight: "1.8", whiteSpace: "pre-line", marginBottom: "var(--space-8)" }}>
                            {post.content}
                        </div>

                        {/* Article Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-6)", display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                                {post.tags.map((tag) => (
                                    <span key={tag} style={{ padding: "4px 14px", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)", borderRadius: "var(--radius-full)", color: "var(--color-primary-light)", fontSize: "var(--font-size-xs)" }}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Bottom CTA Panel */}
                    <div style={{ marginTop: "var(--space-12)", padding: "var(--space-10)", background: "var(--color-bg-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-2xl)", textAlign: "center" }}>
                        <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                            <HiSparkles />
                            TURN INSIGHTS INTO PRODUCTS
                        </div>
                        <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>
                            Interested in exploring a product idea with us?
                        </h3>
                        <p style={{ fontSize: "var(--font-size-base)", color: "var(--color-text-secondary)", maxWidth: 540, margin: "0 auto var(--space-6)" }}>
                            Let&apos;s turn thoughts and engineering capability into a working digital solution.
                        </p>
                        <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-4)", flexWrap: "wrap" }}>
                            <Link to={ROUTES.CONTACT} className="btn btn--primary">
                                Start a Conversation →
                            </Link>
                            <Link to={ROUTES.PROJECTS} className="btn btn--outline">
                                Explore Our Work
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogDetail;
