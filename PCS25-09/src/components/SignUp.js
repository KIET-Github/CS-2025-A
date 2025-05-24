import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '', phone_number: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register/`, {
        ...formData,
        user_type: localStorage.getItem('userType') || 'vehicle_owner',
      });
      navigate('/login');
    } catch {
      setError('Signup failed');
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/auth/login/google-oauth2/`;
  };

  return (
    <div className="min-h-screen bg-primaryDark flex items-center justify-center p-6">
      <div className="bg-primaryBlue p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Create an Account</h2>
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
            required
            className="w-full p-3 rounded bg-bgDark text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-bgDark text-white"
          />
          <button type="submit" className="w-full bg-primaryGreen text-primaryDark font-bold py-2 rounded hover:bg-teal-400 transition">
            Sign Up
          </button>
        </form>
        <div className="my-4 text-center text-white">OR</div>
        <button
          onClick={handleGoogleSignup}
          className="w-full bg-white text-primaryDark font-bold py-2 rounded"
        >
          Sign Up with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
