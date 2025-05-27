"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/register', formData);
            setMessage({ text: response.data.message, type: 'success' });
        } catch (error) {
            console.log(error.response)
            const errorMsg = error.response?.data || 'Something went wrong. Please try again.';
            setMessage({ text: errorMsg, type: 'error' });
        }
    };

    return (
        <div className="mt-6 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
            <div className="w-full flex-1">
                <form onSubmit={handleSubmit} className="mx-auto max-w-sm pt-8">
                    <input
                        className="w-full px-5 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white mb-4"
                        type="text"
                        placeholder="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full px-5 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white mb-4"
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full px-5 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white mb-4"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full px-5 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="mt-4 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                        <span className="ml-3">Sign Up</span>
                    </button>
                    {message.text && (
                        <p className={`mt-4 text-center font-medium ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                            {message.text}
                        </p>
                    )}
                    <p className="mt-6 text-sm text-gray-600 text-center font-medium">
                        Already have an account?{' '}
                        <Link href="/login" className="text-indigo-400 font-bold">Log In</Link>
                    </p>
                    <p className="mt-2 text-sm text-gray-600 text-center font-medium">
                        <Link href="/admin-login" className="text-indigo-400 font-bold">Log In as Admin</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
