import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardCard from '../Shared/DashboardCard';
import FloatingActionButton from '../Shared/FloatingActionButton';
import { getAuthHeader } from '../../utils/auth';

const VehicleOwnerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [todaySlots, setTodaySlots] = useState([]);
  const [upcomingSlots, setUpcomingSlots] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historySlots, setHistorySlots] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    fetchParkingSpaces();
  }, [searchTerm]);

  const fetchParkingSpaces = async () => {
    try {
      const response = await axios.get(`/api/parking-spaces/`, {
        headers: getAuthHeader(),
      });

      const filtered = response.data.filter(space =>
        space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.location.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setParkingSpaces(filtered);
    } catch (error) {
      console.error('Error fetching parking spaces:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/api/bookings/', {
        headers: getAuthHeader(),
      });

      const now = new Date();
      const today = res.data.filter(b => new Date(b.start_time).toDateString() === now.toDateString());
      const upcoming = res.data.filter(b => new Date(b.start_time) > now);
      const history = res.data.filter(b => new Date(b.end_time) < now);

      setTodaySlots(today);
      setUpcomingSlots(upcoming);
      setHistorySlots(history);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  return (
    <div className="min-h-screen bg-primaryDark text-white p-6">
      <input
        type="text"
        placeholder="Search parking spaces..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 rounded bg-bgDark text-white"
      />

      <h1 className="text-3xl font-bold mb-4">Today's Bookings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {todaySlots.length ? (
          todaySlots.map((slot, i) => (
            <DashboardCard
              key={i}
              image={slot.images?.[0]?.image}
              title={slot.parking_space_detail?.name || slot.parking_space_name || 'Unknown'}
              location={slot.parking_space_detail?.location || 'Unknown'}
              price={slot.price_per_hour || slot.parking_space_detail?.price_per_hour || ''}
              availability={`${new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(slot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              role="vehicle_owner"
              cardWidth="max-w-md"
              onClick={() => window.location.href = `/bookings`}
            />
          ))
        ) : (
          <p>No bookings for today.</p>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-2">Recommended Spaces</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {parkingSpaces.length ? (
          parkingSpaces.map((slot, i) => (
            <DashboardCard
              key={`space-${i}`}
              image={slot.images?.[0]?.image}
              title={slot.name}
              location={slot.location}
              price={slot.price_per_hour}
              availability={`${slot.available_from} - ${slot.available_to}`}
              role="vehicle_owner"
              cardWidth="max-w-md"
              onClick={() => window.location.href = `/parking-space/${slot.id}`}
            />
          ))
        ) : (
          <p className="text-textMuted">No parking spaces found.</p>
        )}
      </div>

      <button
        className="mt-8 text-primaryGreen hover:underline"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? 'Hide Upcoming Bookings' : 'Show Upcoming Bookings'}
      </button>

      {showMore && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingSlots.length ? (
            upcomingSlots.map((slot, i) => (
              <DashboardCard
                key={`upcoming-${i}`}
                image={slot.images?.[0]?.image}
                title={slot.parking_space_detail?.name || slot.parking_space_name || 'Unknown'}
                location={slot.parking_space_detail?.location || 'Unknown'}
                price={slot.price_per_hour || slot.parking_space_detail?.price_per_hour || ''}
                availability={`${new Date(slot.start_time).toLocaleString()} - ${new Date(slot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                role="vehicle_owner"
                cardWidth="max-w-md"
                onClick={() => window.location.href = `/bookings`}
              />
            ))
          ) : (
            <p className="text-textMuted">No upcoming bookings.</p>
          )}
        </div>
      )}

      <button
        className="mt-8 text-primaryGreen hover:underline"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? 'Hide Previous Bookings' : 'Show Previous Bookings'}
      </button>

      {showHistory && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {historySlots.length ? (
            historySlots.map((slot, i) => (
              <DashboardCard
                key={`history-${i}`}
                image={slot.images?.[0]?.image}
                title={slot.parking_space_detail?.name || slot.parking_space_name || 'Unknown'}
                location={slot.parking_space_detail?.location || 'Unknown'}
                price={slot.price_per_hour || slot.parking_space_detail?.price_per_hour || ''}
                availability={`${new Date(slot.start_time).toLocaleString()} - ${new Date(slot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                role="vehicle_owner"
                cardWidth="max-w-md"
                onClick={() => window.location.href = `/bookings`}
              />
            ))
          ) : (
            <p className="text-textMuted">No previous bookings.</p>
          )}
        </div>
      )}

      <FloatingActionButton text="Quick Reserve" link="/parking-spaces" />
    </div>
  );
};

export default VehicleOwnerDashboard;