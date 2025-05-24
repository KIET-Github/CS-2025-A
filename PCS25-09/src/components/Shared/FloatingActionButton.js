import React from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingActionButton = ({ text, link, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      navigate(link);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-primaryGreen text-primaryDark font-bold py-3 px-6 rounded-full shadow-lg hover:bg-teal-400 transition"
    >
      {text}
    </button>
  );
};

export default FloatingActionButton;
