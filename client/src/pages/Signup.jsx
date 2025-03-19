import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess } from '../redux/user/userSlice';

const Signup = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, currentUser} = useSelector((state) => state.user)
    
    if(currentUser)return <Navigate to={'/'}/>

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        // implement frontend validation
        console.log(formData)
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', formData)
            console.log(response.data)
            if(response.data.success){
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                })
                toast.success(response.data.message)
                dispatch(loginSuccess());
                navigate('/login')
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(loginSuccess());
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-slate-950">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h1 className="text-3xl text-center font-bold uppercase">Sign Up</h1>
                <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                    <input name='username' type="text" className="bg-slate-200 p-2 rounded" placeholder="Username" onChange={handleChange} value={formData.username} />
                    <input name='email' type="email" className="bg-slate-200 p-2 rounded" placeholder="Email" onChange={handleChange} value={formData.email} />
                    <input name='password' type="password" className="bg-slate-200 p-2 rounded" placeholder="Password" onChange={handleChange} value={formData.password} />
                    <button className="bg-black text-white p-2 rounded hover:bg-gray-800 transition" disabled={loading}>{`${loading ? 'Submitting...' : 'Submit'}`}</button>
                </form>
                <p className='mt-4 text-end text-gray-500'>Already have an account? <Link className='text-blue-500 text-lg' to={'/login'}>Login</Link></p>
            </div>
        </div>

    )
}

export default Signup
