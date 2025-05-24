import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BookingConfirmationPage = () => {
  const navigate = useNavigate();
  const { id, slotNumber } = useParams();

  return (
    <div className="min-h-screen bg-primaryDark text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4">Booking Confirmed!</h1>
      <p className="mb-2">Parking Space ID: {id}</p>
      <p className="mb-6">Slot Number: {parseInt(slotNumber) + 1}</p>
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-primaryGreen text-primaryDark font-bold py-2 px-6 rounded hover:bg-teal-400 transition"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default BookingConfirmationPage;
