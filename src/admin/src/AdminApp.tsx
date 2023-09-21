import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "./layouts/rtl";
import AdminLayout from "./layouts/admin";
import AuthLayout from "./layouts/auth";
const AdminApp = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="test/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminApp;
