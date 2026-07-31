// APP/client/src/services/api.js

import axios from "axios";
import { API_URL, TOKEN_KEY, USER_KEY, ROUTES } from "../utils/constants.js";

/* ====================================
   Axios Instance
==================================== */

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 20000,
});

/* ====================================
   Request Interceptor
   Attaches Bearer token if present
==================================== */

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(TOKEN_KEY);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(normalizeError(error))
);

/* ====================================
   Response Interceptor
   Normalizes errors, handles 401
==================================== */

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);

            const isOnLogin = window.location.pathname === ROUTES.LOGIN;

            if (!isOnLogin) {
                const redirectTo = encodeURIComponent(
                    window.location.pathname + window.location.search
                );
                window.location.href = `${ROUTES.LOGIN}?redirect=${redirectTo}`;
            }
        }

        return Promise.reject(normalizeError(error));
    }
);

/* ====================================
   Error Normalizer
   Ensures every caller gets:
   { message, status, errors, raw }
==================================== */

function normalizeError(error) {
    if (error.response) {
        return {
            message:
                error.response.data?.message ||
                "Something went wrong. Please try again.",
            status: error.response.status,
            errors: error.response.data?.errors || null,
            raw: error,
        };
    }

    if (error.request) {
        return {
            message: "Unable to reach the server. Check your connection.",
            status: null,
            errors: null,
            raw: error,
        };
    }

    return {
        message: error.message || "An unexpected error occurred.",
        status: null,
        errors: null,
        raw: error,
    };
}

export default api;