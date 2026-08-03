// APP/client/src/components/about/MissionVision.jsx

import { motion } from "framer-motion";
import "./MissionVision.css";

const MissionVision = () => {
    return (
        <section className="mission-vision section-lg">
            <div className="container">
                <div className="mission-vision__grid">
                    {/* Mission Panel */}
                    <motion.div
                        className="mv-panel mv-panel--mission"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="mv-panel__glow" />
                        <span className="mv-panel__watermark">M</span>
                        <div className="mv-panel__content">
                            <span className="mv-panel__tag mv-panel__tag--mission">OUR MISSION</span>
                            <h2 className="mv-panel__heading">
                                Build technology that creates <span className="text-gradient">genuine value</span>.
                            </h2>
                            <p className="mv-panel__copy">
                                Create thoughtful, reliable digital products that solve meaningful problems through strong design and intelligent engineering.
                            </p>
                        </div>
                    </motion.div>

                    {/* Vision Panel */}
                    <motion.div
                        className="mv-panel mv-panel--vision"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="mv-panel__glow" />
                        <span className="mv-panel__watermark">V</span>
                        <div className="mv-panel__content">
                            <span className="mv-panel__tag mv-panel__tag--vision">OUR VISION</span>
                            <h2 className="mv-panel__heading">
                                Build a technology company <span className="text-gradient-cyan">made for the future</span>.
                            </h2>
                            <p className="mv-panel__copy">
                                Grow AKSHU Technologies into a company known for intelligent engineering, thoughtful design, continuous learning, and products that matter.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MissionVision;
