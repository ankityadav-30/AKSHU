// APP/client/src/pages/Home.jsx

import Hero from "../components/home/Hero.jsx";
import CapabilityStrip from "../components/home/CapabilityStrip.jsx";
import AboutPreview from "../components/home/AboutPreview.jsx";
import ServicesBento from "../components/home/ServicesBento.jsx";
import FeaturedProjects from "../components/home/FeaturedProjects.jsx";
import TechEcosystem from "../components/home/TechEcosystem.jsx";
import ProcessTimeline from "../components/home/ProcessTimeline.jsx";
import ProjectEstimator from "../components/home/ProjectEstimator.jsx";
import TeamPreview from "../components/home/TeamPreview.jsx";
import BlogInsights from "../components/home/BlogInsights.jsx";
import CTASection from "../components/home/CTASection.jsx";
import NewsletterSection from "../components/home/NewsletterSection.jsx";
import "./Home.css";

const Home = () => {
    return (
        <div className="home-page">
            {/* Section 1: Hero */}
            <Hero />

            {/* Section 2: Capability Strip */}
            <CapabilityStrip />

            {/* Section 3: About Preview */}
            <AboutPreview />

            {/* Section 4: What We Build (Services Bento) */}
            <ServicesBento />

            {/* Section 5: Selected Work (Featured Projects API) */}
            <FeaturedProjects />

            {/* Section 6: Tech Ecosystem */}
            <TechEcosystem />

            {/* Section 7: Process Timeline (How We Build) */}
            <ProcessTimeline />

            {/* Section 8: Interactive Project Estimate Calculator */}
            <ProjectEstimator />

            {/* Section 9: Team Preview (API) */}
            <TeamPreview />

            {/* Section 10: Blog & Insights (API) */}
            <BlogInsights />

            {/* Section 11: Primary CTA */}
            <CTASection />

            {/* Section 12: Newsletter (API) */}
            <NewsletterSection />
        </div>
    );
};

export default Home;
