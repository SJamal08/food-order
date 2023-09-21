import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PizzaDetailPage from './pages/PizzaDetailPage'

import RtlLayout from "./admin/src/layouts/rtl";
import AdminLayout from "./admin/src/layouts/admin";
import AuthLayout from "./admin/src/layouts/auth";

function AppRouter() {
  return (
    <div>
        <Routes>
            <Route path="/"  element={<HomePage/>}/>
            <Route path="/details"  element={<PizzaDetailPage/>}/>

            {/* routes for admin dashboard */}

            <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="test/" element={<Navigate to="/admin" replace />} />
        </Routes>
    </div>
  )
}

export default AppRouter