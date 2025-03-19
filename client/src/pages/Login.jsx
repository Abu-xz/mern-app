import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Login = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    //implement validation
    console.log(formData);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData)
      console.log(response.data)
      setFormData({
        username: '',
        email: '',
        password: '',
      })
      toast.success(response.data.message)
      setIsLoading(false)
      navigate('/home')
    } catch (error) {
      setIsLoading(false)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-slate-950">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl text-center font-bold uppercase">Log in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input name='email' type="email" className="bg-slate-200 p-2 rounded" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input name='password' type="password" className="bg-slate-200 p-2 rounded" placeholder="Password" value={formData.password} onChange={handleChange} />
          <button className="bg-black text-white p-2 rounded hover:bg-gray-800 transition">{`${isLoading ? 'Submitting' : 'Submit'}`}</button>
        </form>
        <p className='mt-4 text-end text-gray-500'> Don&#39;t have an account? <Link className='text-blue-500' to={'/signup'}>Sign Up</Link></p>
      </div>
    </div>

  )
}

export default Login
