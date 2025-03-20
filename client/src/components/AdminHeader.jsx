import React from 'react'
import { Link } from 'react-router-dom'

const AdminHeader = ({ isLogged }) => {

    return (
        <div>
            <header className='bg-slate-700 px-2 sm:px-8 py-4 text-white items-center flex justify-between'>
                <Link to={'/dashboard'}>
                    <h1 className=' text-md font-bold md:text-2xl'>ADMIN PANEL</h1>
                </Link>
                {isLogged &&
                    <nav className='flex'>
                        <ul className='flex justify-evenly gap-x-5 md:gap-x-10'>
                            <p to={'/create'} className='cursor-pointer text-orange-500 px-2 rounded text-sm font-semibold md:text-lg'>Create</p>
                            <p className='hidden sm:flex cursor-pointer hover:text-red-400 px-2 rounded text-sm md:text-lg'>Logout</p>
                        </ul>
                    </nav>
                }
            </header>
        </div>
    )
}

export default AdminHeader
