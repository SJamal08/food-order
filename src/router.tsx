import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PizzaDetailPage from './pages/PizzaDetailPage'

import AdminLayout from "./admin/src/layouts/admin";
import AuthLayout from "./admin/src/layouts/auth";
import BasketViewPage from './pages/BasketViewPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { NavbarDefault } from './components/Navbar';
import PaymentStripePage from './pages/PaymentStripePage';
import SuccessPayment from './pages/SuccessPayment';
import MyOrdersPage from './pages/MyOrdersPage';
import ForgotPAssword from './pages/ForgotPAssword';


function AppLayout() {
  return (
    <div className=''>
      <NavbarDefault />
      <Outlet />
    </div>
  )
}

function AppRouter() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route path="/"  element={<HomePage/>}/>
            <Route path="/details"  element={<PizzaDetailPage/>}/>
            <Route path="/basket"  element={<BasketViewPage/>}/>
            <Route path="/login"  element={<LoginPage/>}/>
            <Route path="/forgotPassword"  element={<ForgotPAssword/>}/>
            <Route path="/register"  element={<RegisterPage/>}/>
            <Route path="/payment"  element={<PaymentStripePage/>}/>
            <Route path="/myOrders"  element={<MyOrdersPage/>}/>
            {/* <Route path={`/orderSuccess/:orderId`}  element={<SuccessPayment/>}/> localhost:3000/ordersuccess/24324343 // Route params */}
            <Route path={`/orderSuccess`}  element={<SuccessPayment/>}/> 
            {/* localhost:3000/ordersuccess/24324343 */}
          </Route>

            {/* routes for admin dashboard */}

            <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="test/" element={<Navigate to="/admin" replace />} />
        </Routes>
    </div>
  )
}

export default AppRouter