import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAuthHeader } from '../../utils/auth';

const BookParking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parkingSpace, setParkingSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingData, setBookingData] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: ''
  });
  const [existingBookings, setExistingBookings] = useState([]);

  useEffect(() => {
    const fetchParkingSpace = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/parking-spaces/${id}/`);
        setParkingSpace(response.data);
        
        // Set default times based on parking space availability
        setBookingData(prev => ({
          ...prev,
          startTime: response.data.available_from,
          endTime: response.data.available_to
        }));
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load parking space details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchParkingSpace();
  }, [id]);

  useEffect(() => {
    // Fetch existing bookings for this space and date
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`/api/bookings/?parking_space=${id}&date=${bookingData.date}`);
        setExistingBookings(res.data);
      } catch (err) {
        setExistingBookings([]);
      }
    };
    if (bookingData.date) fetchBookings();
  }, [id, bookingData.date]);

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  function isTimeWithinAvailability(start, end, availableFrom, availableTo) {
    return start >= availableFrom && end <= availableTo && start < end;
  }

  function isOverlapping(start, end, bookings) {
    for (const b of bookings) {
      const bStart = b.start_time.split('T')[1].slice(0,5);
      const bEnd = b.end_time.split('T')[1].slice(0,5);
      if ((start < bEnd && end > bStart)) {
        return true;
      }
    }
    return false;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { startTime, endTime, date } = bookingData;
    if (!isTimeWithinAvailability(startTime, endTime, parkingSpace.available_from, parkingSpace.available_to)) {
      setError(`Selected time must be within the space's availability: ${parkingSpace.available_from} - ${parkingSpace.available_to}`);
      return;
    }
    if (isOverlapping(startTime, endTime, existingBookings)) {
      setError('Selected time overlaps with another booking. Please choose a different time.');
      return;
    }
    try {
      // Format the date and time for the API
      const startDateTime = `${date}T${startTime}:00`;
      const endDateTime = `${date}T${endTime}:00`;
      
      await axios.post('/api/bookings/', {
        parking_space: id,
        start_time: startDateTime,
        end_time: endDateTime
      }, {
        headers: getAuthHeader()
      });
      
      navigate('/bookings');
    } catch (err) {
      setError('Booking failed. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!parkingSpace) {
    return <div className="text-center py-8 text-white">Parking space not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Book Parking Space</h1>
      
      <div className="bg-gray-800 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">{parkingSpace.name}</h2>
        <p className="text-gray-400 mb-2">Location: {parkingSpace.location}</p>
        <p className="text-gray-400 mb-2">Pricing: ${parkingSpace.price_per_hour} per hour</p>
        <p className="text-gray-400 mb-4">
          Available Times: {parkingSpace.available_from} - {parkingSpace.available_to}
        </p>
      </div>
      
      <div className="bg-gray-800 p-6 rounded">
        <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={bookingData.date}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={bookingData.startTime}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">End Time</label>
            <input
              type="time"
              name="endTime"
              value={bookingData.endTime}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookParking;