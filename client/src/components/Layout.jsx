import React from 'react'
import { useLocation } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import Header from './Header';
import { useSelector } from 'react-redux';

const Layout = () => {

    const adminRoutes = ['/admin-login', '/dashboard'];
    const location = useLocation();
    const role = useSelector((state) => state.user.role)

    return (
        <>
            {adminRoutes.includes(location.pathname) ? <AdminHeader isLogged={role === 'admin'}/> : <Header />}
        </>
    )
}

export default Layout
