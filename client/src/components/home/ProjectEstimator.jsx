// APP/client/src/components/home/ProjectEstimator.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HiArrowRight, HiArrowLeft, HiCheck, HiSparkles, HiRefresh, HiPencilAlt } from "react-icons/hi";
import {
    PROJECT_TYPES,
    PROJECT_SIZES,
    FEATURE_OPTIONS,
    DESIGN_LEVELS,
    TIMELINES,
    calculateEstimateRange,
} from "../../utils/projectEstimator.js";
import { ROUTES } from "../../utils/constants.js";
import WhatsAppButton from "../common/WhatsAppButton.jsx";
import "./ProjectEstimator.css";

const STEP_TITLES = ["01 Project", "02 Scope", "03 Features", "04 Design", "05 Timeline", "06 Estimate"];

const ProjectEstimator = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        projectType: "web-app",
        projectSize: "standard",
        features: ["auth", "dashboard", "database"],
        designLevel: "professional",
        timeline: "normal",
    });

    const handleSelectType = (id) => setSelections({ ...selections, projectType: id });
    const handleSelectSize = (id) => setSelections({ ...selections, projectSize: id });
    const handleSelectDesign = (id) => setSelections({ ...selections, designLevel: id });
    const handleSelectTimeline = (id) => setSelections({ ...selections, timeline: id });

    const handleToggleFeature = (id) => {
        const current = selections.features || [];
        if (current.includes(id)) {
            setSelections({ ...selections, features: current.filter((f) => f !== id) });
        } else {
            setSelections({ ...selections, features: [...current, id] });
        }
    };

    const handleClearFeatures = () => {
        setSelections({ ...selections, features: [] });
    };

    const handleNext = () => setStep((prev) => Math.min(prev + 1, 6));
    const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
    const handleReset = () => {
        setSelections({
            projectType: "web-app",
            projectSize: "standard",
            features: ["auth", "dashboard", "database"],
            designLevel: "professional",
            timeline: "normal",
        });
        setStep(1);
    };

    const estimateResult = calculateEstimateRange(selections);

    const handleDiscussProject = () => {
        navigate(ROUTES.CONTACT, {
            state: {
                estimatorData: {
                    selections,
                    result: estimateResult,
                },
            },
        });
    };

    return (
        <section className="estimator-section section-lg" id="estimator">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
                    <div className="section-tag" style={{ margin: "0 auto var(--space-4)" }}>
                        <HiSparkles />
                        PLAN YOUR PROJECT
                    </div>
                    <h2 className="section-title">
                        What could your idea <span className="text-gradient">take to build</span>?
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        Answer a few quick questions to generate an indicative, non-binding preliminary estimate.
                    </p>
                </div>

                <div className="estimator-card">
                    {/* Stepper Progress Bar */}
                    <div className="estimator-progress">
                        {STEP_TITLES.map((title, idx) => {
                            const stepNum = idx + 1;
                            const isActive = step === stepNum;
                            const isCompleted = step > stepNum;
                            return (
                                <div
                                    key={title}
                                    className={`estimator-progress__step ${
                                        isActive ? "estimator-progress__step--active" : ""
                                    } ${isCompleted ? "estimator-progress__step--completed" : ""}`}
                                    onClick={() => isCompleted && setStep(stepNum)}
                                >
                                    <span className="estimator-progress__circle">
                                        {isCompleted ? <HiCheck /> : stepNum}
                                    </span>
                                    <span className="estimator-progress__label">{title}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Step Contents */}
                    <div className="estimator-body">
                        <AnimatePresence mode="wait">
                            {/* STEP 1: PROJECT TYPE */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="estimator-step"
                                >
                                    <h3 className="estimator-step__question">What are you looking to build?</h3>
                                    <div className="estimator-grid estimator-grid--2">
                                        {PROJECT_TYPES.map((type) => {
                                            const selected = selections.projectType === type.id;
                                            return (
                                                <button
                                                    key={type.id}
                                                    type="button"
                                                    className={`option-card ${selected ? "option-card--selected" : ""}`}
                                                    onClick={() => handleSelectType(type.id)}
                                                >
                                                    <span className="option-card__icon">{type.icon}</span>
                                                    <div className="option-card__content">
                                                        <span className="option-card__title">{type.title}</span>
                                                        <span className="option-card__desc">{type.desc}</span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: PROJECT SIZE */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="estimator-step"
                                >
                                    <h3 className="estimator-step__question">How large is the project scope?</h3>
                                    <div className="estimator-grid estimator-grid--2">
                                        {PROJECT_SIZES.map((size) => {
                                            const selected = selections.projectSize === size.id;
                                            return (
                                                <button
                                                    key={size.id}
                                                    type="button"
                                                    className={`option-card ${selected ? "option-card--selected" : ""}`}
                                                    onClick={() => handleSelectSize(size.id)}
                                                >
                                                    <div className="option-card__content">
                                                        <span className="option-card__title">{size.title}</span>
                                                        <span className="option-card__desc">{size.desc}</span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: FEATURES */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="estimator-step"
                                >
                                    <div className="estimator-step__header-row">
                                        <h3 className="estimator-step__question">What capabilities do you need?</h3>
                                        <button
                                            type="button"
                                            className="btn-text"
                                            onClick={handleClearFeatures}
                                        >
                                            None / Not Sure
                                        </button>
                                    </div>
                                    <div className="estimator-grid estimator-grid--3">
                                        {FEATURE_OPTIONS.map((feat) => {
                                            const selected = selections.features.includes(feat.id);
                                            return (
                                                <button
                                                    key={feat.id}
                                                    type="button"
                                                    className={`chip-card ${selected ? "chip-card--selected" : ""}`}
                                                    onClick={() => handleToggleFeature(feat.id)}
                                                >
                                                    <span className="chip-card__check">
                                                        {selected ? <HiCheck /> : "+"}
                                                    </span>
                                                    <span>{feat.title}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4: DESIGN LEVEL */}
                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="estimator-step"
                                >
                                    <h3 className="estimator-step__question">What level of design do you need?</h3>
                                    <div className="estimator-grid estimator-grid--2">
                                        {DESIGN_LEVELS.map((design) => {
                                            const selected = selections.designLevel === design.id;
                                            return (
                                                <button
                                                    key={design.id}
                                                    type="button"
                                                    className={`option-card ${selected ? "option-card--selected" : ""}`}
                                                    onClick={() => handleSelectDesign(design.id)}
                                                >
                                                    <div className="option-card__content">
                                                        <span className="option-card__title">{design.title}</span>
                                                        <span className="option-card__desc">{design.desc}</span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 5: TIMELINE */}
                            {step === 5 && (
                                <motion.div
                                    key="step5"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="estimator-step"
                                >
                                    <h3 className="estimator-step__question">What is your preferred timeline?</h3>
                                    <div className="estimator-grid estimator-grid--2">
                                        {TIMELINES.map((tl) => {
                                            const selected = selections.timeline === tl.id;
                                            return (
                                                <button
                                                    key={tl.id}
                                                    type="button"
                                                    className={`option-card ${selected ? "option-card--selected" : ""}`}
                                                    onClick={() => handleSelectTimeline(tl.id)}
                                                >
                                                    <div className="option-card__content">
                                                        <span className="option-card__title">{tl.title}</span>
                                                        <span className="option-card__desc">{tl.desc}</span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 6: ESTIMATE RESULT */}
                            {step === 6 && (
                                <motion.div
                                    key="step6"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.4 }}
                                    className="estimator-result"
                                >
                                    <span className="estimator-result__label">YOUR INDICATIVE ESTIMATE RANGE</span>
                                    <div className="estimator-result__price text-gradient">
                                        {estimateResult.formattedRange}
                                    </div>

                                    {/* Breakdown summary */}
                                    <div className="estimator-result__summary">
                                        <div className="summary-item">
                                            <span className="summary-item__key">Project Type:</span>
                                            <span className="summary-item__val">{estimateResult.projectTypeTitle}</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-item__key">Scope Size:</span>
                                            <span className="summary-item__val">{estimateResult.projectSizeTitle}</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-item__key">Selected Features:</span>
                                            <span className="summary-item__val">{estimateResult.featureCount} Features</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-item__key">Design Complexity:</span>
                                            <span className="summary-item__val">{estimateResult.designLevelTitle}</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-item__key">Timeline:</span>
                                            <span className="summary-item__val">{estimateResult.timelineTitle}</span>
                                        </div>
                                    </div>

                                    {/* Disclaimer */}
                                    <p className="estimator-result__disclaimer">
                                        This estimate is preliminary and non-binding. Final pricing will be determined after discussing your exact requirements, scope, integrations, and delivery expectations.
                                    </p>

                                    {/* CTA Actions */}
                                    <div className="estimator-result__actions">
                                        <button
                                            type="button"
                                            className="btn btn--primary btn--lg"
                                            onClick={handleDiscussProject}
                                        >
                                            Discuss This Project <HiArrowRight />
                                        </button>
                                        <WhatsAppButton
                                            contextType="estimator"
                                            message={{ selections, result: estimateResult }}
                                            variant="secondary"
                                            size="lg"
                                        >
                                            Discuss on WhatsApp
                                        </WhatsAppButton>
                                        <div className="estimator-result__secondary-btns">
                                            <button
                                                type="button"
                                                className="btn btn--outline"
                                                onClick={() => setStep(1)}
                                            >
                                                <HiPencilAlt /> Edit Selections
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn--outline"
                                                onClick={handleReset}
                                            >
                                                <HiRefresh /> Start Over
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Step Navigation Controls (Steps 1–5) */}
                    {step < 6 && (
                        <div className="estimator-controls">
                            {step > 1 ? (
                                <button type="button" className="btn btn--outline" onClick={handleBack}>
                                    <HiArrowLeft /> Back
                                </button>
                            ) : (
                                <div />
                            )}
                            <button type="button" className="btn btn--primary" onClick={handleNext}>
                                {step === 5 ? "Calculate Estimate →" : "Continue →"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProjectEstimator;
