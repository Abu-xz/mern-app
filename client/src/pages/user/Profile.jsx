import React, { useEffect, useState } from 'react'
import profile_image from '/images/profile_image.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { loadingEnd, loadingStart, logoutUser } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  console.log('user data: ', user)

  useEffect(() => {
    if(user){
      setName(user.username);
      setEmail(user.emailId);
    }
    }, [user]);
 


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    };
  };

  const handleSave = async () => {

    if (user.username === name && user.emailId === email && !file) {
      toast.info('Change something in your profile Fool...')
      return
    }
    dispatch(loadingStart())
    let cloudinaryImageUrl = null;
    if (file) {
      try {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', "products")
        const response = await axios.post(`https://api.cloudinary.com/v1_1/de5vavykz/image/upload`, formData)
        cloudinaryImageUrl = response.data.secure_url;

        if(cloudinaryImageUrl) setImageUrl(cloudinaryImageUrl)

      } catch (error) {
        console.log(error.message);
        toast.error('Image upload failed')
      }
    }

    try {
      const response = await axios.put('http://localhost:5000/api/users/profile', { name, email, imageUrl: cloudinaryImageUrl }, { withCredentials: true });
      console.log(response.data);
      toast.success('Profile saved successfully!')
      dispatch(loadingEnd());
      
      
    } catch (error) {
      console.log('Error while updating user profile', error.message);
      toast.error( error.response.data?.message||'Failed to update profile');
      if(error.response.status === 401){
        navigate('/login');
        dispatch(logoutUser())
      }
      dispatch(loadingEnd());
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-slate-900 min-h-screen">
      <div className="bg-white p-6 mt-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-4">EDIT PROFILE</h2>
        <div className="flex flex-col items-center mb-10 relative">
          <label htmlFor="imageUrl" className="cursor-pointer relative">
            <img
             
             src={imageUrl || (user.image ? user.image : profile_image)}
              alt="Profile"
              className={`w-32 h-32 rounded-full border-gray-300 object-cover ${!imageUrl ? "scale-125" : ""
                }`}
            />

            <div className="absolute bottom-2 right-5 bg-black p-1 rounded-full shadow-md">
              <svg className="w-4 h-4 text-white " fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V14h3.828l7.586-7.586a2 2 0 000-2.828l-1-1zM5 15v-2H3v4h4v-2H5z"></path>
              </svg>
            </div>
          </label>

          {/* Hidden File Input */}
          <input type="file" id="imageUrl" className="hidden" onChange={handleImageChange} />
        </div>


        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            name='name'
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border-2 border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-0   "
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            name='email'

            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border-2 border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-0  "
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black border-2 hover:border-black transition duration-400 cursor-pointer"
        >
        {user.loading ? 'Saving...' : 'Save'}

        </button>
      </div>
    </div>
  );
}

export default Profile
