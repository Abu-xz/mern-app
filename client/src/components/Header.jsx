import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='bg-slate-700 px-8 py-4 text-white items-center flex justify-between'>
            <Link to={'/'}>
                <h1 className=' text-md font-bold md:text-2xl'>CRUD APP</h1>
            </Link>
            <nav className='flex'>
                <ul className='flex justify-evenly gap-x-5 md:gap-x-10'>
                    <Link to={'/'} className='cursor-pointer hover:text-slate-400 px-2 rounded text-sm md:text-lg'>Home</Link>
                    <Link to={'/about'} className='cursor-pointer hover:text-slate-400 px-2 rounded text-sm md:text-lg'>About</Link>
                    <Link to={'/login'} className='cursor-pointer hover:text-slate-400 px-2 rounded text-sm md:text-lg'>login</Link>
                    <Link to={'/profile'} className='cursor-pointer hover:text-slate-400 px-2 rounded text-sm md:text-lg'>Profile</Link>
                </ul>
            </nav>
        </div>
    )
}

export default Header
