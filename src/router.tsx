import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PizzaDetailPage from './pages/PizzaDetailPage'

function AppRouter() {
  return (
    <div>
        <Routes>
            <Route path="/"  element={<HomePage/>}/>
            <Route path="/details"  element={<PizzaDetailPage/>}/>
        </Routes>
    </div>
  )
}

export default AppRouter