// APP/client/src/components/layout/Navbar.jsx

import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX, HiArrowRight } from "react-icons/hi";
import { ROUTES } from "../../utils/constants.js";
import "./Navbar.css";

const NAV_LINKS = [
    { label: "Home", path: ROUTES.HOME },
    { label: "About", path: ROUTES.ABOUT },
    { label: "Services", path: ROUTES.SERVICES },
    { label: "Projects", path: ROUTES.PROJECTS },
    { label: "Team", path: ROUTES.TEAM },
    { label: "Blogs", path: ROUTES.BLOG },
    { label: "Contact", path: ROUTES.CONTACT },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Scroll listener for glass transition
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
        document.body.classList.remove("body-locked");
    }, [location.pathname]);

    // Handle ESC key to close mobile menu
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
                document.body.classList.remove("body-locked");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    const toggleMenu = () => {
        const nextState = !isOpen;
        setIsOpen(nextState);
        if (nextState) {
            document.body.classList.add("body-locked");
        } else {
            document.body.classList.remove("body-locked");
        }
    };

    return (
        <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
            <nav className="navbar__inner container" aria-label="Main Navigation">
                {/* Brand Logo */}
                <Link to={ROUTES.HOME} className="navbar__logo" aria-label="AKSHU Technologies Home">
                    <span className="navbar__logo-icon">A</span>
                    <div className="navbar__logo-brand">
                        <span className="navbar__logo-title">AKSHU</span>
                        <span className="navbar__logo-sub">TECHNOLOGIES</span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <ul className="navbar__links">
                    {NAV_LINKS.map((link) => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `navbar__link ${isActive ? "navbar__link--active" : ""}`
                                }
                                end={link.path === ROUTES.HOME}
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* CTA & Mobile Toggle */}
                <div className="navbar__actions">
                    <Link to={ROUTES.CONTACT} className="btn btn--primary navbar__cta">
                        Start a Project <HiArrowRight className="navbar__cta-icon" />
                    </Link>
                    <button
                        type="button"
                        className="navbar__toggle"
                        onClick={toggleMenu}
                        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation-drawer"
                    >
                        {isOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="mobile-navigation-drawer"
                        className="navbar__mobile-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleMenu}
                    >
                        <motion.div
                            className="navbar__mobile-menu"
                            initial={{ y: "-100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 220 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ul className="navbar__mobile-links">
                                {NAV_LINKS.map((link) => (
                                    <li key={link.path}>
                                        <NavLink
                                            to={link.path}
                                            className={({ isActive }) =>
                                                `navbar__mobile-link ${isActive ? "navbar__mobile-link--active" : ""}`
                                            }
                                            end={link.path === ROUTES.HOME}
                                            onClick={toggleMenu}
                                        >
                                            {link.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>

                            <div className="navbar__mobile-footer">
                                <Link to={ROUTES.CONTACT} className="btn btn--primary w-full" onClick={toggleMenu}>
                                    Start a Project <HiArrowRight />
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
