import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Lazy-loaded components
const Login = lazy(() => import("../pages/Login"));
const CreateAccount = lazy(() => import("../pages/CreateAccount"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const ActiveAccountOTP = lazy(() => import("../pages/ActiveAccountOTP"));
const RecoverPassword = lazy(() => import("../pages/RecoverPassword"));

function Auth() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/active-account" element={<ActiveAccountOTP />} />
      <Route path="/recover-password" element={<RecoverPassword />} /> 
      <Route path="/reset-password" element={<ResetPassword />} /> 
      
      {/* Redirect any unmatched /auth routes to /auth/login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default Auth;
