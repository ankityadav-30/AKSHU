// APP/client/src/components/about/ProductProcess.jsx

import { motion } from "framer-motion";
import "./ProductProcess.css";

const PROCESS_STAGES = [
    { num: "01", title: "Discover", desc: "Understand the problem, target audience, technical constraints, and product opportunities." },
    { num: "02", title: "Define", desc: "Turn ideas into clear technical requirements, priorities, architectural blueprints, and MVP roadmaps." },
    { num: "03", title: "Design", desc: "Shape the user experience, design systems, visual hierarchy, and interactive prototypes." },
    { num: "04", title: "Engineer", desc: "Build maintainable frontend, robust backend APIs, database schemas, and cloud infrastructure." },
    { num: "05", title: "Validate", desc: "Test functionality, performance, cross-browser compatibility, security compliance, and responsiveness." },
    { num: "06", title: "Launch & Evolve", desc: "Deploy to cloud environments, monitor real usage analytics, and iterate continuously." },
];

const ProductProcess = () => {
    return (
        <section className="product-process section-lg">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        OUR PROCESS
                    </div>
                    <h2 className="section-title">
                        How ideas become <span className="text-gradient">products</span>.
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        A systematic 6-stage lifecycle engineered for predictability and quality execution.
                    </p>
                </div>

                <div className="process-grid">
                    {PROCESS_STAGES.map((stage, i) => (
                        <motion.div
                            key={stage.num}
                            className="process-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <span className="process-card__num">{stage.num}</span>
                            <h3 className="process-card__title">{stage.title}</h3>
                            <p className="process-card__desc">{stage.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductProcess;
