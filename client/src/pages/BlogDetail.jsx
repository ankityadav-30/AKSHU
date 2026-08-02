// APP/client/src/pages/BlogDetail.jsx

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    HiArrowLeft,
    HiCalendar,
    HiClock,
    HiSparkles,
    HiShare,
    HiCheck,
    HiClipboardCopy,
    HiUser,
    HiMail,
    HiArrowRight,
    HiBookOpen,
} from "react-icons/hi";
import {
    FaLinkedinIn,
    FaTwitter,
    FaFacebookF,
    FaWhatsapp,
} from "react-icons/fa";

import api from "../services/api.js";
import { ROUTES } from "../utils/constants.js";
import { getReadingTime } from "../utils/readingTime.js";
import { showSuccess, showError } from "../admin/components/Toast.jsx";
import "./BlogDetail.css";

const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Newsletter state
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
    const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);

    // Scroll Progress Listener
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const currentProgress = (window.scrollY / totalHeight) * 100;
                setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fetch Article Data
    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(false);

        api.get(`/blogs/${slug}`)
            .then((res) => {
                if (!isMounted) return;
                const p = res.data?.data?.blog || res.data?.data || res.data;
                if (p && p.title) {
                    setPost(p);
                    // Fetch related posts
                    api.get("/blogs")
                        .then((relRes) => {
                            if (!isMounted) return;
                            const all = relRes.data?.data?.blogs || relRes.data?.data || relRes.data || [];
                            const filtered = all
                                .filter((item) => item._id !== p._id && item.slug !== p.slug)
                                .slice(0, 3);
                            setRelatedPosts(filtered);
                        })
                        .catch(() => {});
                } else {
                    setError(true);
                }
            })
            .catch(() => {
                if (isMounted) setError(true);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [slug]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        showSuccess("Article link copied to clipboard!");
    };

    const handleSubscribeNewsletter = async (e) => {
        e.preventDefault();
        if (!newsletterEmail || !newsletterEmail.includes("@")) {
            showError("Please enter a valid email address.");
            return;
        }
        setNewsletterSubmitting(true);
        try {
            await api.post("/newsletter/subscribe", { email: newsletterEmail });
            showSuccess("Thank you for subscribing to AKSHU Insights!");
            setNewsletterEmail("");
        } catch (err) {
            showError(err?.response?.data?.message || err?.message || "Failed to subscribe.");
        } finally {
            setNewsletterSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="blog-detail-page">
                <div className="container" style={{ paddingTop: 140, paddingBottom: 100 }}>
                    <div className="admin-skeleton admin-skeleton--title" style={{ width: "35%", height: 32, marginBottom: 20 }} />
                    <div className="admin-skeleton admin-skeleton--rect" style={{ width: "100%", height: 420, borderRadius: 24 }} />
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="blog-detail-page">
                <div className="container" style={{ paddingTop: 140, paddingBottom: 100, textAlign: "center" }}>
                    <div className="blog-author-card" style={{ maxWidth: 540, margin: "0 auto", padding: 40, flexDirection: "column" }}>
                        <h2 style={{ fontSize: "1.75rem", color: "#ffffff", marginBottom: 12 }}>Article Not Found</h2>
                        <p style={{ color: "#94a3b8", marginBottom: 24 }}>The requested article could not be located or has been moved.</p>
                        <button className="btn btn--primary" onClick={() => navigate(ROUTES.BLOG)}>
                            <HiArrowLeft /> Back to Blog Insights
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const coverUrl = post.coverImage?.url || (typeof post.coverImage === "string" ? post.coverImage : "");
    const readMins = getReadingTime(post);
    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : "Recent";

    const authorName = post.author?.name || post.author?.firstName ? `${post.author?.firstName || ""} ${post.author?.lastName || ""}`.trim() : "AKSHU Editorial Team";
    const authorAvatar = post.author?.avatar || post.author?.profileImage || "";
    const authorInitials = authorName.substring(0, 2).toUpperCase();

    // Table of contents sections
    const headings = extractHeadings(post.content);

    return (
        <div className="blog-detail-page">
            {/* Sticky Reading Progress Bar */}
            <div className="reading-progress-bar" style={{ width: `${scrollProgress}%` }} />

            {/* Top Navigation & Breadcrumbs */}
            <div className="container">
                <div className="blog-nav-bar">
                    <Link to={ROUTES.BLOG} className="blog-back-btn">
                        <HiArrowLeft /> Back to Insights
                    </Link>
                    <div className="blog-breadcrumb">
                        <Link to={ROUTES.HOME}>Home</Link> / <Link to={ROUTES.BLOG}>Blog</Link> / <span>{post.title}</span>
                    </div>
                </div>
            </div>

            {/* ARTICLE HERO SECTION */}
            <section className="blog-hero">
                <div className="container">
                    <div className="blog-hero__container">
                        <div className="blog-hero__meta">
                            <span className="blog-category-badge">{post.category || "TECHNOLOGY"}</span>
                            {post.featured && <span className="blog-featured-badge">★ FEATURED ARTICLE</span>}
                        </div>

                        <h1 className="blog-hero__title">{post.title}</h1>
                        {post.shortDescription && <p className="blog-hero__subtitle">{post.shortDescription}</p>}

                        {/* Author & Published Metadata Bar */}
                        <div className="blog-hero__author-bar">
                            <div className="blog-hero__author-info">
                                {authorAvatar ? (
                                    <img src={authorAvatar} alt={authorName} className="blog-hero__author-avatar" />
                                ) : (
                                    <div className="blog-hero__author-placeholder">
                                        <span>{authorInitials}</span>
                                    </div>
                                )}
                                <span className="blog-hero__author-name">{authorName}</span>
                            </div>
                            <span>•</span>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                                <HiCalendar /> {formattedDate}
                            </span>
                            <span>•</span>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                                <HiClock /> {readMins} min read
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED COVER IMAGE */}
            {coverUrl && (
                <div className="container">
                    <div className="blog-cover-wrapper">
                        <div className="blog-cover-frame">
                            <img src={coverUrl} alt={post.title} className="blog-cover-img" />
                        </div>
                    </div>
                </div>
            )}

            {/* MAIN ARTICLE LAYOUT (STICKY TOC + READING CONTENT) */}
            <section className="section-sm">
                <div className="container">
                    <div className="blog-article-grid">
                        {/* Table of Contents Sticky Sidebar (Desktop) */}
                        <aside className="blog-toc-sidebar">
                            <div className="blog-toc-title">
                                <HiBookOpen style={{ verticalAlign: "middle", marginRight: 6 }} />
                                Table of Contents
                            </div>
                            <ul className="blog-toc-list">
                                <li>
                                    <a href="#overview">Overview</a>
                                </li>
                                {headings.map((h, i) => (
                                    <li key={i}>
                                        <a href={`#section-${i}`}>{h}</a>
                                    </li>
                                ))}
                            </ul>
                        </aside>

                        {/* Main Reading Column */}
                        <div className="blog-content-body">
                            <div id="overview">
                                {renderFormattedContent(post.content, setCopiedCodeIndex, copiedCodeIndex)}
                            </div>

                            {/* Tags Chips */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="blog-tags-list">
                                    {post.tags.map((tag) => (
                                        <Link to={`/blog?tag=${tag}`} key={tag} className="blog-tag-chip">
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Social Share Bar */}
                            <div className="blog-share-bar">
                                <div className="blog-share-title">
                                    <HiShare style={{ verticalAlign: "middle", marginRight: 6, color: "var(--color-accent)" }} />
                                    Share this Insight
                                </div>
                                <div className="blog-share-buttons">
                                    <a
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="blog-share-btn"
                                        aria-label="Share on LinkedIn"
                                    >
                                        <FaLinkedinIn />
                                    </a>
                                    <a
                                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="blog-share-btn"
                                        aria-label="Share on Twitter"
                                    >
                                        <FaTwitter />
                                    </a>
                                    <a
                                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} — ${window.location.href}`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="blog-share-btn"
                                        aria-label="Share on WhatsApp"
                                    >
                                        <FaWhatsapp />
                                    </a>
                                    <button type="button" className="blog-share-btn" onClick={handleCopyLink} aria-label="Copy Link">
                                        <HiClipboardCopy />
                                    </button>
                                </div>
                            </div>

                            {/* Author Biography Box */}
                            <div className="blog-author-card">
                                {authorAvatar ? (
                                    <img src={authorAvatar} alt={authorName} className="blog-author-avatar" />
                                ) : (
                                    <div className="blog-hero__author-placeholder" style={{ width: 80, height: 80, fontSize: "1.75rem" }}>
                                        <span>{authorInitials}</span>
                                    </div>
                                )}
                                <div className="blog-author-info">
                                    <h4>Written by {authorName}</h4>
                                    <div className="blog-author-role">AKSHU Engineering & Editorial Specialist</div>
                                    <p className="blog-author-bio">
                                        Crafting modern digital products, scalable cloud architectures, and publishing engineering insights for AKSHU Technologies.
                                    </p>
                                </div>
                            </div>

                            {/* Newsletter Subscription CTA Card */}
                            <div className="blog-newsletter-card">
                                <div className="section-tag" style={{ margin: "0 auto var(--space-3)" }}>
                                    <HiSparkles /> STAY AHEAD
                                </div>
                                <h3>Enjoyed this article?</h3>
                                <p>Subscribe to our newsletter to receive technical insights, case studies, and engineering updates directly in your inbox.</p>
                                <form onSubmit={handleSubscribeNewsletter} className="blog-newsletter-form">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address..."
                                        value={newsletterEmail}
                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                        className="blog-newsletter-input"
                                        required
                                    />
                                    <button type="submit" className="btn btn--primary" disabled={newsletterSubmitting}>
                                        {newsletterSubmitting ? "Subscribing..." : "Subscribe →"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* RELATED ARTICLES SECTION */}
            {relatedPosts.length > 0 && (
                <section className="section-sm blog-related-section">
                    <div className="container" style={{ maxWidth: 1100 }}>
                        <h2 className="project-section-title">
                            <HiSparkles className="project-section-title-icon" />
                            Related Articles & Insights
                        </h2>
                        <div className="blog-related-grid">
                            {relatedPosts.map((rel) => {
                                const relCover = rel.coverImage?.url || (typeof rel.coverImage === "string" ? rel.coverImage : "");
                                return (
                                    <Link to={`/blog/${rel.slug || rel._id}`} key={rel._id} className="blog-related-card">
                                        {relCover ? (
                                            <img src={relCover} alt={rel.title} className="blog-related-img" />
                                        ) : (
                                            <div style={{ height: 180, background: "linear-gradient(135deg, #1e1b4b, #0f172a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <span style={{ fontWeight: 800, color: "rgba(255,255,255,0.2)", fontSize: "1.5rem" }}>AKSHU</span>
                                            </div>
                                        )}
                                        <div className="blog-related-body">
                                            <span className="blog-related-cat">{rel.category || "TECHNOLOGY"}</span>
                                            <h3 className="blog-related-title">{rel.title}</h3>
                                            <p className="blog-related-desc">{rel.shortDescription || rel.content?.substring(0, 100)}</p>
                                            <span className="blog-related-link">
                                                Read Article <HiArrowRight />
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

// Helper function to extract headings for Table of Contents
function extractHeadings(content = "") {
    const lines = content.split("\n");
    const headings = [];
    lines.forEach((l) => {
        if (l.trim().startsWith("#")) {
            const text = l.replace(/^#+\s*/, "").trim();
            if (text) headings.push(text);
        }
    });
    return headings.length > 0 ? headings : ["Key Insights", "Technical Overview", "Conclusion"];
}

// Render formatted content with headings and code block copy support
function renderFormattedContent(content = "", setCopiedIndex, copiedIndex) {
    const lines = content.split("\n");
    let currentBlock = [];
    let isCodeBlock = false;
    let codeLanguage = "";
    let elementIndex = 0;

    const elements = [];

    lines.forEach((line, i) => {
        if (line.trim().startsWith("```")) {
            if (isCodeBlock) {
                // End code block
                const codeContent = currentBlock.join("\n");
                const idx = elementIndex++;
                elements.push(
                    <div key={idx} className="blog-code-block">
                        <div className="blog-code-block__header">
                            <span>{codeLanguage || "code"}</span>
                            <button
                                type="button"
                                className="blog-code-copy-btn"
                                onClick={() => {
                                    navigator.clipboard.writeText(codeContent);
                                    setCopiedIndex(idx);
                                    setTimeout(() => setCopiedIndex(null), 2000);
                                }}
                            >
                                {copiedIndex === idx ? <><HiCheck /> Copied</> : <><HiClipboardCopy /> Copy</>}
                            </button>
                        </div>
                        <pre><code>{codeContent}</code></pre>
                    </div>
                );
                currentBlock = [];
                isCodeBlock = false;
            } else {
                // Start code block
                isCodeBlock = true;
                codeLanguage = line.replace("```", "").trim();
            }
            return;
        }

        if (isCodeBlock) {
            currentBlock.push(line);
            return;
        }

        if (line.trim().startsWith(">")) {
            elements.push(
                <blockquote key={elementIndex++}>
                    {line.replace(/^>\s*/, "")}
                </blockquote>
            );
            return;
        }

        if (line.trim().startsWith("##")) {
            elements.push(
                <h2 id={`section-${elementIndex}`} key={elementIndex++}>
                    {line.replace(/^##+\s*/, "")}
                </h2>
            );
            return;
        }

        if (line.trim().length > 0) {
            elements.push(<p key={elementIndex++}>{line}</p>);
        }
    });

    return elements;
}

export default BlogDetail;
