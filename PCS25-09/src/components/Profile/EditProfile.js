import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { getAuthHeader } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/profile/', formData, { headers: getAuthHeader() });
      navigate('/profile');
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  return (
    <div className="min-h-screen bg-primaryDark text-white p-6 flex flex-col items-center justify-center">
      <div className="bg-primaryBlue p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-bgDark text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-bgDark text-white"
          />
          <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full p-3 rounded bg-bgDark text-white"
          />
          <button type="submit" className="w-full bg-primaryGreen text-primaryDark font-bold py-3 rounded hover:bg-teal-400 transition">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
