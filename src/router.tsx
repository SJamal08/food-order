import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PizzaDetailPage from './pages/PizzaDetailPage'

import AdminLayout from "./admin/src/layouts/admin";
import AuthLayout from "./admin/src/layouts/auth";
import BasketViewPage from './pages/BasketViewPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function AppRouter() {
  return (
    <div>
        <Routes>
            <Route path="/"  element={<HomePage/>}/>
            <Route path="/details"  element={<PizzaDetailPage/>}/>
            <Route path="/basket"  element={<BasketViewPage/>}/>
            <Route path="/login"  element={<LoginPage/>}/>
            <Route path="/register"  element={<RegisterPage/>}/>

            {/* routes for admin dashboard */}

            <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="test/" element={<Navigate to="/admin" replace />} />
        </Routes>
    </div>
  )
}

export default AppRouter