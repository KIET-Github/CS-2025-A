import React from 'react';
import { FaCar, FaMotorcycle } from 'react-icons/fa';

const ParkingSlot = ({ slotNumber, isOccupied, isOutOfOrder, slotType, isWithinAvailableTime, onClick }) => {
  const getColor = () => {
    if (!isWithinAvailableTime) return 'bg-gray-600';  // disabled
    if (isOutOfOrder) return 'bg-gray-500';
    if (isOccupied) return 'bg-red-500';
    return 'bg-green-500';
  };

  const Icon = slotType === 'two_wheeler' ? FaMotorcycle : FaCar;

  return (
    <div
      className={`flex flex-col items-center justify-center w-24 h-24 rounded-lg ${getColor()} text-white cursor-pointer hover:scale-105 transition-transform`}
      onClick={isWithinAvailableTime ? onClick : null}
    >
      <Icon size={28} />
      <span className="text-sm mt-2">Slot {slotNumber}</span>
    </div>
  );
};

export default ParkingSlot;
