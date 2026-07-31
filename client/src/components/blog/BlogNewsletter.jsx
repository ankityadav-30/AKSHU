// APP/client/src/components/blog/BlogNewsletter.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import { HiMail, HiCheckCircle } from "react-icons/hi";
import api from "../../services/api.js";
import "./BlogNewsletter.css";

const BlogNewsletter = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle | submitting | success | error
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !email.includes("@")) {
            setStatus("error");
            setMessage("Please enter a valid email address.");
            return;
        }

        setStatus("submitting");
        setMessage("");

        api.post("/newsletter/subscribe", { email })
            .then((res) => {
                setStatus("success");
                setMessage(res.data?.message || "You're subscribed! Thank you for joining AKSHU Insights.");
                setEmail("");
            })
            .catch((err) => {
                setStatus("error");
                setMessage(err.message || "Unable to subscribe right now. Please try again.");
            });
    };

    return (
        <section className="blog-newsletter section-lg">
            <div className="container">
                <motion.div
                    className="blog-newsletter__card"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="blog-newsletter__glow" aria-hidden="true" />

                    <div className="blog-newsletter__content">
                        <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                            <HiMail />
                            STAY CURIOUS
                        </div>

                        <h2 className="blog-newsletter__title">
                            Good ideas shouldn&apos;t <br />
                            <span className="text-gradient">get lost in the feed.</span>
                        </h2>

                        <p className="blog-newsletter__subtitle">
                            Get AKSHU Insights in your inbox. Occasional thoughts on engineering, products, design, and what we&apos;re learning while building.
                        </p>

                        {status === "success" ? (
                            <motion.div
                                className="blog-newsletter__success"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <HiCheckCircle className="blog-newsletter__success-icon" />
                                <span>{message}</span>
                            </motion.div>
                        ) : (
                            <form className="blog-newsletter__form" onSubmit={handleSubmit}>
                                <div className="blog-newsletter__input-wrapper">
                                    <input
                                        type="email"
                                        placeholder="enter.your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={status === "submitting"}
                                        className="blog-newsletter__input"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="btn btn--primary blog-newsletter__btn"
                                    >
                                        {status === "submitting" ? "Subscribing..." : "Subscribe →"}
                                    </button>
                                </div>
                                {status === "error" && (
                                    <p className="blog-newsletter__error-msg">{message}</p>
                                )}
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BlogNewsletter;
