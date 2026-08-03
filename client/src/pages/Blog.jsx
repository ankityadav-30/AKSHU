// APP/client/src/pages/Blog.jsx

import { useEffect, useState, useMemo } from "react";
import api from "../services/api.js";
import BlogsHero from "../components/blog/BlogsHero.jsx";
import FeaturedArticle from "../components/blog/FeaturedArticle.jsx";
import BlogExplorer from "../components/blog/BlogExplorer.jsx";
import BlogGallery from "../components/blog/BlogGallery.jsx";
import TopicsExplorer from "../components/blog/TopicsExplorer.jsx";
import BlogNewsletter from "../components/blog/BlogNewsletter.jsx";
import ThinkingToBuilding from "../components/blog/ThinkingToBuilding.jsx";
import BlogsCTA from "../components/blog/BlogsCTA.jsx";

const Blog = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("ALL");

    const fetchBlogs = () => {
        setLoading(true);
        setError(false);
        api.get("/blogs")
            .then((res) => {
                const list = res.data?.data?.blogs || res.data?.data || [];
                setAllPosts(list);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Featured Article (explicit featured flag or first item)
    const featuredPost = useMemo(() => {
        if (allPosts.length === 0) return null;
        return allPosts.find((p) => p.featured === true) || allPosts[0];
    }, [allPosts]);

    // Filtered Posts for Gallery Explorer
    const filteredPosts = useMemo(() => {
        return allPosts.filter((p) => {
            // Category Match
            const matchesCategory =
                activeCategory === "ALL" ||
                (p.category && p.category.toLowerCase() === activeCategory.toLowerCase());

            // Search Query Match
            const query = searchQuery.trim().toLowerCase();
            const matchesSearch =
                query === "" ||
                p.title?.toLowerCase().includes(query) ||
                p.shortDescription?.toLowerCase().includes(query) ||
                p.content?.toLowerCase().includes(query) ||
                (p.tags && p.tags.some((t) => t.toLowerCase().includes(query)));

            return matchesCategory && matchesSearch;
        });
    }, [allPosts, searchQuery, activeCategory]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setActiveCategory("ALL");
    };

    const handleTopicSelect = (cat) => {
        setActiveCategory(cat);
        window.scrollTo({ top: 600, behavior: "smooth" });
    };

    return (
        <div className="blog-page">
            {/* 01: Hero */}
            <BlogsHero />

            {/* 02: Featured Showcase */}
            <FeaturedArticle post={featuredPost} loading={loading} />

            {/* 03: Search & Category Explorer */}
            <BlogExplorer
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />

            {/* 04: Editorial Article Gallery */}
            <BlogGallery
                posts={filteredPosts}
                loading={loading}
                error={error}
                onRetry={fetchBlogs}
                searchQuery={searchQuery}
                activeCategory={activeCategory}
                onClearFilters={handleClearFilters}
            />

            {/* 05: Topic Explorer */}
            <TopicsExplorer onSelectCategory={handleTopicSelect} />

            {/* 06: Newsletter Subscription */}
            <BlogNewsletter />

            {/* 07: Thinking to Building Bridge */}
            <ThinkingToBuilding />

            {/* 08: Final Contact & Projects CTA */}
            <BlogsCTA />
        </div>
    );
};

export default Blog;
