import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen  p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h1 className="text-3xl text-center font-bold uppercase">Sign Up</h1>
                <form className="flex flex-col gap-4 mt-4">
                    <input type="text" className="bg-slate-200 p-2 rounded" placeholder="Username" />
                    <input type="email" className="bg-slate-200 p-2 rounded" placeholder="Email" />
                    <input type="password" className="bg-slate-200 p-2 rounded" placeholder="Password" />
                    <button className="bg-black text-white p-2 rounded hover:bg-gray-800 transition">Submit</button>
                </form>
                <p className='mt-4 text-end text-gray-500'>Already have an account? <Link className='text-blue-500' to={'/login'}>Login</Link></p>
            </div>
        </div>

    )
}

export default Signup
