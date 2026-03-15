import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated, allowedRoles, userRole }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
