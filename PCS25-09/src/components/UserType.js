import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserType = () => {
  const navigate = useNavigate();

  const handleUserTypeSelection = (type) => {
    localStorage.setItem('userType', type);
    navigate('/welcome'); // ➡️ After selection, user goes to WelcomePage
  };

  return (
    <div className="min-h-screen bg-primaryDark flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold text-white mb-4">Who are you?</h1>
      <p className="text-textMuted mb-8">Choose your option to proceed.</p>

      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => handleUserTypeSelection('vehicle_owner')}
          className="bg-primaryBlue hover:bg-primaryGreen hover:text-primaryDark text-white font-bold py-4 px-8 rounded-lg transition w-64"
        >
          Vehicle Owner
        </button>

        <button
          onClick={() => handleUserTypeSelection('parking_owner')}
          className="bg-primaryBlue hover:bg-primaryGreen hover:text-primaryDark text-white font-bold py-4 px-8 rounded-lg transition w-64"
        >
          Parking Space Owner
        </button>
      </div>
    </div>
  );
};

export default UserType;
