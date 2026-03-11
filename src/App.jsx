import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";
import AuthPage from "@/pages/auth/AuthPage";

// Protected Route Component to prevent unauthorized access
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally handle any other side effects on auth change
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    navigate("/");
    window.location.reload(); // Force a clean slate
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage onLoginSuccess={() => setIsAuthenticated(true)} />} />
      <Route path="/register" element={<AuthPage onLoginSuccess={() => setIsAuthenticated(true)} initialRegister={true} />} />

      {/* 
        The Dashboard is now the parent route for the nested features.
        The /* is crucial since Dashboard will have its own nested routes
      */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard handleLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}