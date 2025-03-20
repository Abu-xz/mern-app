import { BrowserRouter ,Routes, Route } from 'react-router-dom'
import './App.css'
import React from 'react'
import Home from './pages/user/Home'
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'
import Profile from './pages/user/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import Layout from './components/Layout'


const App = () => {

  return (
    <BrowserRouter> 
        <Layout />
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
