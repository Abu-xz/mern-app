import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //implement validation
    console.log(formData);

    try {
      const data = formData;
      console.log(data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-slate-950">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl text-center font-bold uppercase">Log in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input name='email' type="email" className="bg-slate-200 p-2 rounded" placeholder="Email"  onChange={handleChange}/>
          <input name='password' type="password" className="bg-slate-200 p-2 rounded" placeholder="Password"  onChange={handleChange}/>
          <button className="bg-black text-white p-2 rounded hover:bg-gray-800 transition">Submit</button>
        </form>
        <p className='mt-4 text-end text-gray-500'> Don't have an account? <Link className='text-blue-500' to={'/signup'}>Sign Up</Link></p>
      </div>
    </div>

  )
}

export default Login
