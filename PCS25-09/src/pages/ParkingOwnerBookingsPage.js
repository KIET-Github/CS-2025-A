import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../utils/auth';

const ParkingOwnerBookingsPage = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await axios.get('/api/parking-owner/spaces', {
          headers: getAuthHeader(),
        });
        setSpaces(res.data);
      } catch (err) {
        console.error('Error fetching spaces:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSpaces();
  }, []);

  if (loading) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-primaryDark text-white p-6">
      <h1 className="text-3xl font-bold mb-6">My Managed Spaces</h1>
      {spaces.length === 0 ? (
        <p className="text-gray-400">No spaces found.</p>
      ) : (
        <ul className="space-y-4">
          {spaces.map((space) => (
            <li key={space.id} className="bg-primaryBlue p-4 rounded">
              <h2 className="text-xl font-semibold">{space.name}</h2>
              <p>{space.location}</p>
              <p>{space.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ParkingOwnerBookingsPage;