// APP/client/src/context/AuthContext.jsx

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { TOKEN_KEY, USER_KEY } from "../utils/constants.js";
import api from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem(USER_KEY);
        const storedToken = localStorage.getItem(TOKEN_KEY);

        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem(USER_KEY);
                localStorage.removeItem(TOKEN_KEY);
            }
        }

        setLoading(false);
    }, []);

    const login = useCallback(async (email, password) => {
        const { data } = await api.post("/auth/login", { email, password });

        const { token, user: userData } = data.data || data;

        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        setUser(userData);

        return userData;
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
    }, []);

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default AuthContext;
