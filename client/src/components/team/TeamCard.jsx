// APP/client/src/components/team/TeamCard.jsx

import { Link } from "react-router-dom";
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaGlobe, FaBehance, FaDribbble } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import "./TeamCard.css";

const TeamCard = ({ member, isPreview = false }) => {
    if (!member) return null;

    const fullName =
        member.displayName ||
        member.name ||
        `${member.firstName || ""} ${member.lastName || ""}`.trim() ||
        "Team Member";

    const role = member.designation || member.role || member.position || "Software Engineer";
    const avatarUrl = member.profileImage || member.avatar || member.image || "";
    const socials = member.socialLinks || member.socials || {};

    const initials = fullName
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    const cardSize = member.cardSize || "medium";
    const isFeatured = Boolean(member.featured);
    const showBio = member.showBio !== false;
    const showSkills = member.showSkills !== false;
    const showSocialLinks = member.showSocialLinks !== false;

    const maxSkills = cardSize === "large" ? 5 : cardSize === "small" ? 2 : 4;
    const skillsList = member.skills || [];
    const displayedSkills = skillsList.slice(0, maxSkills);
    const remainingSkills = Math.max(0, skillsList.length - maxSkills);

    const hasAnySocial =
        socials.linkedin ||
        socials.github ||
        socials.portfolio ||
        socials.twitter ||
        socials.instagram ||
        socials.behance ||
        socials.dribbble ||
        socials.website;

    const profileUrl = `/team/${member.slug || member._id}`;

    return (
        <div
            className={`team-profile-card team-profile-card--${cardSize} ${
                isFeatured ? "team-profile-card--featured" : ""
            } ${isPreview ? "team-profile-card--preview" : ""}`}
        >
            {isFeatured && (
                <div className="team-featured-badge">
                    <span>★ FEATURED</span>
                </div>
            )}

            {/* Profile Image with Gradient Ring */}
            <div className="team-profile-card__avatar-container">
                <div className="team-profile-card__avatar-ring">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={`${fullName} — ${role}`}
                            className="team-profile-card__avatar"
                            loading="lazy"
                        />
                    ) : (
                        <div className="team-profile-card__placeholder">
                            <span className="team-profile-card__initials">{initials}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Card Content & Hierarchy */}
            <div className="team-profile-card__info">
                <h3 className="team-profile-card__name">{fullName}</h3>
                <span className="team-profile-card__role">{role}</span>

                {showBio && member.bio && (
                    <p className="team-profile-card__bio" title={member.bio}>
                        {member.bio}
                    </p>
                )}

                {/* Skill Chips */}
                {showSkills && skillsList.length > 0 && (
                    <div className="team-profile-card__skills">
                        {displayedSkills.map((skill) => (
                            <span key={skill} className="team-skill-chip">
                                {skill}
                            </span>
                        ))}
                        {remainingSkills > 0 && (
                            <span className="team-skill-chip team-skill-chip--more">
                                +{remainingSkills} More
                            </span>
                        )}
                    </div>
                )}

                {/* Social Icons */}
                {showSocialLinks && hasAnySocial && (
                    <div className="team-profile-card__socials">
                        {socials.linkedin && (
                            <a
                                href={socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${fullName} LinkedIn`}
                                onClick={(e) => isPreview && e.preventDefault()}
                            >
                                <FaLinkedinIn />
                            </a>
                        )}
                        {socials.github && (
                            <a
                                href={socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${fullName} GitHub`}
                                onClick={(e) => isPreview && e.preventDefault()}
                            >
                                <FaGithub />
                            </a>
                        )}
                        {socials.portfolio && (
                            <a
                                href={socials.portfolio}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${fullName} Portfolio`}
                                onClick={(e) => isPreview && e.preventDefault()}
                            >
                                <FaGlobe />
                            </a>
                        )}
                        {socials.twitter && (
                            <a
                                href={socials.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${fullName} Twitter`}
                                onClick={(e) => isPreview && e.preventDefault()}
                            >
                                <FaTwitter />
                            </a>
                        )}
                        {socials.instagram && (
                            <a
                                href={socials.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${fullName} Instagram`}
                                onClick={(e) => isPreview && e.preventDefault()}
                            >
                                <FaInstagram />
                            </a>
                        )}
                        {socials.behance && (
                            <a
                                href={socials.behance}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${fullName} Behance`}
                                onClick={(e) => isPreview && e.preventDefault()}
                            >
                                <FaBehance />
                            </a>
                        )}
                        {socials.dribbble && (
                            <a
                                href={socials.dribbble}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${fullName} Dribbble`}
                                onClick={(e) => isPreview && e.preventDefault()}
                            >
                                <FaDribbble />
                            </a>
                        )}
                    </div>
                )}

                {/* Action Link to Individual Profile Page */}
                <div className="team-profile-card__action">
                    {isPreview ? (
                        <span className="team-profile-card__cta">
                            View Profile <HiArrowRight className="team-profile-card__cta-arrow" />
                        </span>
                    ) : (
                        <Link to={profileUrl} className="team-profile-card__cta">
                            View Profile <HiArrowRight className="team-profile-card__cta-arrow" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
