// APP/client/src/components/home/CapabilityStrip.jsx

import { motion } from "framer-motion";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import "./CapabilityStrip.css";

const STAGES = [
    { label: "Strategy", desc: "Product Vision & Roadmap" },
    { label: "Design", desc: "UX Systems & Prototypes" },
    { label: "Engineering", desc: "Scalable Full-Stack Tech" },
    { label: "Launch", desc: "Deployment & QA" },
    { label: "Scale", desc: "Optimization & Growth" },
];

const CapabilityStrip = () => {
    return (
        <section className="capability-strip">
            <div className="container">
                <div className="capability-strip__inner">
                    {STAGES.map((stage, i) => (
                        <div key={stage.label} className="capability-strip__item">
                            <motion.div
                                className="capability-strip__content"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <span className="capability-strip__dot" />
                                <div>
                                    <span className="capability-strip__title">{stage.label}</span>
                                    <span className="capability-strip__sub">{stage.desc}</span>
                                </div>
                            </motion.div>
                            {i < STAGES.length - 1 && (
                                <HiOutlineArrowNarrowRight className="capability-strip__arrow" aria-hidden="true" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CapabilityStrip;
