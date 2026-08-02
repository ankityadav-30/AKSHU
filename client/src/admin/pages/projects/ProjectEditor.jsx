// APP/client/src/admin/pages/projects/ProjectEditor.jsx

import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowLeft, HiSave, HiEye } from "react-icons/hi";
import api from "../../../services/api.js";
import { ROUTES, PROJECT_CATEGORIES } from "../../../utils/constants.js";
import PageHeader from "../../components/PageHeader.jsx";
import ImageUploader from "../../components/ImageUploader.jsx";
import { showSuccess, showError } from "../../components/Toast.jsx";

const EMPTY = {
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    thumbnail: "",
    gallery: [],
    technologies: [],
    category: "WEB",
    liveDemoUrl: "",
    githubUrl: "",
    featured: false,
    status: "DRAFT",
    seo: { metaTitle: "", metaDescription: "", keywords: [] },
};

const ProjectEditor = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [form, setForm] = useState(EMPTY);
    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [techInput, setTechInput] = useState("");
    const [kwInput, setKwInput] = useState("");

    useEffect(() => {
        if (!isEdit) return;
        (async () => {
            try {
                const { data } = await api.get(`/projects/${id}`);
                const p = data?.data?.project || data?.data || {};
                setForm({
                    title: p.title || "",
                    slug: p.slug || "",
                    shortDescription: p.shortDescription || "",
                    description: p.description || "",
                    thumbnail: p.thumbnail || "",
                    gallery: p.gallery || [],
                    technologies: p.technologies || [],
                    category: p.category || "WEB",
                    liveDemoUrl: p.liveDemoUrl || "",
                    githubUrl: p.githubUrl || "",
                    featured: p.featured || false,
                    status: p.status || "DRAFT",
                    seo: {
                        metaTitle: p.seo?.metaTitle || "",
                        metaDescription: p.seo?.metaDescription || "",
                        keywords: p.seo?.keywords || [],
                    },
                });
            } catch (err) {
                showError(err?.message || "Failed to load project");
                navigate(ROUTES.ADMIN_PROJECTS);
            } finally {
                setLoading(false);
            }
        })();
    }, [id, isEdit, navigate]);

    const slug = (s) =>
        s
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();

    const set = (k, v) => {
        setForm((p) => ({ ...p, [k]: v }));
        if (errors[k]) setErrors((p) => ({ ...p, [k]: "" }));
    };

    const setSeo = (k, v) => setForm((p) => ({ ...p, seo: { ...p.seo, [k]: v } }));

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = "Title is required";
        if (!form.shortDescription.trim()) e.shortDescription = "Short description is required";
        if (!form.description.trim()) e.description = "Description is required";
        setErrors(e);
        return !Object.keys(e).length;
    };

    const handleSave = useCallback(async (publish = false) => {
        if (!validate()) {
            showError("Please fill in all required fields.");
            return;
        }
        setSaving(true);

        const payload = {
            title: form.title.trim(),
            shortDescription: form.shortDescription.trim(),
            description: form.description.trim(),
            category: form.category || "WEB",
            technologies: form.technologies || [],
            featured: Boolean(form.featured),
            status: publish ? "PUBLISHED" : form.status || "DRAFT",
        };

        if (form.slug && form.slug.trim()) {
            payload.slug = slug(form.slug.trim());
        }

        if (form.thumbnail && form.thumbnail.trim()) {
            payload.thumbnail = form.thumbnail.trim();
        }

        if (form.liveDemoUrl && form.liveDemoUrl.trim()) {
            payload.liveDemoUrl = form.liveDemoUrl.trim();
        }

        if (form.githubUrl && form.githubUrl.trim()) {
            payload.githubUrl = form.githubUrl.trim();
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
                await api.patch(`/projects/${id}`, payload);
                if (publish && form.status !== "PUBLISHED") {
                    await api.patch(`/projects/${id}/publish`);
                }
                showSuccess("Project updated successfully");
            } else {
                const { data } = await api.post("/projects", payload);
                const nid = data?.data?.project?._id || data?.data?._id;
                if (publish && nid) {
                    await api.patch(`/projects/${nid}/publish`);
                }
                showSuccess("Project published successfully");
            }
            navigate(ROUTES.ADMIN_PROJECTS);
        } catch (err) {
            const backendErrors = err?.response?.data?.errors;
            if (Array.isArray(backendErrors) && backendErrors.length > 0) {
                const errorMsg = backendErrors.map((e) => `${e.field}: ${e.message}`).join(" | ");
                showError(`Validation Error — ${errorMsg}`);
            } else {
                showError(err?.response?.data?.message || err?.message || "Failed to save project");
            }
        } finally {
            setSaving(false);
        }
    }, [form, id, isEdit, navigate]);

    if (loading) return <div className="admin-page"><div className="admin-skeleton admin-skeleton--rect" style={{ width: "100%", height: 400 }} /></div>;

    return (
        <div className="admin-page">
            <PageHeader
                title={isEdit ? "Edit Project" : "New Project"}
                subtitle={isEdit ? `Editing: ${form.title}` : "Create a new project"}
                actions={
                    <>
                        <button className="admin-btn admin-btn--ghost" onClick={() => navigate(ROUTES.ADMIN_PROJECTS)}>
                            <HiArrowLeft size={16} /> Back
                        </button>
                        <button className="admin-btn admin-btn--secondary" onClick={() => handleSave(false)} disabled={saving}>
                            <HiSave size={16} /> Save Draft
                        </button>
                        <button className="admin-btn admin-btn--primary" onClick={() => handleSave(true)} disabled={saving}>
                            <HiEye size={16} /> Publish
                        </button>
                    </>
                }
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "var(--space-6)", alignItems: "start" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
                    <div className="admin-card">
                        <div className="admin-card__body">
                            <div className="admin-form">
                                <div className="admin-form-group">
                                    <label className="admin-label admin-label--required">Title</label>
                                    <input
                                        className={`admin-input ${errors.title ? "admin-input--error" : ""}`}
                                        value={form.title}
                                        onChange={(e) => {
                                            set("title", e.target.value);
                                            if (!isEdit || form.slug === slug(form.title)) set("slug", slug(e.target.value));
                                        }}
                                        placeholder="Project title"
                                    />
                                    {errors.title && <span className="admin-error-text">{errors.title}</span>}
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label">Slug</label>
                                    <input
                                        className={`admin-input ${errors.slug ? "admin-input--error" : ""}`}
                                        value={form.slug}
                                        onChange={(e) => set("slug", e.target.value)}
                                        placeholder="project-slug"
                                    />
                                    {errors.slug && <span className="admin-error-text">{errors.slug}</span>}
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label admin-label--required">Short Description</label>
                                    <textarea
                                        className={`admin-textarea ${errors.shortDescription ? "admin-textarea--error" : ""}`}
                                        value={form.shortDescription}
                                        onChange={(e) => set("shortDescription", e.target.value)}
                                        rows={3}
                                        maxLength={300}
                                        placeholder="Brief description (max 300 chars)"
                                    />
                                    <span className="admin-help-text">{form.shortDescription.length}/300</span>
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label admin-label--required">Description</label>
                                    <textarea
                                        className={`admin-textarea ${errors.description ? "admin-textarea--error" : ""}`}
                                        value={form.description}
                                        onChange={(e) => set("description", e.target.value)}
                                        rows={10}
                                        style={{ minHeight: 200 }}
                                        placeholder="Full project description..."
                                    />
                                </div>
                                <div className="admin-form-grid">
                                    <div className="admin-form-group">
                                        <label className="admin-label">Live Demo URL</label>
                                        <input
                                            className="admin-input"
                                            value={form.liveDemoUrl}
                                            onChange={(e) => set("liveDemoUrl", e.target.value)}
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">GitHub URL</label>
                                        <input
                                            className="admin-input"
                                            value={form.githubUrl}
                                            onChange={(e) => set("githubUrl", e.target.value)}
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
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
                                    <input className="admin-input" value={form.seo.metaTitle} onChange={(e) => setSeo("metaTitle", e.target.value)} />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label">Meta Description</label>
                                    <textarea className="admin-textarea" value={form.seo.metaDescription} onChange={(e) => setSeo("metaDescription", e.target.value)} rows={3} />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label">Keywords</label>
                                    <div className="admin-chips">
                                        {form.seo.keywords.map((k) => (
                                            <span key={k} className="admin-chip">
                                                {k}
                                                <button className="admin-chip__remove" onClick={() => setSeo("keywords", form.seo.keywords.filter((x) => x !== k))}>×</button>
                                            </span>
                                        ))}
                                        <input
                                            className="admin-chips__input"
                                            value={kwInput}
                                            onChange={(e) => setKwInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && kwInput.trim()) {
                                                    e.preventDefault();
                                                    if (!form.seo.keywords.includes(kwInput.trim())) setSeo("keywords", [...form.seo.keywords, kwInput.trim()]);
                                                    setKwInput("");
                                                }
                                            }}
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
                    <div className="admin-card">
                        <div className="admin-card__header">
                            <h3 className="admin-card__title">Settings</h3>
                        </div>
                        <div className="admin-card__body">
                            <div className="admin-form">
                                <div className="admin-form-group">
                                    <label className="admin-label">Category</label>
                                    <select className="admin-select" value={form.category} onChange={(e) => set("category", e.target.value)}>
                                        {PROJECT_CATEGORIES.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label">Status</label>
                                    <select className="admin-select" value={form.status} onChange={(e) => set("status", e.target.value)}>
                                        <option value="DRAFT">Draft</option>
                                        <option value="PUBLISHED">Published</option>
                                        <option value="ARCHIVED">Archived</option>
                                    </select>
                                </div>
                                <div className="admin-form-group" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <label className="admin-label" style={{ marginBottom: 0 }}>Featured</label>
                                    <label className="admin-toggle">
                                        <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
                                        <span className="admin-toggle__slider" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="admin-card">
                        <div className="admin-card__header">
                            <h3 className="admin-card__title">Thumbnail</h3>
                        </div>
                        <div className="admin-card__body">
                            <ImageUploader value={form.thumbnail} onChange={(img) => set("thumbnail", img.url)} folder="projects" />
                        </div>
                    </div>

                    <div className="admin-card">
                        <div className="admin-card__header">
                            <h3 className="admin-card__title">Technologies</h3>
                        </div>
                        <div className="admin-card__body">
                            <div className="admin-chips">
                                {form.technologies.map((t) => (
                                    <span key={t} className="admin-chip">
                                        {t}
                                        <button className="admin-chip__remove" onClick={() => set("technologies", form.technologies.filter((x) => x !== t))}>×</button>
                                    </span>
                                ))}
                                <input
                                    className="admin-chips__input"
                                    value={techInput}
                                    onChange={(e) => setTechInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && techInput.trim()) {
                                            e.preventDefault();
                                            if (!form.technologies.includes(techInput.trim())) set("technologies", [...form.technologies, techInput.trim()]);
                                            setTechInput("");
                                        }
                                    }}
                                    placeholder="Add tech + Enter"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`@media (max-width: 900px) { .admin-page > div:last-of-type { grid-template-columns: 1fr !important; } }`}</style>
        </div>
    );
};

export default ProjectEditor;
