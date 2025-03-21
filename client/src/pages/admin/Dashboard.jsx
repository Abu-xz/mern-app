import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import User from '../../../../server/models/userModel';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: '', userName: '', email: '', role: '' })


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

  const handleEdit = (user) => {
    setIsEditing(!isEditing);
    setFormData({ id: user._id, userName: user.userName, email: user.email, role: user.role });
  }

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this user?')){
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (error) {
        console.log(error)
        toast.error('Error while deleting user'+ error.message);
      }
    }
   
}

const handleSave = async () => {
  try {
    const { id, ...data } = formData;
    const response = await axios.put(`http://localhost:5000/api/admin/users/${id}`, data);
    toast.success('User updated successfully');
    setIsEditing(!isEditing);
    setUsers(users.map((user =>
      user._id === id ? response.data : user
    )))
    setFormData({ id: '', userName: '', email: '', role: '' });
    // fetchUsers()
  } catch (error) {
    console.log('handle save error, ', error.message);
    toast.error(error.data)
  }
}


return (
  <div className='bg-slate-950 min-h-screen p-4 flex items-start justify-center'>
    <div className='bg-gray-100 p-5 mt-5 rounded-lg shadow-lg flex flex-col items-center'>
      <div>
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
                <td className='border border-gray-600 p-2'>{user.userName}</td>
                <td className='border border-gray-600 p-2'>{user.email}</td>
                <td className='border border-gray-600 p-2'>{user.role}</td>
                <td className='border border-gray-600 p-2 space-x-3'>
                  <button onClick={() => handleEdit(user)} className='bg-yellow-100 text-black font-mono uppercase px-3 py-1 rounded cursor-pointer'>Edit</button>
                  <button onClick={() => handleDelete(user._id)} className='bg-red-200 text-red-500 font-mono uppercase px-3 py-1 rounded cursor-pointer'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Edit Form */}
      {isEditing && (
        <div className='mt-4 p-4 bg-gray-400 text-white rounded-lg max-w-80'>
          <h2 className='text-lg text-center text-black uppercase font-bold mb-3'>Edit User</h2>
          <input
            type='text'
            placeholder='Name'
            className='block w-full p-2 mb-2 text-black bg-slate-300 rounded'
            value={formData.userName}
            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
          />
          <input
            type='email'
            placeholder='Email'
            className='block w-64 p-2 mb-2 text-black bg-slate-300 rounded'
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <select
            className='block w-full p-2 mb-2 text-black bg-slate-300 rounded'
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value='admin'>Admin</option>
            <option value='user'>User</option>
          </select>
          <div className='flex justify-between mt-5'>
            <button onClick={() => setIsEditing(!isEditing)} className='bg-gray-500 px-3 py-1 rounded  cursor-pointer'>Cancel</button>
            <button onClick={handleSave} className='bg-black px-4 py-1 border-1 border-black rounded hover:bg-white hover:text-black hover:border-1 cursor-pointer '>Save</button>
          </div>
        </div>
      )}
    </div>
  </div>
)
}

export default Dashboard;

