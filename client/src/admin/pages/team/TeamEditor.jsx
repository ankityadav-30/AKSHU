// APP/client/src/admin/pages/team/TeamEditor.jsx

import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    HiArrowLeft,
    HiSave,
    HiUser,
    HiBriefcase,
    HiCode,
    HiShare,
    HiAdjustments,
    HiPhotograph,
    HiPlus,
    HiTrash,
} from "react-icons/hi";
import { FaAward } from "react-icons/fa";
import api from "../../../services/api.js";
import { ROUTES } from "../../../utils/constants.js";
import PageHeader from "../../components/PageHeader.jsx";
import ImageUploader from "../../components/ImageUploader.jsx";
import TeamCard from "../../../components/team/TeamCard.jsx";
import { showSuccess, showError } from "../../components/Toast.jsx";

const EMPTY = {
    firstName: "",
    lastName: "",
    displayName: "",
    slug: "",
    email: "",
    phone: "",
    designation: "",
    department: "Engineering",
    location: "",
    bio: "",
    detailedBio: "",
    profileImage: "",
    coverImage: "",
    specialization: "",
    education: "",
    experience: 0,
    projectsCompleted: 0,
    happyClients: 0,
    skills: [],
    techStack: [],
    certifications: [],
    achievements: [],
    socialLinks: {
        linkedin: "",
        github: "",
        portfolio: "",
        twitter: "",
        instagram: "",
        behance: "",
        dribbble: "",
        website: "",
    },
    cardSize: "medium",
    featured: false,
    displayPriority: 0,
    displayOrder: 0,
    showBio: true,
    showSkills: true,
    showSocialLinks: true,
};

const TABS = [
    { id: "general", label: "General", icon: HiUser },
    { id: "professional", label: "Professional", icon: HiBriefcase },
    { id: "skills", label: "Skills & Tech", icon: HiCode },
    { id: "achievements", label: "Achievements", icon: FaAward },
    { id: "socials", label: "Social Links", icon: HiShare },
    { id: "display", label: "Display Settings", icon: HiAdjustments },
    { id: "photos", label: "Photos", icon: HiPhotograph },
];

const TeamEditor = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [form, setForm] = useState(EMPTY);
    const [activeTab, setActiveTab] = useState("general");
    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    // Chips inputs
    const [skillInput, setSkillInput] = useState("");
    const [techInput, setTechInput] = useState("");
    const [certInput, setCertInput] = useState("");

    // Achievement draft input
    const [achForm, setAchForm] = useState({ title: "", organization: "", year: "", description: "" });

    useEffect(() => {
        if (!isEdit) return;
        (async () => {
            try {
                const { data } = await api.get(`/team/${id}`);
                const m = data?.data?.member || data?.data || {};
                setForm({
                    firstName: m.firstName || "",
                    lastName: m.lastName || "",
                    displayName: m.displayName || "",
                    slug: m.slug || "",
                    email: m.email || "",
                    phone: m.phone || "",
                    designation: m.designation || "",
                    department: m.department || "Engineering",
                    location: m.location || "",
                    bio: m.bio || "",
                    detailedBio: m.detailedBio || "",
                    profileImage: m.profileImage || "",
                    coverImage: m.coverImage || "",
                    specialization: m.specialization || "",
                    education: m.education || "",
                    experience: m.experience || 0,
                    projectsCompleted: m.projectsCompleted || 0,
                    happyClients: m.happyClients || 0,
                    skills: m.skills || [],
                    techStack: m.techStack || [],
                    certifications: m.certifications || [],
                    achievements: m.achievements || [],
                    socialLinks: {
                        linkedin: m.socialLinks?.linkedin || "",
                        github: m.socialLinks?.github || "",
                        portfolio: m.socialLinks?.portfolio || "",
                        twitter: m.socialLinks?.twitter || "",
                        instagram: m.socialLinks?.instagram || "",
                        behance: m.socialLinks?.behance || "",
                        dribbble: m.socialLinks?.dribbble || "",
                        website: m.socialLinks?.website || "",
                    },
                    cardSize: m.cardSize || "medium",
                    featured: m.featured || false,
                    displayPriority: m.displayPriority ?? 0,
                    displayOrder: m.displayOrder ?? 0,
                    showBio: m.showBio !== false,
                    showSkills: m.showSkills !== false,
                    showSocialLinks: m.showSocialLinks !== false,
                });
            } catch (err) {
                showError(err?.message || "Failed to load member");
                navigate(ROUTES.ADMIN_TEAM);
            } finally {
                setLoading(false);
            }
        })();
    }, [id, isEdit, navigate]);

    const set = (k, v) => {
        setForm((p) => ({ ...p, [k]: v }));
        if (errors[k]) setErrors((p) => ({ ...p, [k]: "" }));
    };

    const setSocial = (k, v) => setForm((p) => ({ ...p, socialLinks: { ...p.socialLinks, [k]: v } }));

    const addAchievement = () => {
        if (!achForm.title.trim()) return;
        setForm((p) => ({ ...p, achievements: [...p.achievements, { ...achForm }] }));
        setAchForm({ title: "", organization: "", year: "", description: "" });
    };

    const removeAchievement = (idx) => {
        setForm((p) => ({ ...p, achievements: p.achievements.filter((_, i) => i !== idx) }));
    };

    const validate = () => {
        const e = {};
        if (!form.firstName.trim()) e.firstName = "Required";
        if (!form.email.trim()) e.email = "Required";
        if (!form.designation.trim()) e.designation = "Required";
        setErrors(e);
        return !Object.keys(e).length;
    };

    const handleSave = useCallback(async () => {
        if (!validate()) {
            showError("Please complete all required fields");
            setActiveTab("general");
            return;
        }
        setSaving(true);
        try {
            if (isEdit) {
                await api.patch(`/team/${id}`, form);
                showSuccess("Member profile updated");
            } else {
                await api.post("/team", form);
                showSuccess("Member profile created");
            }
            navigate(ROUTES.ADMIN_TEAM);
        } catch (err) {
            showError(err?.message || "Failed to save member profile");
        } finally {
            setSaving(false);
        }
    }, [form, id, isEdit, navigate]);

    if (loading) return <div className="admin-page"><div className="admin-skeleton admin-skeleton--rect" style={{ width: "100%", height: 400 }} /></div>;

    return (
        <div className="admin-page">
            <PageHeader
                title={isEdit ? "Edit Team Member Profile" : "Create Team Member Profile"}
                subtitle={isEdit ? `Editing: ${form.firstName} ${form.lastName}` : "Add a comprehensive professional profile"}
                actions={
                    <>
                        <button className="admin-btn admin-btn--ghost" onClick={() => navigate(ROUTES.ADMIN_TEAM)}>
                            <HiArrowLeft size={16} /> Back
                        </button>
                        <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>
                            <HiSave size={16} /> {saving ? "Saving..." : "Save Profile"}
                        </button>
                    </>
                }
            />

            {/* Tab Navigation */}
            <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--color-border)", marginBottom: "var(--space-6)", overflowX: "auto", paddingBottom: "4px" }}>
                {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "10px 18px",
                                border: "none",
                                borderBottom: isActive ? "2px solid var(--color-primary)" : "2px solid transparent",
                                background: isActive ? "rgba(99, 102, 241, 0.08)" : "transparent",
                                color: isActive ? "var(--color-primary-light)" : "var(--color-text-secondary)",
                                fontSize: "0.875rem",
                                fontWeight: isActive ? 600 : 500,
                                cursor: "pointer",
                                borderRadius: "8px 8px 0 0",
                                transition: "all 0.2s ease",
                                whiteSpace: "nowrap",
                            }}
                        >
                            <Icon size={16} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "var(--space-6)", alignItems: "start" }}>
                {/* Main Tab Panels */}
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>

                    {/* 1. General Tab */}
                    {activeTab === "general" && (
                        <div className="admin-card">
                            <div className="admin-card__header">
                                <h3 className="admin-card__title">General Information</h3>
                            </div>
                            <div className="admin-card__body">
                                <div className="admin-form">
                                    <div className="admin-form-grid">
                                        <div className="admin-form-group">
                                            <label className="admin-label admin-label--required">First Name</label>
                                            <input className={`admin-input ${errors.firstName ? "admin-input--error" : ""}`} value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
                                            {errors.firstName && <span className="admin-error-text">{errors.firstName}</span>}
                                        </div>
                                        <div className="admin-form-group">
                                            <label className="admin-label">Last Name</label>
                                            <input className="admin-input" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="admin-form-grid">
                                        <div className="admin-form-group">
                                            <label className="admin-label">Display Name (Public override)</label>
                                            <input className="admin-input" value={form.displayName} onChange={(e) => set("displayName", e.target.value)} placeholder="e.g. Ankit Yadav" />
                                        </div>
                                        <div className="admin-form-group">
                                            <label className="admin-label">Custom Slug URL</label>
                                            <input className="admin-input" value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="e.g. ankit-yadav" />
                                        </div>
                                    </div>
                                    <div className="admin-form-grid">
                                        <div className="admin-form-group">
                                            <label className="admin-label admin-label--required">Email</label>
                                            <input className={`admin-input ${errors.email ? "admin-input--error" : ""}`} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                                            {errors.email && <span className="admin-error-text">{errors.email}</span>}
                                        </div>
                                        <div className="admin-form-group">
                                            <label className="admin-label">Phone</label>
                                            <input className="admin-input" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="admin-form-grid">
                                        <div className="admin-form-group">
                                            <label className="admin-label admin-label--required">Designation / Role</label>
                                            <input className={`admin-input ${errors.designation ? "admin-input--error" : ""}`} value={form.designation} onChange={(e) => set("designation", e.target.value)} placeholder="e.g. Founder & Full Stack Dev" />
                                            {errors.designation && <span className="admin-error-text">{errors.designation}</span>}
                                        </div>
                                        <div className="admin-form-group">
                                            <label className="admin-label">Department</label>
                                            <input className="admin-input" value={form.department} onChange={(e) => set("department", e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Location</label>
                                        <input className="admin-input" value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. New Delhi, India" />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Short Bio (Card summary)</label>
                                        <textarea className="admin-textarea" value={form.bio} onChange={(e) => set("bio", e.target.value)} rows={3} placeholder="Brief 2-3 line card summary..." />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Detailed Bio (Full Profile narrative)</label>
                                        <textarea className="admin-textarea" value={form.detailedBio} onChange={(e) => set("detailedBio", e.target.value)} rows={6} placeholder="Extended professional biography..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. Professional Tab */}
                    {activeTab === "professional" && (
                        <div className="admin-card">
                            <div className="admin-card__header">
                                <h3 className="admin-card__title">Professional Details & Metrics</h3>
                            </div>
                            <div className="admin-card__body">
                                <div className="admin-form">
                                    <div className="admin-form-grid">
                                        <div className="admin-form-group">
                                            <label className="admin-label">Experience (Years)</label>
                                            <input className="admin-input" type="number" min={0} value={form.experience} onChange={(e) => set("experience", parseInt(e.target.value) || 0)} />
                                        </div>
                                        <div className="admin-form-group">
                                            <label className="admin-label">Projects Completed</label>
                                            <input className="admin-input" type="number" min={0} value={form.projectsCompleted} onChange={(e) => set("projectsCompleted", parseInt(e.target.value) || 0)} />
                                        </div>
                                    </div>
                                    <div className="admin-form-grid">
                                        <div className="admin-form-group">
                                            <label className="admin-label">Happy Clients</label>
                                            <input className="admin-input" type="number" min={0} value={form.happyClients} onChange={(e) => set("happyClients", parseInt(e.target.value) || 0)} />
                                        </div>
                                        <div className="admin-form-group">
                                            <label className="admin-label">Specialization</label>
                                            <input className="admin-input" value={form.specialization} onChange={(e) => set("specialization", e.target.value)} placeholder="e.g. Cloud Infrastructure & Web Architecture" />
                                        </div>
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Education</label>
                                        <input className="admin-input" value={form.education} onChange={(e) => set("education", e.target.value)} placeholder="e.g. B.Tech Computer Science" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. Skills & Tech Tab */}
                    {activeTab === "skills" && (
                        <div className="admin-card">
                            <div className="admin-card__header">
                                <h3 className="admin-card__title">Skills, Tech Stack & Certifications</h3>
                            </div>
                            <div className="admin-card__body">
                                <div className="admin-form">
                                    {/* Core Skills */}
                                    <div className="admin-form-group">
                                        <label className="admin-label">Core Skills (Shown on Card & Profile)</label>
                                        <div className="admin-chips">
                                            {form.skills.map((s) => (
                                                <span key={s} className="admin-chip">
                                                    {s}
                                                    <button className="admin-chip__remove" onClick={() => set("skills", form.skills.filter((x) => x !== s))}>×</button>
                                                </span>
                                            ))}
                                            <input
                                                className="admin-chips__input"
                                                value={skillInput}
                                                onChange={(e) => setSkillInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" && skillInput.trim()) {
                                                        e.preventDefault();
                                                        if (!form.skills.includes(skillInput.trim())) set("skills", [...form.skills, skillInput.trim()]);
                                                        setSkillInput("");
                                                    }
                                                }}
                                                placeholder="Add skill + Enter"
                                            />
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="admin-form-group">
                                        <label className="admin-label">Technology Stack (Frameworks, Languages, Tools)</label>
                                        <div className="admin-chips">
                                            {form.techStack.map((t) => (
                                                <span key={t} className="admin-chip" style={{ background: "rgba(6, 182, 212, 0.1)", borderColor: "rgba(6, 182, 212, 0.2)", color: "var(--color-accent)" }}>
                                                    {t}
                                                    <button className="admin-chip__remove" onClick={() => set("techStack", form.techStack.filter((x) => x !== t))}>×</button>
                                                </span>
                                            ))}
                                            <input
                                                className="admin-chips__input"
                                                value={techInput}
                                                onChange={(e) => setTechInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" && techInput.trim()) {
                                                        e.preventDefault();
                                                        if (!form.techStack.includes(techInput.trim())) set("techStack", [...form.techStack, techInput.trim()]);
                                                        setTechInput("");
                                                    }
                                                }}
                                                placeholder="Add technology + Enter"
                                            />
                                        </div>
                                    </div>

                                    {/* Certifications */}
                                    <div className="admin-form-group">
                                        <label className="admin-label">Certifications</label>
                                        <div className="admin-chips">
                                            {form.certifications.map((c) => (
                                                <span key={c} className="admin-chip">
                                                    {c}
                                                    <button className="admin-chip__remove" onClick={() => set("certifications", form.certifications.filter((x) => x !== c))}>×</button>
                                                </span>
                                            ))}
                                            <input
                                                className="admin-chips__input"
                                                value={certInput}
                                                onChange={(e) => setCertInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" && certInput.trim()) {
                                                        e.preventDefault();
                                                        if (!form.certifications.includes(certInput.trim())) set("certifications", [...form.certifications, certInput.trim()]);
                                                        setCertInput("");
                                                    }
                                                }}
                                                placeholder="Add certification + Enter"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4. Achievements Tab */}
                    {activeTab === "achievements" && (
                        <div className="admin-card">
                            <div className="admin-card__header">
                                <h3 className="admin-card__title">Achievements & Recognition</h3>
                            </div>
                            <div className="admin-card__body">
                                <div className="admin-form">
                                    {/* Add New Achievement */}
                                    <div style={{ background: "var(--color-bg-body)", padding: "16px", borderRadius: "12px", border: "1px solid var(--color-border)", marginBottom: "20px" }}>
                                        <h4 style={{ margin: "0 0 12px", fontSize: "0.95rem" }}>Add Achievement / Award</h4>
                                        <div className="admin-form-grid">
                                            <input className="admin-input" placeholder="Title (e.g. 1st Place Hackathon)" value={achForm.title} onChange={(e) => setAchForm((p) => ({ ...p, title: e.target.value }))} />
                                            <input className="admin-input" placeholder="Organization / Issuer" value={achForm.organization} onChange={(e) => setAchForm((p) => ({ ...p, organization: e.target.value }))} />
                                        </div>
                                        <div className="admin-form-grid" style={{ marginTop: "12px" }}>
                                            <input className="admin-input" placeholder="Year (e.g. 2025)" value={achForm.year} onChange={(e) => setAchForm((p) => ({ ...p, year: e.target.value }))} />
                                            <input className="admin-input" placeholder="Brief Description" value={achForm.description} onChange={(e) => setAchForm((p) => ({ ...p, description: e.target.value }))} />
                                        </div>
                                        <button type="button" className="admin-btn admin-btn--ghost admin-btn--sm" onClick={addAchievement} style={{ marginTop: "12px" }}>
                                            <HiPlus size={14} /> Add Achievement
                                        </button>
                                    </div>

                                    {/* Achievements List */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                        {form.achievements.map((ach, idx) => (
                                            <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "var(--color-bg-surface)", border: "1px solid var(--color-border)", borderRadius: "8px" }}>
                                                <div>
                                                    <div style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>{ach.title} ({ach.year || "N/A"})</div>
                                                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-tertiary)" }}>{ach.organization}</div>
                                                </div>
                                                <button type="button" className="admin-btn admin-btn--ghost admin-btn--icon admin-btn--sm" onClick={() => removeAchievement(idx)} style={{ color: "var(--color-danger)" }}>
                                                    <HiTrash size={15} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 5. Social Links Tab */}
                    {activeTab === "socials" && (
                        <div className="admin-card">
                            <div className="admin-card__header">
                                <h3 className="admin-card__title">Social & Web Links</h3>
                            </div>
                            <div className="admin-card__body">
                                <div className="admin-form">
                                    <div className="admin-form-grid">
                                        <div className="admin-form-group"><label className="admin-label">LinkedIn</label><input className="admin-input" value={form.socialLinks.linkedin} onChange={(e) => setSocial("linkedin", e.target.value)} placeholder="https://linkedin.com/in/..." /></div>
                                        <div className="admin-form-group"><label className="admin-label">GitHub</label><input className="admin-input" value={form.socialLinks.github} onChange={(e) => setSocial("github", e.target.value)} placeholder="https://github.com/..." /></div>
                                    </div>
                                    <div className="admin-form-grid">
                                        <div className="admin-form-group"><label className="admin-label">Twitter / X</label><input className="admin-input" value={form.socialLinks.twitter} onChange={(e) => setSocial("twitter", e.target.value)} placeholder="https://twitter.com/..." /></div>
                                        <div className="admin-form-group"><label className="admin-label">Portfolio Website</label><input className="admin-input" value={form.socialLinks.portfolio} onChange={(e) => setSocial("portfolio", e.target.value)} placeholder="https://..." /></div>
                                    </div>
                                    <div className="admin-form-grid">
                                        <div className="admin-form-group"><label className="admin-label">Instagram</label><input className="admin-input" value={form.socialLinks.instagram} onChange={(e) => setSocial("instagram", e.target.value)} placeholder="https://instagram.com/..." /></div>
                                        <div className="admin-form-group"><label className="admin-label">Behance</label><input className="admin-input" value={form.socialLinks.behance} onChange={(e) => setSocial("behance", e.target.value)} placeholder="https://behance.net/..." /></div>
                                    </div>
                                    <div className="admin-form-grid">
                                        <div className="admin-form-group"><label className="admin-label">Dribbble</label><input className="admin-input" value={form.socialLinks.dribbble} onChange={(e) => setSocial("dribbble", e.target.value)} placeholder="https://dribbble.com/..." /></div>
                                        <div className="admin-form-group"><label className="admin-label">Website</label><input className="admin-input" value={form.socialLinks.website} onChange={(e) => setSocial("website", e.target.value)} placeholder="https://..." /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 6. Display Settings Tab */}
                    {activeTab === "display" && (
                        <div className="admin-card">
                            <div className="admin-card__header">
                                <h3 className="admin-card__title">Display & Visibility Settings</h3>
                            </div>
                            <div className="admin-card__body">
                                <div className="admin-form">
                                    <div className="admin-form-group">
                                        <label className="admin-label">Card Size</label>
                                        <div style={{ display: "flex", gap: "var(--space-5)", marginTop: "4px" }}>
                                            {["small", "medium", "large"].map((size) => (
                                                <label key={size} style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "0.875rem", textTransform: "capitalize" }}>
                                                    <input
                                                        type="radio"
                                                        name="cardSize"
                                                        value={size}
                                                        checked={form.cardSize === size}
                                                        onChange={(e) => set("cardSize", e.target.value)}
                                                    />
                                                    {size}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="admin-form-grid">
                                        <div className="admin-form-group">
                                            <label className="admin-label">Display Priority</label>
                                            <input className="admin-input" type="number" value={form.displayPriority} onChange={(e) => set("displayPriority", parseInt(e.target.value) || 0)} placeholder="0" />
                                        </div>
                                        <div className="admin-form-group">
                                            <label className="admin-label">Display Order</label>
                                            <input className="admin-input" type="number" min={0} value={form.displayOrder} onChange={(e) => set("displayOrder", parseInt(e.target.value) || 0)} placeholder="0" />
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
                                        <div className="admin-form-group" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 0 }}>
                                            <label className="admin-label" style={{ marginBottom: 0 }}>Featured Member</label>
                                            <label className="admin-toggle">
                                                <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
                                                <span className="admin-toggle__slider" />
                                            </label>
                                        </div>
                                        <div className="admin-form-group" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 0 }}>
                                            <label className="admin-label" style={{ marginBottom: 0 }}>Show Bio on Card</label>
                                            <label className="admin-toggle">
                                                <input type="checkbox" checked={form.showBio} onChange={(e) => set("showBio", e.target.checked)} />
                                                <span className="admin-toggle__slider" />
                                            </label>
                                        </div>
                                        <div className="admin-form-group" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 0 }}>
                                            <label className="admin-label" style={{ marginBottom: 0 }}>Show Skills on Card</label>
                                            <label className="admin-toggle">
                                                <input type="checkbox" checked={form.showSkills} onChange={(e) => set("showSkills", e.target.checked)} />
                                                <span className="admin-toggle__slider" />
                                            </label>
                                        </div>
                                        <div className="admin-form-group" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 0 }}>
                                            <label className="admin-label" style={{ marginBottom: 0 }}>Show Social Links</label>
                                            <label className="admin-toggle">
                                                <input type="checkbox" checked={form.showSocialLinks} onChange={(e) => set("showSocialLinks", e.target.checked)} />
                                                <span className="admin-toggle__slider" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 7. Photos Tab */}
                    {activeTab === "photos" && (
                        <div className="admin-card">
                            <div className="admin-card__header">
                                <h3 className="admin-card__title">Profile & Cover Media</h3>
                            </div>
                            <div className="admin-card__body">
                                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                                    <div>
                                        <label className="admin-label" style={{ marginBottom: "8px" }}>Profile Picture</label>
                                        <ImageUploader value={form.profileImage} onChange={(img) => set("profileImage", img.url)} folder="team" />
                                    </div>
                                    <div>
                                        <label className="admin-label" style={{ marginBottom: "8px" }}>Cover Banner Image (Public profile page header)</label>
                                        <ImageUploader value={form.coverImage} onChange={(img) => set("coverImage", img.url)} folder="team-covers" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Sidebar Column: Real-Time Live Card Preview & Quick Media */}
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", position: "sticky", top: "var(--space-6)" }}>
                    <div className="admin-card">
                        <div className="admin-card__header">
                            <h3 className="admin-card__title">Live Card Preview</h3>
                        </div>
                        <div className="admin-card__body" style={{ background: "var(--color-bg-body)", borderRadius: "var(--radius-lg)", padding: "16px" }}>
                            <TeamCard member={form} isPreview={true} />
                        </div>
                    </div>

                    <div className="admin-card">
                        <div className="admin-card__header">
                            <h3 className="admin-card__title">Profile Media Summary</h3>
                        </div>
                        <div className="admin-card__body">
                            <ImageUploader value={form.profileImage} onChange={(img) => set("profileImage", img.url)} folder="team" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamEditor;
