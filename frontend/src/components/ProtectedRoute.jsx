import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

function ProtectedRoute({ children, allowedRole }) {

    const user = getCurrentUser();

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Wrong role
    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to="/login" replace />;
    }

    // Authorized
    return children;
}

export default ProtectedRoute;