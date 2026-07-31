// APP/client/src/components/layout/Footer.jsx

import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn, FaTwitter, FaEnvelope } from "react-icons/fa";
import { ROUTES } from "../../utils/constants.js";
import "./Footer.css";

const EXPLORE_LINKS = [
    { label: "Home", path: ROUTES.HOME },
    { label: "About", path: ROUTES.ABOUT },
    { label: "Projects", path: ROUTES.PROJECTS },
    { label: "Team", path: ROUTES.TEAM },
];

const SERVICES_LINKS = [
    { label: "Web Development", path: ROUTES.SERVICES },
    { label: "Product Development", path: ROUTES.SERVICES },
    { label: "UI/UX Design", path: ROUTES.SERVICES },
    { label: "Backend Engineering", path: ROUTES.SERVICES },
];

const RESOURCES_LINKS = [
    { label: "Blogs & Insights", path: ROUTES.BLOG },
    { label: "Contact Us", path: ROUTES.CONTACT },
    { label: "Admin Access", path: ROUTES.LOGIN },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__glow" aria-hidden="true" />
            <div className="footer__wordmark" aria-hidden="true">AKSHU</div>

            <div className="container footer__container">
                <div className="footer__grid">
                    {/* Brand Column */}
                    <div className="footer__brand">
                        <Link to={ROUTES.HOME} className="footer__logo">
                            <span className="footer__logo-icon">A</span>
                            <div className="footer__logo-text">
                                <span className="footer__logo-title">AKSHU</span>
                                <span className="footer__logo-sub">TECHNOLOGIES</span>
                            </div>
                        </Link>
                        <p className="footer__desc">
                            Building thoughtful technology, scalable digital products, and high-performance software for an increasingly digital world.
                        </p>
                        <div className="footer__socials">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer__social">
                                <FaGithub />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer__social">
                                <FaLinkedinIn />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="footer__social">
                                <FaTwitter />
                            </a>
                            <a href="mailto:info@akshutechnologies.com" aria-label="Email" className="footer__social">
                                <FaEnvelope />
                            </a>
                        </div>
                    </div>

                    {/* Explore Column */}
                    <div className="footer__col">
                        <h3 className="footer__col-title">EXPLORE</h3>
                        <ul className="footer__list">
                            {EXPLORE_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path} className="footer__link">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Column */}
                    <div className="footer__col">
                        <h3 className="footer__col-title">SERVICES</h3>
                        <ul className="footer__list">
                            {SERVICES_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path} className="footer__link">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div className="footer__col">
                        <h3 className="footer__col-title">RESOURCES</h3>
                        <ul className="footer__list">
                            {RESOURCES_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path} className="footer__link">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © {currentYear} AKSHU Technologies. All rights reserved. Engineered for what comes next.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
