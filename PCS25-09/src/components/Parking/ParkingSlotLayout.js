import React from 'react';
import ParkingSlot from './ParkingSlot';

const ParkingSlotLayout = ({ slots, onSlotSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.isArray(slots) && slots.map((slot, index) => (
        <ParkingSlot
          key={index}
          slotNumber={slot.slot_number}
          isOccupied={slot.status === 'occupied'}
          isOutOfOrder={slot.status === 'out_of_order'}
          slotType={slot.slot_type}
          isWithinAvailableTime={true}
          price_per_hour={slot.price_per_hour}
          onClick={() => onSlotSelect(index)}
        />
      ))}
    </div>
  );
};

export default ParkingSlotLayout;
