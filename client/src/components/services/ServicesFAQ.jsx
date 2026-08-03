// APP/client/src/components/services/ServicesFAQ.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import "./ServicesFAQ.css";

const FAQS = [
    {
        question: "How much does a project cost?",
        answer: (
            <span>
                Project cost depends on several factors including feature scope, design complexity, third-party integrations, and timeline expectations. To get an indicative non-binding preliminary price range, try our interactive <a href="/#estimator" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>Project Estimate Calculator</a>.
            </span>
        ),
    },
    {
        question: "How long does development take?",
        answer: "Development timelines vary based on scope and technical requirements. A focused MVP or marketing platform might take 4–6 weeks, while a larger SaaS or enterprise web application typically takes 2–3 months. We establish clear milestone roadmaps during initial discovery.",
    },
    {
        question: "Can AKSHU work on an existing project?",
        answer: "Yes. We can perform codebase audits, architectural reviews, UI/UX redesigns, performance optimization, or add new features to existing web applications built with modern JavaScript/Node.js stacks.",
    },
    {
        question: "Do I need to know which technology I need?",
        answer: "Not at all. You bring the problem, goals, and business requirements—we evaluate and recommend the most suitable, reliable technology stack for your product.",
    },
    {
        question: "Can I start with an MVP (Minimum Viable Product)?",
        answer: "Absolutely. We strongly advocate for building focused MVPs first. This allows you to launch quickly, gather real user feedback, and iterate intelligently based on actual data rather than assumptions.",
    },
    {
        question: "Can multiple services be combined?",
        answer: "Yes. Most products require a combination of UI/UX design, full-stack web development, backend APIs, and cloud integration. AKSHU handles the entire stack under one connected process.",
    },
    {
        question: "What information should I provide before contacting AKSHU?",
        answer: "A high-level summary of your product idea, target users, core features, or the business problem you're trying to solve is plenty. We will help structure details during our initial conversation.",
    },
];

const ServicesFAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="services-faq section-lg">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <span className="section-tag-dot" />
                        FREQUENTLY ASKED QUESTIONS
                    </div>
                    <h2 className="section-title">
                        Got <span className="text-gradient">questions</span>? We&apos;ve got answers.
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        Everything you need to know about working with AKSHU Technologies.
                    </p>
                </div>

                <div className="faq-accordion">
                    {FAQS.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={faq.question} className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
                                <button
                                    type="button"
                                    className="faq-item__question"
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={isOpen}
                                >
                                    <span>{faq.question}</span>
                                    <HiChevronDown className="faq-item__icon" />
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            className="faq-item__answer-wrapper"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="faq-item__answer">{faq.answer}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesFAQ;
