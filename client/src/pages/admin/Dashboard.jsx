import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import UserForm from '../../components/UserForm';


const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState([{ id: '', userName: '', email: '', role: '' }])
  const [createUser, setCreateUser] = useState({ userName: '', email: '', password: '', role: '' });


  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/users", { withCredentials: true });
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
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, { withCredentials: true });
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting user');
    }

  }

  const handleSave = async () => {
    try {
      const { id, ...data } = formData;
      await axios.put(`http://localhost:5000/api/admin/users/${id}`, data, {withCredentials:true});
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
      const response = await axios.post(`http://localhost:5000/api/admin/create-user`, createUser, {withCredentials:true});
      console.log(response.data);
      toast.success(response.data?.message || 'User Created')
      setIsCreating(!isCreating)
      fetchUsers();
      setCreateUser({ userName: '', email: '', password: '', role: '' })
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message)
    }
  }

  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleSearch = async () => {
    try {
      if (search.trim()) {
        const response = await axios.get(`http://localhost:5000/api/admin/search/${search}`, {withCredentials:true});
        console.log('User :', response.data.users)
        setUsers(response.data.users || []);
      } else {
        toast.info('Please enter search term!')
        fetchUsers();
      }
    } catch (error) {
      console.log('Error Search user:', error.response)
      // Handle "User not found"
      if (error.response?.status === 404) {
        setUsers([]);
      }
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className='bg-slate-950 min-h-screen p-4 flex items-start justify-center'>
      <div className='bg-gray-100 p-5 mt-5 rounded-lg shadow-lg flex flex-col items-center'>
        <div>
          <div className='flex justify-between items-center mb-5'>
            <h1 className='text-center text-xl font-bold'>Admin Dashboard</h1>
            <div className="flex items-center gap-3">
              <input
                onChange={handleInputSearch}
                value={search}
                className="bg-slate-200 text-gray-800 rounded-lg w-80 px-3 py-2 border-1 border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200"
                placeholder="Search..."
              />
              <button
                onClick={handleSearch}
                className="text-white font-mono uppercase px-4 py-2 rounded-lg cursor-pointer bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 transition duration-200"
              >
                Search
              </button>
            </div>
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
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 p-4">User not found</td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id} className="bg-gray-200 even:bg-gray-300">
                    <td className="border border-gray-600 p-3 text-center">{index + 1}</td>
                    <td className="border border-gray-600 p-3">{user.userName}</td>
                    <td className="border border-gray-600 p-3">{user.email}</td>
                    <td className="border border-gray-600 p-3">{user.role}</td>
                    <td className="border border-gray-600 p-3 flex gap-3 justify-center">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-200 text-black font-mono uppercase px-4 py-2 rounded-lg cursor-pointer hover:bg-yellow-300 transition duration-200">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-300 text-red-700 font-mono uppercase px-4 py-2 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white transition duration-200">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}

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

