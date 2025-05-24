import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const ParkingSpacesList = () => {
  const [spaces, setSpaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get('/api/parking-spaces/', { headers: getAuthHeader() });
        setSpaces(response.data);
      } catch (err) {
        console.error('Failed to fetch parking spaces', err);
      }
    };
    fetchSpaces();
  }, []);

  const handleBook = (id) => navigate(`/parking-space/${id}`);

  return (
    <div className="min-h-screen bg-primaryDark text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Available Parking Spaces</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {spaces.length ? spaces.map(space => (
          <div key={space.id} className="bg-primaryBlue p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">{space.name}</h2>
              <p className="text-textMuted">{space.location}</p>
              <p className="text-textMuted mt-2">₹{space.price_per_hour} / hour</p>
            </div>
            <button
              onClick={() => handleBook(space.id)}
              className="mt-4 bg-primaryGreen text-primaryDark font-bold py-2 rounded hover:bg-teal-400 transition"
            >
              Book Now
            </button>
          </div>
        )) : <p className="text-textMuted">No parking spaces available</p>}
      </div>
    </div>
  );
};

export default ParkingSpacesList;
