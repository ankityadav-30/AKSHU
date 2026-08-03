// APP/client/src/components/services/ServiceDetail.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiCheck } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import "./ServiceDetail.css";

const SERVICES_DATA = [
    {
        id: "web-dev",
        num: "01",
        label: "WEB & PRODUCT DEVELOPMENT",
        headline: "Digital experiences engineered to perform.",
        desc: "AKSHU Technologies builds high-performance, responsive web products tailored to business workflows. We turn requirements into fast, scalable frontend & full-stack web applications.",
        capabilities: [
            "Responsive Interfaces",
            "Authentication",
            "Interactive Dashboards",
            "Database Integration",
            "Search & Filtering",
            "Content Management",
            "API Integration",
            "File Uploads",
            "Role-Based Access",
        ],
        idealFor: ["Startups & MVPs", "Growing Businesses", "Internal Workflows", "Customer Portals"],
        ctaText: "Discuss Web Project",
    },
    {
        id: "ui-ux",
        num: "02",
        label: "UI/UX DESIGN",
        headline: "Complex products shouldn't feel complicated.",
        desc: "Thoughtful UI/UX design is not merely decoration—it is the structure that makes software intuitive. We craft accessible interfaces, component design systems, and seamless user flows.",
        capabilities: [
            "Information Architecture",
            "Responsive Interface Design",
            "Interaction Design",
            "Design Systems",
            "Prototyping",
            "User Flow Mapping",
            "Interface Refinement",
        ],
        idealFor: ["New Digital Products", "SaaS Dashboards", "Interface Redesigns", "Mobile Web Apps"],
        ctaText: "Discuss Design Project",
    },
    {
        id: "backend",
        num: "03",
        label: "BACKEND & API ENGINEERING",
        headline: "The systems users don't see matter just as much.",
        desc: "The backend is the engine of your digital product. We engineer secure REST APIs, scalable Node.js server architectures, optimized databases, and robust integration pipelines.",
        capabilities: [
            "REST APIs",
            "Authentication & JWT",
            "Authorization Rules",
            "Role-Based Access",
            "Database Architecture",
            "Business Logic",
            "Email Services",
            "Media CDN Pipelines",
            "Third-Party Integrations",
        ],
        idealFor: ["High-Throughput Apps", "API Integrations", "Secure Data Storage", "Microservice Backends"],
        ctaText: "Discuss API Engineering",
    },
    {
        id: "business-systems",
        num: "04",
        label: "COMMERCE & BUSINESS SYSTEMS",
        headline: "Technology built around how your business actually works.",
        desc: "We build custom business systems, product catalogs, admin management dashboards, and inquiry workflows engineered around real operational needs.",
        capabilities: [
            "Product Catalogs",
            "Order / Inquiry Workflows",
            "Payment Integrations",
            "Admin Control Panels",
            "Inventory Dashboards",
            "Customer Portals",
            "Reporting Tools",
        ],
        idealFor: ["E-commerce Brands", "B2B Platforms", "Custom Admin Needs", "Workflow Automation"],
        ctaText: "Discuss Business System",
    },
    {
        id: "cloud",
        num: "05",
        label: "CLOUD & INTEGRATION",
        headline: "A product isn't finished when the code works.",
        desc: "Reliable software requires proper cloud deployment, environment configuration, database connectivity, and continuous performance monitoring.",
        capabilities: [
            "Production Deployment",
            "Environment Configuration",
            "Media Infrastructure",
            "Database Connectivity",
            "External API Services",
            "Email Deliverability",
            "Production Security",
        ],
        idealFor: ["Cloud Migrations", "Production Setups", "API Connections", "Performance Tuning"],
        ctaText: "Discuss Cloud Setup",
    },
    {
        id: "consulting",
        num: "06",
        label: "TECHNICAL CONSULTING",
        headline: "Not sure what to build—or how to build it?",
        desc: "We help founders, product leads, and business teams clarify early product direction, evaluate technical architecture options, prioritize MVP features, and build executable implementation roadmaps.",
        capabilities: [
            "Idea Clarification",
            "Feature Prioritization",
            "MVP Scope Planning",
            "Technical Direction",
            "Architecture Review",
            "Technology Stack Selection",
            "Implementation Planning",
        ],
        idealFor: ["Early-stage Founders", "Product Strategists", "Non-technical Leaders", "MVP Planning"],
        ctaText: "Talk About Your Idea",
    },
];

const ServiceDetail = () => {
    return (
        <section className="service-details">
            <div className="container">
                {SERVICES_DATA.map((service, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <motion.div
                            key={service.id}
                            id={service.id}
                            className={`service-block ${isEven ? "service-block--normal" : "service-block--reverse"}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            {/* Text Info */}
                            <div className="service-block__info">
                                <div className="service-block__badge">
                                    <span className="service-block__num">{service.num}</span>
                                    <span className="service-block__label">{service.label}</span>
                                </div>

                                <h2 className="service-block__headline">{service.headline}</h2>
                                <p className="service-block__desc">{service.desc}</p>

                                {/* Capabilities Chips */}
                                <div className="service-block__section-title">KEY CAPABILITIES</div>
                                <div className="service-block__caps">
                                    {service.capabilities.map((cap) => (
                                        <span key={cap} className="service-cap-tag">
                                            <HiCheck className="service-cap-icon" /> {cap}
                                        </span>
                                    ))}
                                </div>

                                {/* Ideal For */}
                                <div className="service-block__ideal">
                                    <span className="service-block__ideal-label">IDEAL FOR:</span>
                                    <div className="service-block__ideal-list">
                                        {service.idealFor.map((item) => (
                                            <span key={item} className="service-ideal-chip">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <Link to={ROUTES.CONTACT} className="btn btn--outline service-block__cta">
                                    {service.ctaText} <HiArrowRight />
                                </Link>
                            </div>

                            {/* Conceptual Visual Card */}
                            <div className="service-block__visual">
                                <div className="service-card-mockup">
                                    <div className="mockup-header">
                                        <span className="mockup-dot mockup-dot--red" />
                                        <span className="mockup-dot mockup-dot--yellow" />
                                        <span className="mockup-dot mockup-dot--green" />
                                        <span className="mockup-title">akshu.service // {service.id}</span>
                                    </div>
                                    <div className="mockup-body">
                                        <div className="mockup-line mockup-line--accent" style={{ width: "60%" }} />
                                        <div className="mockup-line" style={{ width: "85%" }} />
                                        <div className="mockup-line" style={{ width: "70%" }} />
                                        <div className="mockup-box-grid">
                                            <div className="mockup-box" />
                                            <div className="mockup-box" />
                                            <div className="mockup-box" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default ServiceDetail;
