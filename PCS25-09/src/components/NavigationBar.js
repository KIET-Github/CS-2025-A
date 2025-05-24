import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavigationBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <nav className="bg-primaryDark px-6 py-4 flex justify-between items-center shadow-md">
      <Link
        to={user ? '/dashboard' : '/'}
        className="text-primaryGreen text-2xl font-bold"
      >
        ParkEzy
      </Link>

      {user ? (
        <div className="relative">
          <div
            className="w-10 h-10 bg-primaryGreen flex items-center justify-center rounded-full text-primaryDark font-bold cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {getInitials(user.username)}
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-primaryBlue rounded-lg overflow-hidden shadow-xl z-50 animate-fade-in-down">
              <Link to="/profile" className="block px-4 py-3 text-white hover:bg-primaryGreen">Profile</Link>
              <Link to="/bookings" className="block px-4 py-3 text-white hover:bg-primaryGreen">My Bookings</Link>
              {user.user_type === 'parking_owner' && (

                <Link to="/manage-spaces" className="block px-4 py-3 text-white hover:bg-primaryGreen">Manage Spaces</Link>

              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 text-white hover:bg-primaryGreen"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-x-4">
          <Link to="/login" className="text-white hover:text-primaryGreen">Login</Link>
          <Link to="/signup" className="text-white hover:text-primaryGreen">Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
