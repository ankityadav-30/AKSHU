// APP/client/src/pages/About.jsx

import AboutHero from "../components/about/AboutHero.jsx";
import OurStory from "../components/about/OurStory.jsx";
import MissionVision from "../components/about/MissionVision.jsx";
import Principles from "../components/about/Principles.jsx";
import Capabilities from "../components/about/Capabilities.jsx";
import ThinkingProcess from "../components/about/ThinkingProcess.jsx";
import ProductProcess from "../components/about/ProductProcess.jsx";
import TechnologyPhilosophy from "../components/about/TechnologyPhilosophy.jsx";
import AboutTeam from "../components/about/AboutTeam.jsx";
import RoadAhead from "../components/about/RoadAhead.jsx";
import AboutCTA from "../components/about/AboutCTA.jsx";

const About = () => {
    return (
        <div className="about-page">
            {/* 01: Hero */}
            <AboutHero />

            {/* 02: Our Story */}
            <OurStory />

            {/* 03: Mission + Vision */}
            <MissionVision />

            {/* 04: Our Principles */}
            <Principles />

            {/* 05: What We Build (Capabilities) */}
            <Capabilities />

            {/* 06: How We Think */}
            <ThinkingProcess />

            {/* 07: How Ideas Become Products (Process) */}
            <ProductProcess />

            {/* 08: Technology Philosophy */}
            <TechnologyPhilosophy />

            {/* 09: Our Team (API) */}
            <AboutTeam />

            {/* 10: Where We're Going */}
            <RoadAhead />

            {/* 11: Final CTA */}
            <AboutCTA />
        </div>
    );
};

export default About;
