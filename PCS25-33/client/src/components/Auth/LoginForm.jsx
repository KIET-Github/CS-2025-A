"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const LoginForm = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/login', {
                username,
                password
            });

            if (response.data.success) {
                const { accessToken, refreshToken, user } = response.data.data;

                // Store tokens securely in cookies
                Cookies.set('accessToken', accessToken, { expires: 7, secure: true, sameSite: 'Strict' });
                Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'Strict' });

                // Store user details in cookies
                Cookies.set('user', JSON.stringify(user), { expires: 7 });

                // Redirect to user dashboard
                router.push('/user');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full flex-1 pt-6">
                <div className="mx-auto max-w-sm">
                    <form onSubmit={handleLogin}>
                        <input
                            className="w-full px-5 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className="w-full px-5 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
                        <button
                            type="submit"
                            className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        >
                            <span className="ml-3">Log In</span>
                        </button>
                    </form>
                    <p className="mt-6 text-sm text-gray-600 text-center font-medium">
                        Don't have an account?{' '}
                        <Link href="/" className="text-indigo-400 font-bold">
                            Register
                        </Link>
                    </p>
                    <p className="mt-2 text-sm text-gray-600 text-center font-medium">
                        <Link href="/admin-login" className="text-indigo-400 font-bold">Log In as Admin</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
