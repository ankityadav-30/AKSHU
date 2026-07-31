// APP/client/src/pages/Team.jsx

import { useEffect, useState } from "react";
import api from "../services/api.js";
import TeamHero from "../components/team/TeamHero.jsx";
import TeamPhilosophy from "../components/team/TeamPhilosophy.jsx";
import TeamGallery from "../components/team/TeamGallery.jsx";
import CollaborationSection from "../components/team/CollaborationSection.jsx";
import TeamTechnology from "../components/team/TeamTechnology.jsx";
import TeamCulture from "../components/team/TeamCulture.jsx";
import TeamGrowth from "../components/team/TeamGrowth.jsx";
import TeamCTA from "../components/team/TeamCTA.jsx";

const Team = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchTeam = () => {
        setLoading(true);
        setError(false);
        api.get("/team")
            .then((res) => {
                const list = res.data?.data?.members || res.data?.data || [];
                setMembers(list);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    return (
        <div className="team-page">
            {/* 01: Hero */}
            <TeamHero />

            {/* 02: How We Think Together */}
            <TeamPhilosophy />

            {/* 03: Meet The Team (Backend API) */}
            <TeamGallery
                members={members}
                loading={loading}
                error={error}
                onRetry={fetchTeam}
            />

            {/* 04: Collaboration Lifecycle */}
            <CollaborationSection />

            {/* 05: Technology Ecosystem */}
            <TeamTechnology />

            {/* 06: Culture Pillars */}
            <TeamCulture />

            {/* 07: Evolution & Growth */}
            <TeamGrowth />

            {/* 08: Final CTA */}
            <TeamCTA />
        </div>
    );
};

export default Team;
