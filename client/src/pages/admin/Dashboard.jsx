import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import UserForm from '../../components/UserForm';


const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState([{ id: '', userName: '', email: '', role: '' }])
  const [createUser, setCreateUser] = useState({ userName: '', email: '', password: '', role: '' });


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/users");
      setUsers(response.data?.users || []);
    } catch (error) {
      toast.error(`Error Fetching users: ${error.response?.data?.message || error.message}`)
    }
  }

  const handleEdit = (user) => {
    setIsEditing(!isEditing);
    setFormData({ id: user._id, userName: user.userName, email: user.email, role: user.role });
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting user');
    }

  }

  const handleSave = async () => {
    try {
      const { id, ...data } = formData;
      await axios.put(`http://localhost:5000/api/admin/users/${id}`, data);
      toast.success('User updated successfully');
      setIsEditing(!isEditing);
      setFormData({ id: '', userName: '', email: '', role: '' });
      fetchUsers()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating user')
    }
  }

  const handleCreate = () => {
    setIsCreating(!isCreating);
  }

  const handleCreateNewUser = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/admin/create-user`, createUser);
      console.log(response.data);
      toast.success(response.data.message)
      setIsCreating(!isCreating)
      fetchUsers();
      setCreateUser({ userName: '', email: '', password: '', role: '' })
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message)
    }
  }


  return (
    <div className='bg-slate-950 min-h-screen p-4 flex items-start justify-center'>
      <div className='bg-gray-100 p-5 mt-5 rounded-lg shadow-lg flex flex-col items-center'>
        <div>
          <div className='flex justify-between items-center mb-5'>
            <h1 className='text-center text-xl font-bold'>Admin Dashboard</h1>
            <button onClick={handleCreate} className='cursor-pointer text-purple-400 px-2 rounded text-sm font-semibold uppercase md:text-lg'>Create</button>
          </div>
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
                    <button onClick={() => handleEdit(user)} className='bg-yellow-100 text-black font-mono uppercase px-3 py-1 rounded cursor-pointer hover:bg-cyan-300 transition duration-200'>Edit</button>
                    <button onClick={() => handleDelete(user._id)} className='bg-red-200 text-red-500 font-mono uppercase px-3 py-1 rounded cursor-pointer hover:bg-red-400 hover:text-black transition duration-200'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex space-x-5'>
          {isEditing && <UserForm formData={formData} setFormData={setFormData} handleSubmit={handleSave} onCancel={() => setIsEditing(false)} isEditing />}

          {isCreating && <UserForm formData={createUser} setFormData={setCreateUser} handleSubmit={handleCreateNewUser} onCancel={() => setIsCreating(false)} />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;

