// APP/client/src/components/common/WhatsAppButton.jsx

import { FaWhatsapp } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";
import { buildWhatsAppUrl } from "../../utils/whatsapp.js";
import "./WhatsAppButton.css";

const WhatsAppButton = ({
    message,
    contextType = "contact",
    variant = "secondary", // "primary" | "secondary" | "outline" | "icon"
    size = "md", // "sm" | "md" | "lg"
    children,
    className = "",
    style = {},
}) => {
    const whatsappUrl = buildWhatsAppUrl(message, contextType);

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`whatsapp-btn whatsapp-btn--${variant} whatsapp-btn--${size} ${className}`}
            aria-label="Chat with AKSHU Technologies on WhatsApp"
            style={style}
        >
            <FaWhatsapp className="whatsapp-btn__icon" />
            <span>{children || "Chat on WhatsApp"}</span>
            <HiExternalLink className="whatsapp-btn__arrow" />
        </a>
    );
};

export default WhatsAppButton;
