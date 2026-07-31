// APP/client/src/components/common/FloatingWhatsApp.jsx

import { useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";
import { buildWhatsAppUrl } from "../../utils/whatsapp.js";
import { ROUTES } from "../../utils/constants.js";
import "./FloatingWhatsApp.css";

const FloatingWhatsApp = ({ message, contextType = "contact" }) => {
    const location = useLocation();
    const whatsappUrl = buildWhatsAppUrl(message, contextType);

    // Hide floating button on Contact page to eliminate UI collision with contact form & submission CTAs
    if (location.pathname === ROUTES.CONTACT) {
        return null;
    }

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-whatsapp"
            aria-label="Chat with AKSHU Technologies on WhatsApp"
        >
            <div className="floating-whatsapp__badge">
                <span className="floating-whatsapp__dot" />
            </div>
            <FaWhatsapp className="floating-whatsapp__icon" />
            <span className="floating-whatsapp__label">
                Chat with AKSHU <HiExternalLink className="floating-whatsapp__arrow" />
            </span>
        </a>
    );
};

export default FloatingWhatsApp;
