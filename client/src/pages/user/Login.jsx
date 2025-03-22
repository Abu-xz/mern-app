import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginStart, loginSuccess, loginFailure } from '../../redux/user/userSlice';


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //implement validation
    if (!formData.email || !formData.password) {
      dispatch(loginFailure());
      console.log(formData);
    }
    dispatch(loginStart())

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData, {withCredentials:true})

      setFormData({
        email: '',
        password: '',
      })

      dispatch(loginSuccess(response.data));

      toast.success(response.data.message)

      navigate('/')

    } catch (error) {
      dispatch(loginFailure());
      console.log(error)
      toast.error(error.response?.data?.message || 'Something went wrong.')
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-slate-950">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl text-center font-bold uppercase">Log in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input name='email' type="email" className="bg-slate-200 p-2 rounded" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input name='password' type="password" className="bg-slate-200 p-2 rounded" placeholder="Password" value={formData.password} onChange={handleChange} />
          <button className="bg-black text-white p-2 rounded hover:bg-gray-800 transition">{`${loading ? 'Submitting' : 'Submit'}`}</button>
        </form>
        <p className='mt-4 text-end text-gray-500'> Don&#39;t have an account? <Link className='text-blue-500' to={'/signup'}>Sign Up</Link></p>
      </div>
    </div>

  )
}

export default Login
