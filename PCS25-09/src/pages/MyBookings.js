import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../utils/auth';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/bookings/', { headers: getAuthHeader() });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const activeBookings = bookings.filter(booking => booking.status === 'active');
  const pastBookings = bookings.filter(booking => booking.status === 'completed');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <h2 className="text-xl font-semibold mb-2">Recent Bookings</h2>
      {activeBookings.length > 0 ? (
        <ul>
          {activeBookings.map(booking => (
            <li key={booking.id} className="mb-2">
              {booking.parking_space_name} - {booking.slot_number}
            </li>
          ))}
        </ul>
      ) : (
        <p>No active bookings available.</p>
      )}
      <h2 className="text-xl font-semibold mb-2 mt-4">History</h2>
      {pastBookings.length > 0 ? (
        <ul>
          {pastBookings.map(booking => (
            <li key={booking.id} className="mb-2">
              {booking.parking_space_name} - {booking.slot_number}
            </li>
          ))}
        </ul>
      ) : (
        <p>No past bookings available.</p>
      )}
    </div>
  );
};

export default MyBookings; 