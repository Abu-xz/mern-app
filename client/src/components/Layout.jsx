import React from 'react'
import { useLocation } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import Header from './Header';

const Layout = () => {

    const adminRoutes = ['/admin-login', '/dashboard'];
    const location = useLocation();

    return (
        <>
            {adminRoutes.includes(location.pathname) ? <AdminHeader /> : <Header />}
        </>
    )
}

export default Layout
