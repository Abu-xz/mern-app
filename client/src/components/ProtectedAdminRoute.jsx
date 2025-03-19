import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedAdminRoute = ({allowedRole}) => {
    console.log('protected admin route reached');
    const role = useSelector((state) => state.user.role);

    if(allowedRole === role){
        return <Outlet />
    }else{
        return <Navigate to={'/admin-login'}/>
    }

}

export default ProtectedAdminRoute
