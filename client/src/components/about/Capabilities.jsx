// APP/client/src/components/about/Capabilities.jsx

import { motion } from "framer-motion";
import { HiGlobe, HiDeviceMobile, HiServer, HiLightningBolt, HiColorSwatch, HiCloud } from "react-icons/hi";
import "./Capabilities.css";

const CAPABILITIES = [
    { id: "web", title: "Web Experiences", desc: "High-reactivity frontend platforms built with React 18, Vite, and responsive design.", icon: <HiGlobe size={26} />, accent: "var(--color-primary)" },
    { id: "products", title: "Digital Products", desc: "Full-stack SaaS & enterprise web apps engineered from concept to launch.", icon: <HiDeviceMobile size={26} />, accent: "var(--color-accent)" },
    { id: "backend", title: "Backend Systems", desc: "Scalable Node.js & Express servers with secure architecture and clean databases.", icon: <HiServer size={26} />, accent: "var(--color-secondary)" },
    { id: "apis", title: "APIs & Integrations", desc: "Robust REST & GraphQL endpoints with authentication, validation, and documentation.", icon: <HiLightningBolt size={26} />, accent: "var(--color-accent-blue)" },
    { id: "uiux", title: "UI/UX Systems", desc: "Thoughtful visual design systems, interactive prototypes, and accessible UI.", icon: <HiColorSwatch size={26} />, accent: "var(--color-primary-light)" },
    { id: "cloud", title: "Cloud & Deployment", desc: "CI/CD pipelines, cloud environment hosting, asset CDN, and automated monitoring.", icon: <HiCloud size={26} />, accent: "var(--color-success)" },
];

const Capabilities = () => {
    return (
        <section className="capabilities-section section-lg">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        OUR CAPABILITIES
                    </div>
                    <h2 className="section-title">
                        From idea to <span className="text-gradient">digital product</span>.
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        We combine design, engineering, and modern technology to turn ideas into usable digital experiences.
                    </p>
                </div>

                {/* Constellation Desktop View / Responsive Grid */}
                <div className="constellation-wrapper">
                    <div className="constellation-center">
                        <div className="constellation-center__pulse" />
                        <span className="constellation-center__brand">AKSHU</span>
                    </div>

                    <div className="capabilities-grid">
                        {CAPABILITIES.map((cap, i) => (
                            <motion.div
                                key={cap.id}
                                className="capability-node"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="capability-node__icon" style={{ color: cap.accent }}>
                                    {cap.icon}
                                </div>
                                <h3 className="capability-node__title">{cap.title}</h3>
                                <p className="capability-node__desc">{cap.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Capabilities;
