// APP/client/src/components/auth/ProtectedRoute.jsx

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { ROUTES } from "../../utils/constants.js";
import PageLoader from "../common/PageLoader.jsx";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { user, loading, isAuthenticated } = useAuth();
    const location = useLocation();

    if (loading) {
        return <PageLoader />;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to={`${ROUTES.LOGIN}?redirect=${encodeURIComponent(location.pathname)}`}
                replace
            />
        );
    }

    if (allowedRoles) {
        const userRoleUpper = user?.role?.toUpperCase();
        const hasRole = allowedRoles.some(
            (role) => role.toUpperCase() === userRoleUpper
        );
        if (!hasRole) {
            return <Navigate to={ROUTES.HOME} replace />;
        }
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
