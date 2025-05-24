// src/pages/VehicleOwnerProfilePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../utils/auth';

const VehicleOwnerProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get('/api/profile/', {
        headers: getAuthHeader(),
      });
      setUser(res.data);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      await axios.put('/api/profile/', user, {
        headers: getAuthHeader(),
      });
      alert('Profile updated');
    } catch (err) {
      console.error(err);
      alert('Error updating profile');
    }
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-primaryDark text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Vehicle Owner Profile</h1>
      <label className="block mb-2">Username</label>
      <input
        type="text"
        className="w-full p-2 rounded text-black"
        value={user.username}
        disabled
      />
      <label className="block mt-4">Email</label>
      <input
        type="email"
        className="w-full p-2 rounded text-black"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label className="block mt-4">Phone Number</label>
      <input
        type="text"
        className="w-full p-2 rounded text-black"
        value={user.phone_number || ''}
        onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
      />
      <button
        onClick={handleSave}
        className="mt-6 bg-primaryGreen text-primaryDark px-6 py-2 rounded hover:bg-teal-400"
      >
        Save Changes
      </button>
    </div>
  );
};

export default VehicleOwnerProfilePage;