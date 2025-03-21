import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      axios.get("http://localhost:5000/api/admin/users")
        .then((res) => setUsers(res.data.users));
    } catch (error) {
      toast.error('Error Fetching users: ', error.message)
    }
  }

  return (
    <div className='bg-slate-950 min-h-screen p-4 flex items-start justify-center'>
      <div className='bg-gray-100 p-5 mt-5 rounded-lg shadow-lg'>
        <h1 className='text-center text-xl font-bold mb-4'>Admin Dashboard</h1>
        <table className='border-collapse border border-gray-600 w-full text-center'>
          <thead >
            <tr className='bg-gray-700 text-white'>
              <th className='border border-gray-600 py-2 px-4'>Sl</th>
              <th className='border border-gray-600 py-2 px-16'>Name</th>
              <th className='border border-gray-600 py-2 px-28'>Email</th>
              <th className='border border-gray-600 py-2 px-10'>Role</th>
              <th className='border border-gray-600 py-2 px-18'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className='bg-gray-300'>
                <td className='border border-gray-600 p-2'>{index + 1}</td>
                <td className='border border-gray-600 p-2 uppercase'>{user.userName}</td>
                <td className='border border-gray-600 p-2'>{user.email}</td>
                <td className='border border-gray-600 p-2'>{user.role}</td>
                <td className='border border-gray-600 p-2 space-x-3'>
                  <button className='bg-yellow-100 text-black font-mono uppercase px-3 py-1 rounded cursor-pointer'>Edit</button>
                  <button className='bg-red-200 text-red-500 font-mono uppercase px-3 py-1 rounded cursor-pointer'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard;

