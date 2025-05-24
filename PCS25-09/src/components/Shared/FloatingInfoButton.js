import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';

const FloatingInfoButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/about')}
      className="fixed bottom-6 left-6 bg-primaryGreen text-primaryDark rounded-full p-4 shadow-lg hover:bg-teal-400 transition"
    >
      <FaInfoCircle size={24} />
    </button>
  );
};

export default FloatingInfoButton;
