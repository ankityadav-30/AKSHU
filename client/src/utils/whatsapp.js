// APP/client/src/utils/whatsapp.js

/**
 * Gets cleaned WhatsApp phone number from environment variables or default.
 * @returns {string} Digits-only phone number.
 */
export function getWhatsAppNumber() {
    const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "917355650747";
    return rawNumber.replace(/\D/g, "");
}

/**
 * Builds an official WhatsApp click-to-chat URL with prefilled text message.
 * @param {string|object} messageOrContext - Custom message string or context object.
 * @param {string} contextType - "contact" | "estimator" | "services" | "projects" | "custom"
 * @returns {string} Formatted WhatsApp URL.
 */
export function buildWhatsAppUrl(messageOrContext, contextType = "contact") {
    const number = getWhatsAppNumber();
    let text = "";

    if (contextType === "estimator" && typeof messageOrContext === "object") {
        const { result, selections } = messageOrContext;
        if (result) {
            text = `Hi AKSHU Technologies! 👋\n\nI calculated a preliminary estimate on your website and would like to discuss my project:\n\n• Project Type: ${result.projectTypeTitle || selections?.projectType}\n• Scope Size: ${result.projectSizeTitle || selections?.projectSize}\n• Design Level: ${result.designLevelTitle || selections?.designLevel}\n• Timeline: ${result.timelineTitle || selections?.timeline}\n• Estimated Range: ${result.formattedRange}\n\nI'd like to discuss the requirements further.`;
        } else {
            text = "Hi AKSHU Technologies! 👋\n\nI used your project estimator and would like to discuss my requirements.";
        }
    } else if (typeof messageOrContext === "string" && messageOrContext.trim().length > 0) {
        text = messageOrContext;
    } else {
        switch (contextType) {
            case "services":
                text = "Hi AKSHU Technologies! 👋\n\nI'd like to discuss your development services.";
                break;
            case "projects":
                text = "Hi AKSHU Technologies! 👋\n\nI explored your projects and would like to discuss a similar product idea.";
                break;
            case "contact":
            default:
                text = "Hi AKSHU Technologies! 👋\n\nI'd like to discuss a project with you.";
                break;
        }
    }

    const encodedText = encodeURIComponent(text);
    return `https://wa.me/${number}?text=${encodedText}`;
}
