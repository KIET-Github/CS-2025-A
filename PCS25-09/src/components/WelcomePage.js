import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primaryDark flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold text-white mb-4">Welcome to ParkEzy</h1>
      <p className="text-textMuted text-lg mb-10">
        Find parking or manage spaces with ease.
      </p>

      <button
        onClick={() => navigate('/signup')}
        className="bg-primaryGreen hover:bg-teal-400 text-primaryDark font-bold py-3 px-8 rounded-full transition"
      >
        Get Started
      </button>

      <p className="mt-6 text-textMuted">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/login')}
          className="text-primaryGreen hover:underline cursor-pointer"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default WelcomePage;
