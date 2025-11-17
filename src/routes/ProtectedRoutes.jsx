// src/routes/ProtectedRoutes.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // ✅ Fallback: if Redux is empty (e.g. on page reload), check localStorage
  const token = localStorage.getItem("token");
  const localUser = JSON.parse(localStorage.getItem("user"));

  const finalUser = user || localUser;
  const finalAuth = isAuthenticated || !!token;

  // ✅ If not authenticated, redirect to login
  if (!finalAuth || !finalUser) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If role is not allowed, also redirect
  if (allowedRoles && !allowedRoles.includes(finalUser.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
