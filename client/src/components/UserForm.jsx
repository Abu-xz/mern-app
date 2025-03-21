import React from "react";


const UserForm = ({ formData, setFormData, handleSubmit, onCancel, isEditing }) => (
    <div className='mt-4 p-4 bg-gray-400 text-white rounded-lg max-w-80'>
        <h2 className='text-lg text-center text-black uppercase font-bold mb-3'>
            {isEditing ? 'Edit User' : 'Create User'}
        </h2>
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
        {!isEditing && (
            <input
                type='password'
                placeholder='Password'
                className='block w-64 p-2 mb-2 text-black bg-slate-300 rounded'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
        )}
        <select
            className='block w-full p-2 mb-2 text-black bg-slate-300 rounded'
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
        </select>
        <div className='flex justify-between mt-5'>
            <button onClick={onCancel} className='bg-gray-500 px-3 py-1 rounded cursor-pointer'>
                Cancel
            </button>
            <button onClick={handleSubmit} className='bg-black px-4 py-1 border-1 border-black rounded hover:bg-white hover:text-black cursor-pointer'>
                {isEditing ? 'Save' : 'Create'}
            </button>
        </div>
    </div>
);


export default UserForm