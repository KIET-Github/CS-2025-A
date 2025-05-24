import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.username, formData.password);
    if (success) navigate('/dashboard');
    else setError('Invalid credentials');
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/auth/login/google-oauth2/`;
  };

  return (
    <div className="min-h-screen bg-primaryDark flex items-center justify-center p-6">
      <div className="bg-primaryBlue p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Welcome Back</h2>
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
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-bgDark text-white"
          />
          <button type="submit" className="w-full bg-primaryGreen text-primaryDark font-bold py-2 rounded hover:bg-teal-400 transition">
            Login
          </button>
        </form>
        <div className="my-4 text-center text-white">OR</div>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-primaryDark font-bold py-2 rounded"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
