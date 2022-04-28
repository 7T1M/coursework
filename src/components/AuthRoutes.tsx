import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../views/auth/Login/Login";
const AuthRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="login" element={<Login />} />
  </Routes>
);
export default AuthRoutes;
