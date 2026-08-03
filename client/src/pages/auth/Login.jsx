// APP/client/src/pages/auth/Login.jsx
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext.jsx";
import { ROUTES } from "../../utils/constants.js";
import "../PageShared.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            const redirect = searchParams.get("redirect") || ROUTES.ADMIN_DASHBOARD;
            navigate(redirect, { replace: true });
        } catch (err) {
            setError(err.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <motion.div className="login-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h1>Admin <span className="text-gradient">Login</span></h1>

                {error && <p style={{ color: "var(--color-danger)", textAlign: "center", marginBottom: "var(--space-4)", fontSize: "var(--font-size-sm)" }}>{error}</p>}

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="login-email">Email</label>
                        <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn--primary w-full" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
