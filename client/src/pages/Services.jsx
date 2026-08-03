// APP/client/src/pages/Services.jsx

import ServicesHero from "../components/services/ServicesHero.jsx";
import ServiceNavigator from "../components/services/ServiceNavigator.jsx";
import ServiceDetail from "../components/services/ServiceDetail.jsx";
import NeedsSelector from "../components/services/NeedsSelector.jsx";
import ConnectedProcess from "../components/services/ConnectedProcess.jsx";
import TechnologyApproach from "../components/services/TechnologyApproach.jsx";
import EstimatorCTA from "../components/services/EstimatorCTA.jsx";
import EngagementProcess from "../components/services/EngagementProcess.jsx";
import ServicesFAQ from "../components/services/ServicesFAQ.jsx";
import ServicesCTA from "../components/services/ServicesCTA.jsx";

const Services = () => {
    return (
        <div className="services-page">
            {/* 01: Hero */}
            <ServicesHero />

            {/* 02: Sticky Navigator */}
            <ServiceNavigator />

            {/* 03: Service Details (6 Sections) */}
            <ServiceDetail />

            {/* 04: Interactive Needs Selector */}
            <NeedsSelector />

            {/* 05: How Services Work Together */}
            <ConnectedProcess />

            {/* 06: Technology Approach */}
            <TechnologyApproach />

            {/* 07: Project Estimator CTA */}
            <EstimatorCTA />

            {/* 08: Engagement Lifecycle */}
            <EngagementProcess />

            {/* 09: FAQ */}
            <ServicesFAQ />

            {/* 10: Final CTA */}
            <ServicesCTA />
        </div>
    );
};

export default Services;
