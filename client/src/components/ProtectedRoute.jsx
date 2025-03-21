import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    console.log('protected route reached')
    const role = useSelector((state) => state.user.role)

    return role === 'user' ? <Outlet /> : <Navigate to={'/login'}/>
}

export default ProtectedRoute
