// APP/client/src/admin/pages/blogs/BlogEditor.jsx

import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowLeft, HiSave, HiEye } from "react-icons/hi";
import api from "../../../services/api.js";
import { ROUTES, BLOG_CATEGORIES } from "../../../utils/constants.js";
import PageHeader from "../../components/PageHeader.jsx";
import ImageUploader from "../../components/ImageUploader.jsx";
import { showSuccess, showError } from "../../components/Toast.jsx";

const EMPTY_FORM = {
    title: "",
    slug: "",
    shortDescription: "",
    content: "",
    category: "Technology",
    tags: [],
    coverImage: { url: "", publicId: "" },
    featured: false,
    status: "DRAFT",
    seo: { metaTitle: "", metaDescription: "", keywords: [] },
};

const BlogEditor = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [form, setForm] = useState(EMPTY_FORM);
    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [tagInput, setTagInput] = useState("");
    const [keywordInput, setKeywordInput] = useState("");

    // Fetch existing blog for edit mode
    useEffect(() => {
        if (!isEdit) return;
        (async () => {
            try {
                const { data } = await api.get(`/blogs/${id}`);
                const blog = data?.data?.blog || data?.data || {};
                setForm({
                    title: blog.title || "",
                    slug: blog.slug || "",
                    shortDescription: blog.shortDescription || "",
                    content: blog.content || "",
                    category: blog.category || "Technology",
                    tags: blog.tags || [],
                    coverImage: blog.coverImage || { url: "", publicId: "" },
                    featured: blog.featured || false,
                    status: blog.status || "DRAFT",
                    seo: {
                        metaTitle: blog.seo?.metaTitle || "",
                        metaDescription: blog.seo?.metaDescription || "",
                        keywords: blog.seo?.keywords || [],
                    },
                });
            } catch (err) {
                showError(err?.message || "Failed to load blog");
                navigate(ROUTES.ADMIN_BLOGS);
            } finally {
                setLoading(false);
            }
        })();
    }, [id, isEdit, navigate]);

    // Auto-generate slug from title
    const handleTitleChange = (e) => {
        const title = e.target.value;
        setForm((prev) => ({
            ...prev,
            title,
            slug: !isEdit || prev.slug === slugify(prev.title)
                ? slugify(title)
                : prev.slug,
        }));
    };

    const updateField = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
    };

    const updateSeo = (key, value) => {
        setForm((prev) => ({ ...prev, seo: { ...prev.seo, [key]: value } }));
    };

    // Tag management
    const addTag = (e) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            if (!form.tags.includes(tagInput.trim())) {
                updateField("tags", [...form.tags, tagInput.trim()]);
            }
            setTagInput("");
        }
    };

    const removeTag = (tag) => {
        updateField("tags", form.tags.filter((t) => t !== tag));
    };

    // Keyword management
    const addKeyword = (e) => {
        if (e.key === "Enter" && keywordInput.trim()) {
            e.preventDefault();
            if (!form.seo.keywords.includes(keywordInput.trim())) {
                updateSeo("keywords", [...form.seo.keywords, keywordInput.trim()]);
            }
            setKeywordInput("");
        }
    };

    const removeKeyword = (kw) => {
        updateSeo("keywords", form.seo.keywords.filter((k) => k !== kw));
    };

    // Validate
    const validate = () => {
        const errs = {};
        if (!form.title.trim()) errs.title = "Title is required";
        if (!form.shortDescription.trim()) errs.shortDescription = "Short description is required";
        if (!form.content.trim()) errs.content = "Content is required";
        if (!form.category) errs.category = "Category is required";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    // Save
    const handleSave = useCallback(async (publishNow = false) => {
        if (!validate()) {
            showError("Please fill in all required fields.");
            return;
        }
        setSaving(true);

        const payload = {
            title: form.title.trim(),
            shortDescription: form.shortDescription.trim(),
            content: form.content,
            category: form.category,
            tags: form.tags || [],
            featured: Boolean(form.featured),
            status: publishNow ? "PUBLISHED" : form.status || "DRAFT",
        };

        if (form.slug && form.slug.trim()) {
            payload.slug = slugify(form.slug.trim());
        }

        if (form.coverImage?.url && form.coverImage.url.trim()) {
            payload.coverImage = {
                url: form.coverImage.url.trim(),
                publicId: form.coverImage.publicId || "blog_cover",
            };
        }

        if (form.seo?.metaTitle || form.seo?.metaDescription || form.seo?.keywords?.length) {
            payload.seo = {
                metaTitle: form.seo.metaTitle || "",
                metaDescription: form.seo.metaDescription || "",
                keywords: form.seo.keywords || [],
            };
        }

        try {
            if (isEdit) {
                await api.patch(`/blogs/${id}`, payload);
                if (publishNow && form.status !== "PUBLISHED") {
                    await api.patch(`/blogs/${id}/publish`);
                }
                showSuccess("Blog updated successfully");
            } else {
                const { data } = await api.post("/blogs", payload);
                const newId = data?.data?.blog?._id || data?.data?._id;
                if (publishNow && newId) {
                    await api.patch(`/blogs/${newId}/publish`);
                }
                showSuccess("Blog published successfully");
            }
            navigate(ROUTES.ADMIN_BLOGS);
        } catch (err) {
            const backendErrors = err?.response?.data?.errors;
            if (Array.isArray(backendErrors) && backendErrors.length > 0) {
                const errorMsg = backendErrors.map((e) => `${e.field}: ${e.message}`).join(" | ");
                showError(`Validation Error — ${errorMsg}`);
            } else {
                showError(err?.response?.data?.message || err?.message || "Failed to save blog");
            }
        } finally {
            setSaving(false);
        }
    }, [form, id, isEdit, navigate]);

    if (loading) {
        return (
            <div className="admin-page">
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                    <div className="admin-skeleton admin-skeleton--title" style={{ width: "30%", height: 28 }} />
                    <div className="admin-skeleton admin-skeleton--rect" style={{ width: "100%", height: 400 }} />
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <PageHeader
                title={isEdit ? "Edit Blog" : "New Blog"}
                subtitle={isEdit ? `Editing: ${form.title}` : "Create a new blog post"}
                actions={
                    <>
                        <button className="admin-btn admin-btn--ghost" onClick={() => navigate(ROUTES.ADMIN_BLOGS)}>
                            <HiArrowLeft size={16} /> Back
                        </button>
                        <button className="admin-btn admin-btn--secondary" onClick={() => handleSave(false)} disabled={saving}>
                            <HiSave size={16} /> {saving ? "Saving..." : "Save Draft"}
                        </button>
                        <button className="admin-btn admin-btn--primary" onClick={() => handleSave(true)} disabled={saving}>
                            <HiEye size={16} /> Publish
                        </button>
                    </>
                }
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "var(--space-6)", alignItems: "start" }}>
                {/* Main Content */}
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
                    {/* Title */}
                    <div className="admin-card">
                        <div className="admin-card__body">
                            <div className="admin-form">
                                <div className="admin-form-group">
                                    <label className="admin-label admin-label--required">Title</label>
                                    <input
                                        className={`admin-input ${errors.title ? "admin-input--error" : ""}`}
                                        value={form.title}
                                        onChange={handleTitleChange}
                                        placeholder="Enter blog title..."
                                    />
                                    {errors.title && <span className="admin-error-text">{errors.title}</span>}
                                </div>

                                <div className="admin-form-group">
                                    <label className="admin-label admin-label--required">Slug</label>
                                    <input
                                        className={`admin-input ${errors.slug ? "admin-input--error" : ""}`}
                                        value={form.slug}
                                        onChange={(e) => updateField("slug", e.target.value)}
                                        placeholder="blog-post-slug"
                                    />
                                    {errors.slug && <span className="admin-error-text">{errors.slug}</span>}
                                </div>

                                <div className="admin-form-group">
                                    <label className="admin-label admin-label--required">Short Description</label>
                                    <textarea
                                        className={`admin-textarea ${errors.shortDescription ? "admin-textarea--error" : ""}`}
                                        value={form.shortDescription}
                                        onChange={(e) => updateField("shortDescription", e.target.value)}
                                        placeholder="Brief excerpt (max 300 characters)"
                                        maxLength={300}
                                        rows={3}
                                    />
                                    <span className="admin-help-text">{form.shortDescription.length}/300</span>
                                    {errors.shortDescription && <span className="admin-error-text">{errors.shortDescription}</span>}
                                </div>

                                <div className="admin-form-group">
                                    <label className="admin-label admin-label--required">Content</label>
                                    <textarea
                                        className={`admin-textarea ${errors.content ? "admin-textarea--error" : ""}`}
                                        value={form.content}
                                        onChange={(e) => updateField("content", e.target.value)}
                                        placeholder="Write your blog content here..."
                                        rows={14}
                                        style={{ minHeight: 300 }}
                                    />
                                    {errors.content && <span className="admin-error-text">{errors.content}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SEO */}
                    <div className="admin-card">
                        <div className="admin-card__header">
                            <h3 className="admin-card__title">SEO Settings</h3>
                        </div>
                        <div className="admin-card__body">
                            <div className="admin-form">
                                <div className="admin-form-group">
                                    <label className="admin-label">Meta Title</label>
                                    <input
                                        className="admin-input"
                                        value={form.seo.metaTitle}
                                        onChange={(e) => updateSeo("metaTitle", e.target.value)}
                                        placeholder="SEO title"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label">Meta Description</label>
                                    <textarea
                                        className="admin-textarea"
                                        value={form.seo.metaDescription}
                                        onChange={(e) => updateSeo("metaDescription", e.target.value)}
                                        placeholder="SEO description"
                                        rows={3}
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label">Keywords</label>
                                    <div className="admin-chips">
                                        {form.seo.keywords.map((kw) => (
                                            <span key={kw} className="admin-chip">
                                                {kw}
                                                <button className="admin-chip__remove" onClick={() => removeKeyword(kw)}>×</button>
                                            </span>
                                        ))}
                                        <input
                                            className="admin-chips__input"
                                            value={keywordInput}
                                            onChange={(e) => setKeywordInput(e.target.value)}
                                            onKeyDown={addKeyword}
                                            placeholder="Add keyword + Enter"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
                    {/* Status */}
                    <div className="admin-card">
                        <div className="admin-card__header">
                            <h3 className="admin-card__title">Settings</h3>
                        </div>
                        <div className="admin-card__body">
                            <div className="admin-form">
                                <div className="admin-form-group">
                                    <label className="admin-label admin-label--required">Category</label>
                                    <select
                                        className={`admin-select ${errors.category ? "admin-select--error" : ""}`}
                                        value={form.category}
                                        onChange={(e) => updateField("category", e.target.value)}
                                    >
                                        {BLOG_CATEGORIES.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="admin-form-group">
                                    <label className="admin-label">Status</label>
                                    <select
                                        className="admin-select"
                                        value={form.status}
                                        onChange={(e) => updateField("status", e.target.value)}
                                    >
                                        <option value="DRAFT">Draft</option>
                                        <option value="PUBLISHED">Published</option>
                                        <option value="ARCHIVED">Archived</option>
                                    </select>
                                </div>

                                <div className="admin-form-group" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <label className="admin-label" style={{ marginBottom: 0 }}>Featured</label>
                                    <label className="admin-toggle">
                                        <input
                                            type="checkbox"
                                            checked={form.featured}
                                            onChange={(e) => updateField("featured", e.target.checked)}
                                        />
                                        <span className="admin-toggle__slider" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div className="admin-card">
                        <div className="admin-card__header">
                            <h3 className="admin-card__title">Cover Image</h3>
                        </div>
                        <div className="admin-card__body">
                            <ImageUploader
                                value={form.coverImage?.url}
                                onChange={(img) => updateField("coverImage", img)}
                                folder="blogs"
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="admin-card">
                        <div className="admin-card__header">
                            <h3 className="admin-card__title">Tags</h3>
                        </div>
                        <div className="admin-card__body">
                            <div className="admin-chips">
                                {form.tags.map((tag) => (
                                    <span key={tag} className="admin-chip">
                                        {tag}
                                        <button className="admin-chip__remove" onClick={() => removeTag(tag)}>×</button>
                                    </span>
                                ))}
                                <input
                                    className="admin-chips__input"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={addTag}
                                    placeholder="Add tag + Enter"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Responsive override for editor grid */}
            <style>{`
                @media (max-width: 900px) {
                    .admin-page > div:last-of-type {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

function slugify(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}

export default BlogEditor;
