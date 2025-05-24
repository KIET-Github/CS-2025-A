import React, { useState } from 'react';

const ParkingSlotModal = ({ slot, onClose, onConfirm }) => {
  const [hours, setHours] = useState(1);

  // Ensure price is a number and hours is parsed as integer
  const pricePerHour = Number(slot.price_per_hour) || 0;
  const bookingHours = Number(hours) || 1;
  const totalPrice = pricePerHour * bookingHours;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white text-black p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-primaryGreen">Reserve Slot {slot.slot_number + 1}</h2>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Booking Duration (hrs):</label>
          <input
            type="number"
            min="1"
            max="24"
            value={hours}
            onChange={(e) => setHours(e.target.value.replace(/^0+/, ''))}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryGreen"
          />
        </div>

        <div className="mb-4 p-4 rounded bg-gray-100 text-black">
          <div className="mb-1">
            <span className="font-semibold">Price per hour:</span> ₹{pricePerHour.toLocaleString()}
          </div>
          <div className="mb-1">
            <span className="font-semibold">Total:</span>
            <span className="text-primaryGreen font-bold text-lg ml-2">₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(bookingHours)}
            className="px-6 py-2 bg-primaryGreen text-primaryDark font-bold rounded hover:bg-teal-400"
            disabled={bookingHours < 1}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParkingSlotModal;