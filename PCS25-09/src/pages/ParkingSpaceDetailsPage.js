import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ParkingSlotLayout from '../components/Parking/ParkingSlotLayout';
import ParkingSlotModal from '../components/Parking/ParkingSlotModal';
import { getAuthHeader } from '../utils/auth';

const ParkingSpaceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parkingSpace, setParkingSpace] = useState(null);
  const [modalSlotIndex, setModalSlotIndex] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
        const res = await axios.get(`/api/parking-spaces/${id}/`, {
          headers: getAuthHeader(),
        });
      
        const slots = res.data.slots || []; // no fallback to dummy anymore
      
        setParkingSpace({ ...res.data, slots });
      };

    fetchDetails();
  }, [id]);

  const handleConfirmBooking = (hours) => {
    const slot = parkingSpace.slots[modalSlotIndex];
    navigate(`/checkout/${id}/${slot.slot_number}?hours=${hours}`);
  };

  if (!parkingSpace) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-primaryDark text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{parkingSpace.name}</h1>
      <p className="mb-6">{parkingSpace.location}</p>

      {(!parkingSpace.slots || parkingSpace.slots.length === 0) ? (
        <div className="text-center text-red-400 text-lg font-semibold my-8">
          No slots available
        </div>
      ) : (
        <ParkingSlotLayout
          slots={parkingSpace.slots}
          onSlotSelect={(index) => setModalSlotIndex(index)}
        />
      )}

      {modalSlotIndex !== null && (
        <ParkingSlotModal
          slot={parkingSpace.slots[modalSlotIndex]}
          onClose={() => setModalSlotIndex(null)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
};

export default ParkingSpaceDetailsPage;