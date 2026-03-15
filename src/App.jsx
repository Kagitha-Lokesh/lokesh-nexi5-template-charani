import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";
import AuthPage from "@/pages/auth/AuthPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ScrollToTop from "@/components/common/ScrollToTop";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || "";
  });

  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setUserRole(localStorage.getItem("userRole") || "");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    setUserRole("");
    navigate("/login");
    window.location.reload(); // Force a clean slate
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/register" element={<AuthPage onLoginSuccess={handleLoginSuccess} initialRegister={true} />} />

      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole}>
            <Dashboard handleLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  );
}