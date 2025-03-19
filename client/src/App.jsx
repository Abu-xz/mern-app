import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<ProtectedAdminRoute allowedRole={"admin"} />}>
          <Route path='dashboard' element={<Dashboard />} />
        </Route>

        <Route element={<ProtectedRoute />} >
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />

        </Route>
        {/* Public routes */}
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin-login' element={<AdminLogin />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
