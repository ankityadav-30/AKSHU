// APP/client/src/pages/Contact.jsx

import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    HiMail,
    HiLocationMarker,
    HiPhone,
    HiSparkles,
    HiPaperAirplane,
    HiCheckCircle,
    HiChevronDown,
    HiArrowRight,
    HiUser,
    HiTag,
    HiCurrencyRupee,
    HiChatAlt2,
    HiCheck,
    HiX,
} from "react-icons/hi";
import api from "../services/api.js";
import { ROUTES } from "../utils/constants.js";
import WhatsAppButton from "../components/common/WhatsAppButton.jsx";
import FloatingWhatsApp from "../components/common/FloatingWhatsApp.jsx";
import "./Contact.css";

const SERVICE_OPTIONS = [
    "Web Application",
    "Mobile App",
    "AI & Automation",
    "UI/UX Design",
    "Backend & API",
    "Consultation",
];

const BUDGET_OPTIONS = [
    { label: "< ₹1 Lakh", value: "< ₹1 Lakh" },
    { label: "₹1L – ₹3L", value: "₹1L – ₹3L" },
    { label: "₹3L – ₹5L", value: "₹3L – ₹5L" },
    { label: "₹5L+", value: "₹5L+" },
    { label: "Not Sure Yet", value: "Undecided" },
];

const LEFT_PANEL_STEPS = [
    { num: "01", title: "We review your idea" },
    { num: "02", title: "We clarify the important details" },
    { num: "03", title: "We discuss the best direction" },
    { num: "04", title: "We plan the next step" },
];

const PROCESS_STEPS = [
    { num: "01", title: "YOU TELL US", desc: "Share your idea, technical challenge, or project vision." },
    { num: "02", title: "WE REVIEW IT", desc: "We understand the goals, scope, and technical requirements." },
    { num: "03", title: "WE TALK", desc: "We clarify expectations, timeline, and execution options." },
    { num: "04", title: "WE PLAN", desc: "If we're a good fit, we define the roadmap and start building." },
];

const FAQS = [
    {
        q: "Can I contact AKSHU on WhatsApp?",
        a: "Yes. If you'd prefer a quick conversation, you can start a WhatsApp chat directly from this page. For structured project requirements, our inquiry form is also available.",
    },
    {
        q: "Do I need complete project requirements before contacting you?",
        a: "No. An early idea, rough feature wishlist, or problem statement is completely enough to start the conversation. We can help refine the product direction together.",
    },
    {
        q: "How quickly do you respond?",
        a: "We typically review all inquiries and respond within 24 hours during business days.",
    },
];

const Contact = () => {
    const location = useLocation();
    const [form, setForm] = useState({ name: "", email: "", subject: "", budget: "Undecided", message: "" });
    const [selectedService, setSelectedService] = useState("");
    const [status, setStatus] = useState(null); // null | { type: "success"|"error", text: string }
    const [sending, setSending] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const [estimatorBanner, setEstimatorBanner] = useState(null);

    // Pre-populate form if coming from ProjectEstimator
    useEffect(() => {
        const estimatorData = location.state?.estimatorData;
        if (estimatorData) {
            const { result } = estimatorData;
            setEstimatorBanner(result);
            setSelectedService(result.projectTypeTitle || "");
            setForm((prev) => ({
                ...prev,
                subject: `Project Inquiry: ${result.projectTypeTitle} (${result.formattedRange})`,
                budget: result.formattedRange || "Undecided",
                message: `Hi AKSHU Technologies,\n\nI calculated a preliminary estimate on your website and would like to discuss my project:\n\n• Project Type: ${result.projectTypeTitle}\n• Scope Size: ${result.projectSizeTitle}\n• Design Level: ${result.designLevelTitle}\n• Timeline: ${result.timelineTitle}\n• Estimated Range: ${result.formattedRange}\n\nPlease get in touch to discuss details!\n`,
            }));
        }
    }, [location.state]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSelectService = (service) => {
        setSelectedService(service);
        setForm((prev) => ({
            ...prev,
            subject: `Inquiry: ${service}`,
        }));
    };

    const handleSelectBudget = (val) => {
        setForm((prev) => ({ ...prev, budget: val }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setStatus(null);

        // Include budget context inside message payload if selected
        const fullMessage = form.budget && form.budget !== "Undecided"
            ? `${form.message}\n\n[Expected Budget Range: ${form.budget}]`
            : form.message;

        try {
            await api.post("/contact", {
                name: form.name,
                email: form.email,
                subject: form.subject || (selectedService ? `Inquiry: ${selectedService}` : "General Inquiry"),
                message: fullMessage,
            });
            setStatus({
                type: "success",
                text: "Thank you for reaching out! Your message has been received and we will get back to you within 24 hours.",
            });
            setForm({ name: "", email: "", subject: "", budget: "Undecided", message: "" });
            setSelectedService("");
            setEstimatorBanner(null);
        } catch (err) {
            setStatus({
                type: "error",
                text: err.message || "Failed to send message via form. You can try again or message us on WhatsApp.",
            });
        } finally {
            setSending(false);
        }
    };

    const isValidEmail = form.email.includes("@") && form.email.includes(".");

    return (
        <div className="contact-page">
            {/* 01: Hero Header */}
            <section className="contact-hero">
                <div className="container contact-hero__container">
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        START A CONVERSATION
                    </div>
                    <motion.h1
                        className="contact-hero__title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Have an idea? <br />
                        <span className="text-gradient">Let&apos;s make it real.</span>
                    </motion.h1>
                    <motion.p
                        className="contact-hero__subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Tell us what you&apos;re thinking about building. Whether it&apos;s an early idea, an existing product, or a technical challenge, give us some context and we&apos;ll take it from there.
                    </motion.p>
                    <span className="contact-hero__trust">
                        No technical specification required. Just tell us what you&apos;re trying to build.
                    </span>
                </div>
            </section>

            {/* 02: Main Workspace (Form + Context + WhatsApp alternative) */}
            <section className="section-lg" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="contact-workspace">
                        {/* Left Info Panel */}
                        <div className="contact-workspace__info">
                            <div className="contact-info-card">
                                <h3>Let&apos;s talk about <br />what you&apos;re building.</h3>
                                <p className="contact-info-card__desc">
                                    Whether you have a complete plan or just an early idea, tell us what you&apos;re trying to create. Choose whichever communication channel works best for you.
                                </p>

                                <div className="contact-direct-list">
                                    <div className="contact-direct-item">
                                        <div className="contact-direct-item__icon"><HiMail /></div>
                                        <div>
                                            <span className="contact-direct-item__label">EMAIL US DIRECTLY</span>
                                            <a href="mailto:info@akshutechnologies.com" className="contact-direct-item__val">
                                                info@akshutechnologies.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="contact-direct-item">
                                        <div className="contact-direct-item__icon" style={{ color: "#25D366" }}><HiPhone /></div>
                                        <div>
                                            <span className="contact-direct-item__label">WHATSAPP</span>
                                            <WhatsAppButton variant="outline" size="sm">
                                                Chat with us →
                                            </WhatsAppButton>
                                        </div>
                                    </div>
                                    <div className="contact-direct-item">
                                        <div className="contact-direct-item__icon"><HiLocationMarker /></div>
                                        <div>
                                            <span className="contact-direct-item__label">LOCATION</span>
                                            <span className="contact-direct-item__val">India · Working globally</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Left Panel Trust Section: What Happens Next */}
                                <div className="contact-left-trust">
                                    <h4 className="contact-left-trust__title">WHAT HAPPENS NEXT</h4>
                                    <div className="contact-left-trust__grid">
                                        {LEFT_PANEL_STEPS.map((step) => (
                                            <div key={step.num} className="contact-left-trust__item">
                                                <span className="contact-left-trust__num">{step.num}</span>
                                                <span className="contact-left-trust__text">{step.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Estimator Data Banner if coming from Estimator */}
                            {estimatorBanner && (
                                <motion.div
                                    className="contact-estimator-banner"
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <div className="contact-estimator-banner__header">
                                        <HiSparkles />
                                        <span>ESTIMATOR CONTEXT ATTACHED</span>
                                        <button
                                            type="button"
                                            className="contact-estimator-banner__close"
                                            onClick={() => setEstimatorBanner(null)}
                                            aria-label="Remove estimate context"
                                        >
                                            <HiX />
                                        </button>
                                    </div>
                                    <p className="contact-estimator-banner__text">
                                        Estimate attached: <strong>{estimatorBanner.projectTypeTitle}</strong> ({estimatorBanner.formattedRange}). Parameters have been pre-filled below.
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        {/* Right Panel: Enhanced Contact Form */}
                        <div className="contact-workspace__form-card">
                            <div className="contact-form-header">
                                <span className="contact-form-eyebrow">SEND A MESSAGE</span>
                                <h2 className="contact-form-title">Tell us a little about what you&apos;re building.</h2>
                                <p className="contact-form-subtitle">
                                    You don&apos;t need a complete technical specification. A rough idea is enough to start the conversation.
                                </p>
                            </div>

                            {status?.type === "success" ? (
                                <div className="contact-form-success">
                                    <HiCheckCircle className="contact-form-success__icon" />
                                    <h3>Message Received!</h3>
                                    <p>{status.text}</p>
                                    <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "center", marginTop: "var(--space-6)", flexWrap: "wrap" }}>
                                        <button
                                            type="button"
                                            className="btn btn--outline"
                                            onClick={() => setStatus(null)}
                                        >
                                            Send Another Message
                                        </button>
                                        <Link to={ROUTES.PROJECTS} className="btn btn--primary">
                                            Explore Our Projects →
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <form className="contact-form-body" onSubmit={handleSubmit}>
                                    {status?.type === "error" && (
                                        <div className="contact-form-error">
                                            <p>{status.text}</p>
                                            <WhatsAppButton variant="secondary" size="sm" style={{ marginTop: "var(--space-2)" }}>
                                                Or chat with us on WhatsApp
                                            </WhatsAppButton>
                                        </div>
                                    )}

                                    {/* Service Category Selectors */}
                                    <div className="form-group">
                                        <label className="form-label-with-icon">
                                            <HiTag className="form-label-icon" /> What are you looking to build?
                                        </label>
                                        <div className="contact-service-pills">
                                            {SERVICE_OPTIONS.map((srv) => {
                                                const isSelected = selectedService === srv;
                                                return (
                                                    <button
                                                        key={srv}
                                                        type="button"
                                                        aria-pressed={isSelected}
                                                        className={`contact-service-pill ${isSelected ? "contact-service-pill--active" : ""}`}
                                                        onClick={() => handleSelectService(srv)}
                                                    >
                                                        {isSelected && <HiCheck className="pill-check" />}
                                                        <span>{srv}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Name & Email Row */}
                                    <div className="form-row-2">
                                        <div className="form-group">
                                            <label htmlFor="name" className="form-label-with-icon">
                                                <HiUser className="form-label-icon" /> Your Name
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                placeholder="e.g. Alex Morgan"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                className="contact-input"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email" className="form-label-with-icon">
                                                <HiMail className="form-label-icon" /> Email Address
                                                {form.email && isValidEmail && (
                                                    <span className="valid-badge"><HiCheck /> Valid</span>
                                                )}
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="alex@company.com"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                className="contact-input"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject / Project Title */}
                                    <div className="form-group">
                                        <label htmlFor="subject" className="form-label-with-icon">
                                            <HiTag className="form-label-icon" /> Subject / Project Title
                                        </label>
                                        <input
                                            id="subject"
                                            name="subject"
                                            placeholder="e.g. Web Application / Mobile App / Consultation"
                                            value={form.subject}
                                            onChange={handleChange}
                                            required
                                            className="contact-input"
                                        />
                                    </div>

                                    {/* Budget Range Pills */}
                                    <div className="form-group">
                                        <label className="form-label-with-icon">
                                            <HiCurrencyRupee className="form-label-icon" /> Expected Budget Range (Optional)
                                        </label>
                                        <div className="contact-budget-pills">
                                            {BUDGET_OPTIONS.map((opt) => {
                                                const isSelected = form.budget === opt.value;
                                                return (
                                                    <button
                                                        key={opt.value}
                                                        type="button"
                                                        aria-pressed={isSelected}
                                                        className={`contact-budget-pill ${isSelected ? "contact-budget-pill--active" : ""}`}
                                                        onClick={() => handleSelectBudget(opt.value)}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Message & Character Counter */}
                                    <div className="form-group">
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-2)" }}>
                                            <label htmlFor="message" className="form-label-with-icon" style={{ marginBottom: 0 }}>
                                                <HiChatAlt2 className="form-label-icon" /> Tell Us About Your Idea
                                            </label>
                                            <span className="char-counter">
                                                {form.message.length} / 1500
                                            </span>
                                        </div>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            maxLength={1500}
                                            placeholder="What are you trying to build? Share the goals, target audience, important features, technical requirements, or timeline if you already know them."
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            className="contact-input contact-textarea"
                                        />
                                    </div>

                                    <div>
                                        <button type="submit" className="btn btn--primary btn--lg w-full" disabled={sending}>
                                            {sending ? "Sending Message..." : <>Send Inquiry Message <HiPaperAirplane /></>}
                                        </button>
                                        <p className="contact-privacy-note">
                                            Your information is used only to understand and respond to your inquiry.
                                        </p>
                                    </div>

                                    {/* Secondary WhatsApp Alternative */}
                                    <div className="contact-form-divider">
                                        <span>OR PREFER A QUICK CONVERSATION?</span>
                                    </div>

                                    <WhatsAppButton variant="secondary" size="lg" className="w-full">
                                        Chat with us on WhatsApp
                                    </WhatsAppButton>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 03: Dedicated Quick Conversation Section */}
            <section className="contact-whatsapp-section section-lg">
                <div className="container">
                    <motion.div
                        className="contact-whatsapp-card"
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="contact-whatsapp-card__glow" />
                        <div className="contact-whatsapp-card__content">
                            <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                                <span className="section-tag-dot" style={{ background: "#25D366" }} />
                                QUICK CONVERSATION
                            </div>

                            <h2 className="contact-whatsapp-card__title">
                                Sometimes it&apos;s easier <br />
                                <span className="text-gradient">to just talk.</span>
                            </h2>

                            <p className="contact-whatsapp-card__subtitle">
                                Have a quick question, an early-stage idea, or aren&apos;t sure what service you need? Start a direct conversation with AKSHU Technologies on WhatsApp.
                            </p>

                            <WhatsAppButton variant="primary" size="lg">
                                Start WhatsApp Chat ↗
                            </WhatsAppButton>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 04: What Happens Next Timeline */}
            <section className="contact-process-section section-lg">
                <div className="container">
                    <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                        <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                            <span className="section-tag-dot" />
                            WHAT HAPPENS NEXT?
                        </div>
                        <h2 className="section-title">
                            From conversation to <span className="text-gradient">clear roadmap</span>.
                        </h2>
                    </div>

                    <div className="contact-process-grid">
                        {PROCESS_STEPS.map((step, i) => (
                            <motion.div
                                key={step.num}
                                className="contact-process-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <span className="contact-process-card__num">{step.num}</span>
                                <h3 className="contact-process-card__title">{step.title}</h3>
                                <p className="contact-process-card__desc">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 05: FAQ Section */}
            <section className="contact-faq-section section-lg">
                <div className="container" style={{ maxWidth: 840 }}>
                    <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
                        <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                            <span className="section-tag-dot" />
                            COMMON QUESTIONS
                        </div>
                        <h2 className="section-title">
                            Frequently Asked <span className="text-gradient">Questions</span>
                        </h2>
                    </div>

                    <div className="contact-faq-list">
                        {FAQS.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div key={faq.q} className={`contact-faq-item ${isOpen ? "contact-faq-item--open" : ""}`}>
                                    <button
                                        type="button"
                                        className="contact-faq-item__q"
                                        onClick={() => setOpenFaq(isOpen ? null : index)}
                                    >
                                        <span>{faq.q}</span>
                                        <HiChevronDown className="contact-faq-item__chevron" />
                                    </button>
                                    {isOpen && (
                                        <div className="contact-faq-item__a">
                                            <p>{faq.a}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 06: Still Exploring CTA */}
            <section className="section-lg" style={{ paddingTop: 0 }}>
                <div className="container" style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: "var(--font-size-2xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>
                        Still exploring ideas?
                    </h3>
                    <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-4)", flexWrap: "wrap" }}>
                        <Link to={ROUTES.PROJECTS} className="btn btn--outline">
                            Explore Projects <HiArrowRight />
                        </Link>
                        <Link to={ROUTES.SERVICES} className="btn btn--outline">
                            Discover Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Floating Ambient WhatsApp Button (auto hides on contact page to avoid overlap) */}
            <FloatingWhatsApp />
        </div>
    );
};

export default Contact;
