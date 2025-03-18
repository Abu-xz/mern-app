import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Header from './components/Header'
import About from './pages/About'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
