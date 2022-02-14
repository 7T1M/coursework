import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import Login from "../views/auth/Login/Login";
import SignUp from "../views/auth/Signin/SignUp";
export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
}
