import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    console.log('protected route reached')
    const user = useSelector((state) => state.user.currentUser)

    return user ? <Outlet /> : <Navigate to={'/login'}/>
}

export default ProtectedRoute
