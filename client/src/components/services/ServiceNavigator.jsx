// APP/client/src/components/services/ServiceNavigator.jsx

import { motion } from "framer-motion";
import "./ServiceNavigator.css";

const NAV_ITEMS = [
    { label: "Web & Product Dev", href: "#web-dev" },
    { label: "UI/UX Design", href: "#ui-ux" },
    { label: "Backend & APIs", href: "#backend" },
    { label: "Commerce & Business", href: "#business-systems" },
    { label: "Cloud & Integration", href: "#cloud" },
    { label: "Technical Consulting", href: "#consulting" },
];

const ServiceNavigator = () => {
    const handleScrollTo = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            const yOffset = -90;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <section className="service-navigator">
            <div className="container">
                <div className="service-navigator__inner">
                    <span className="service-navigator__tag">EXPLORE OUR CAPABILITIES</span>
                    <div className="service-navigator__pills">
                        {NAV_ITEMS.map((item, i) => (
                            <motion.a
                                key={item.href}
                                href={item.href}
                                className="service-navigator__pill"
                                onClick={(e) => handleScrollTo(e, item.href)}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                            >
                                {item.label}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceNavigator;
