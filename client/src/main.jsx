// APP/client/src/main.jsx

import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AOS from "aos";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import "aos/dist/aos.css";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/utilities.css";
import "./styles/admin.css";

function Root() {
    useEffect(() => {
        AOS.init({
            duration: 700,
            once: true,
            offset: 80,
            easing: "ease-out-cubic",
        });
    }, []);

    return (
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    );
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Root />
    </StrictMode>
);