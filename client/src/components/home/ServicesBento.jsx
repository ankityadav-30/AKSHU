// APP/client/src/components/home/ServicesBento.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiCode, HiColorSwatch, HiServer, HiCloud, HiDeviceMobile, HiLightBulb, HiArrowNarrowRight } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import "./ServicesBento.css";

const SERVICES_DATA = [
    {
        id: "web-dev",
        tag: "Core Capability",
        title: "Web & Product Development",
        desc: "Full-stack digital products engineered with modern frontend frameworks, high reactivity, responsive interfaces, and enterprise scalability.",
        icon: <HiCode size={28} />,
        accent: "var(--color-primary)",
        gridClass: "bento-card--large",
    },
    {
        id: "ui-ux",
        title: "UI/UX Design",
        desc: "Thoughtfully crafted design systems, interactive user flows, visual identity, and sleek modern aesthetic interfaces.",
        icon: <HiColorSwatch size={26} />,
        accent: "var(--color-accent)",
        gridClass: "bento-card--medium",
    },
    {
        id: "backend",
        title: "Backend & API Engineering",
        desc: "High-throughput RESTful & GraphQL APIs, secure database models, authentication services, and microservice infrastructure.",
        icon: <HiServer size={26} />,
        accent: "var(--color-secondary)",
        gridClass: "bento-card--medium",
    },
    {
        id: "cloud",
        title: "Cloud Solutions",
        desc: "DevOps automation, cloud architecture deployment, serverless pipelines, and multi-region infrastructure management.",
        icon: <HiCloud size={26} />,
        accent: "var(--color-accent-blue)",
        gridClass: "bento-card--small",
    },
    {
        id: "digital-prod",
        title: "Digital Product Strategy",
        desc: "End-to-end product lifecycle planning, MVP prototyping, user journey mapping, and technical feasibility analysis.",
        icon: <HiDeviceMobile size={26} />,
        accent: "var(--color-primary-light)",
        gridClass: "bento-card--small",
    },
    {
        id: "consulting",
        title: "Technical Consulting",
        desc: "Codebase audits, architectural reviews, performance optimization, security compliance, and technology stack guidance.",
        icon: <HiLightBulb size={26} />,
        accent: "var(--color-success)",
        gridClass: "bento-card--small",
    },
];

const ServicesBento = () => {
    return (
        <section className="services-bento section-lg">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        WHAT WE BUILD
                    </div>
                    <h2 className="section-title">
                        Technology designed around <span className="text-gradient">real problems</span>.
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        From initial blueprint to cloud deployment, we build tailored software solutions with precision and care.
                    </p>
                </div>

                {/* Asymmetric Bento Grid */}
                <div className="bento-grid">
                    {SERVICES_DATA.map((service, i) => (
                        <motion.div
                            key={service.id}
                            className={`bento-card ${service.gridClass}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="bento-card__inner">
                                <div className="bento-card__top">
                                    <div className="bento-card__icon" style={{ color: service.accent }}>
                                        {service.icon}
                                    </div>
                                    {service.tag && <span className="bento-card__badge">{service.tag}</span>}
                                </div>
                                <div className="bento-card__body">
                                    <h3 className="bento-card__title">{service.title}</h3>
                                    <p className="bento-card__desc">{service.desc}</p>
                                </div>
                                <div className="bento-card__footer">
                                    <Link to={ROUTES.SERVICES} className="bento-card__link">
                                        Explore Service <HiArrowNarrowRight className="bento-card__arrow" />
                                    </Link>
                                </div>
                            </div>
                            <div className="bento-card__glow" style={{ background: `radial-gradient(circle at top right, ${service.accent} 0%, transparent 60%)` }} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesBento;
