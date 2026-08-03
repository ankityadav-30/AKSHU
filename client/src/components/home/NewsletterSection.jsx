// APP/client/src/components/home/NewsletterSection.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import { HiMail, HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import api from "../../services/api.js";
import "./NewsletterSection.css";

const NewsletterSection = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState({ state: "idle", message: "" });

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email || !email.includes("@")) {
            setStatus({ state: "error", message: "Please enter a valid email address." });
            return;
        }

        setStatus({ state: "loading", message: "" });

        try {
            const res = await api.post("/newsletter/subscribe", { email });
            setStatus({
                state: "success",
                message: res.data?.message || "Thank you for subscribing! Check your inbox for updates.",
            });
            setEmail("");
        } catch (err) {
            const backendErrors = err?.response?.data?.errors;
            const errMsg = Array.isArray(backendErrors) && backendErrors.length > 0
                ? backendErrors.map((e) => e.message).join(" ")
                : err?.response?.data?.message || err?.message || "Failed to subscribe. Please try again later.";
            setStatus({ state: "error", message: errMsg });
        }
    };

    return (
        <section className="newsletter-section">
            <div className="container">
                <motion.div
                    className="newsletter-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="newsletter-card__content">
                        <h2 className="newsletter-card__title">
                            Stay curious. <span className="text-gradient">Stay ahead</span>.
                        </h2>
                        <p className="newsletter-card__desc">
                            Occasional ideas about technology, design, engineering and what we&apos;re building.
                        </p>
                    </div>

                    <form className="newsletter-card__form" onSubmit={handleSubscribe}>
                        <div className="newsletter-card__input-group">
                            <HiMail className="newsletter-card__mail-icon" />
                            <input
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="newsletter-card__input"
                                aria-label="Email address for newsletter"
                                disabled={status.state === "loading"}
                                required
                            />
                            <button
                                type="submit"
                                className="btn btn--primary newsletter-card__btn"
                                disabled={status.state === "loading"}
                            >
                                {status.state === "loading" ? "Subscribing..." : "Subscribe →"}
                            </button>
                        </div>

                        {status.state === "success" && (
                            <motion.div
                                className="newsletter-card__msg newsletter-card__msg--success"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <HiCheckCircle size={18} /> {status.message}
                            </motion.div>
                        )}

                        {status.state === "error" && (
                            <motion.div
                                className="newsletter-card__msg newsletter-card__msg--error"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <HiExclamationCircle size={18} /> {status.message}
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default NewsletterSection;
