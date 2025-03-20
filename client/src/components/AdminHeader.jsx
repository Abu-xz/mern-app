import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../redux/user/userSlice';
import { persistor } from '../redux/store';
import { toast } from 'react-toastify';

const AdminHeader = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const role = useSelector((state) => state.user.role)

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/logout');
            dispatch(logoutUser()) // remove current user state
            persistor.purge(); // clear persisted user state
            toast.success(response.data.message)
            navigate('/login');

        } catch {
            toast.error('Logout failed')
        }
    }

    return (
        <div>
            <header className='bg-slate-700 px-2 sm:px-8 py-4 text-white items-center flex justify-between'>
                <Link to={'/dashboard'}>
                    <h1 className=' text-md font-bold md:text-2xl'>ADMIN PANEL</h1>
                </Link>

                <nav className='flex'>
                    <ul className='flex justify-evenly gap-x-5 md:gap-x-10'>
                        {role &&
                            <p to={'/create'} className='cursor-pointer text-purple-400 px-2 rounded text-sm font-semibold md:text-lg'>Create</p>
                        }
                        {role === 'admin' ?
                            <p onClick={handleLogout} className='hidden sm:flex cursor-pointer hover:text-red-400 px-2 rounded text-sm md:text-lg'>Logout</p>
                            :
                            <Link to={'/signup'} className='hidden sm:flex cursor-pointer hover:text-slate-400 px-2 rounded text-sm md:text-lg'>Sign up</Link>
                        }
                    </ul>
                </nav>

            </header>
        </div>
    )
}

export default AdminHeader
