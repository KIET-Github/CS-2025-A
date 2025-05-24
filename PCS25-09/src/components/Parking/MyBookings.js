import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../../utils/auth';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isThisWeek(date) {
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);
  return date >= weekStart && date < weekEnd;
}

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [revenueData, setRevenueData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/bookings/', {
          headers: getAuthHeader()
        });
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load bookings');
        setLoading(false);
        console.error(err);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    if (user?.user_type === 'parking_owner') {
      calculateRevenue(bookings);
    }
    // eslint-disable-next-line
  }, [bookings, user]);

  const handleCancelBooking = async (id) => {
    try {
      await axios.post(`/api/bookings/${id}/cancel/`, {}, {
        headers: getAuthHeader()
      });
      setBookings(bookings.map(booking =>
        booking.id === id
          ? { ...booking, status: 'cancelled' }
          : booking
      ));
    } catch (err) {
      setError('Failed to cancel booking');
      console.error(err);
    }
  };

  // Group bookings
  const todayBookings = bookings.filter(b => isToday(new Date(b.start_time)));
  const upcomingBookings = bookings.filter(b => {
    const d = new Date(b.start_time);
    return d > new Date() && isThisWeek(d);
  });
  const historyBookings = bookings.filter(b => new Date(b.end_time) < new Date());

  // Revenue calculation for the last 7 days
  function calculateRevenue(bookings) {
    const days = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      days.push({
        date: d.toLocaleDateString(),
        revenue: 0
      });
    }
    bookings.forEach(b => {
      if (b.status === 'confirmed') {
        const d = new Date(b.start_time).toLocaleDateString();
        const idx = days.findIndex(day => day.date === d);
        if (idx !== -1) {
          days[idx].revenue += parseFloat(b.price_per_hour || 0);
        }
      }
    });
    setRevenueData(days);
  }

  // Pie chart data for this week
  const weekBookings = bookings.filter(b => isThisWeek(new Date(b.start_time)));
  const statusCounts = weekBookings.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {});
  const statusPieDataRaw = Object.entries(statusCounts).map(([status, count]) => ({ name: status.charAt(0).toUpperCase() + status.slice(1), value: count }));
  const statusColors = ['#34d399', '#f87171', '#fbbf24', '#a3a3a3'];
  const statusPieData = statusPieDataRaw.length > 0 && statusPieDataRaw.some(d => d.value > 0)
    ? statusPieDataRaw
    : [{ name: 'No Data', value: 1 }];
  const statusPieColors = statusPieDataRaw.length > 0 && statusPieDataRaw.some(d => d.value > 0)
    ? statusColors
    : ['#a3a3a3'];

  // Vehicle type breakdown (if available)
  const typeCounts = weekBookings.reduce((acc, b) => {
    const type = b.slot_type || b.parking_space_detail?.slot_type || b.parking_space?.slot_type || 'Unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  const typePieDataRaw = Object.entries(typeCounts).map(([type, count]) => ({ name: type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()), value: count }));
  const typeColors = ['#60a5fa', '#fbbf24', '#a3a3a3'];
  const typePieData = typePieDataRaw.length > 0 && typePieDataRaw.some(d => d.value > 0)
    ? typePieDataRaw
    : [{ name: 'No Data', value: 1 }];
  const typePieColors = typePieDataRaw.length > 0 && typePieDataRaw.some(d => d.value > 0)
    ? typeColors
    : ['#a3a3a3'];

  if (loading) {
    return <div className="text-center py-8 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {/* Only show charts for parking owner */}
      {user?.user_type === 'parking_owner' && (
        <div className="bg-primaryBlue rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Weekly Revenue</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="revenue" fill="#34d399" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {/* Pie Charts Row */}
          <div className="flex flex-col md:flex-row gap-8 justify-center mt-8">
            {/* Booking Status Pie Chart */}
            <div className="flex-1 flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-2">Booking Status (This Week)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={statusPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                    {statusPieData.map((entry, idx) => (
                      <Cell key={`cell-status-${idx}`} fill={statusPieColors[idx % statusPieColors.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Vehicle Type Pie Chart */}
            <div className="flex-1 flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-2">Vehicle Type (This Week)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={typePieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                    {typePieData.map((entry, idx) => (
                      <Cell key={`cell-type-${idx}`} fill={typePieColors[idx % typePieColors.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Today's Bookings */}
      <h2 className="text-2xl font-bold mb-4">Today's Bookings</h2>
      <div className="space-y-4 mb-8">
        {todayBookings.length > 0 ? todayBookings.map((booking) => (
          <div key={booking.id} className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-semibold">{booking.parking_space_detail?.name || booking.parking_space?.name}</h2>
            <p className="text-gray-400 mb-1">Location: {booking.parking_space_detail?.location || booking.parking_space?.location}</p>
            <p className="text-gray-400 mb-1">
              Date: {new Date(booking.start_time).toLocaleDateString()}
            </p>
            <p className="text-gray-400 mb-1">
              Time: {new Date(booking.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
              {new Date(booking.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className={`mb-3 ${
              booking.status === 'confirmed' ? 'text-green-500' :
                booking.status === 'cancelled' ? 'text-red-500' : 'text-yellow-500'
              }`}>
              Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </p>
            {booking.status === 'confirmed' && (
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Cancel Booking
              </button>
            )}
          </div>
        )) : <p className="text-center text-gray-400 py-8">No bookings for today.</p>}
      </div>

      {/* Upcoming Bookings */}
      <h2 className="text-2xl font-bold mb-4">Upcoming Bookings (This Week)</h2>
      <div className="space-y-4 mb-8">
        {upcomingBookings.length > 0 ? upcomingBookings.map((booking) => (
          <div key={booking.id} className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-semibold">{booking.parking_space_detail?.name || booking.parking_space?.name}</h2>
            <p className="text-gray-400 mb-1">Location: {booking.parking_space_detail?.location || booking.parking_space?.location}</p>
            <p className="text-gray-400 mb-1">
              Date: {new Date(booking.start_time).toLocaleDateString()}
            </p>
            <p className="text-gray-400 mb-1">
              Time: {new Date(booking.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
              {new Date(booking.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className={`mb-3 ${
              booking.status === 'confirmed' ? 'text-green-500' :
                booking.status === 'cancelled' ? 'text-red-500' : 'text-yellow-500'
              }`}>
              Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </p>
            {booking.status === 'confirmed' && (
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Cancel Booking
              </button>
            )}
          </div>
        )) : <p className="text-center text-gray-400 py-8">No upcoming bookings for this week.</p>}
      </div>

      {/* Booking History */}
      <h2 className="text-2xl font-bold mb-4">Booking History</h2>
      <div className="space-y-4 mb-8">
        {historyBookings.length > 0 ? historyBookings.map((booking) => (
          <div key={booking.id} className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-semibold">{booking.parking_space_detail?.name || booking.parking_space?.name}</h2>
            <p className="text-gray-400 mb-1">Location: {booking.parking_space_detail?.location || booking.parking_space?.location}</p>
            <p className="text-gray-400 mb-1">
              Date: {new Date(booking.start_time).toLocaleDateString()}
            </p>
            <p className="text-gray-400 mb-1">
              Time: {new Date(booking.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
              {new Date(booking.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className={`mb-3 ${
              booking.status === 'confirmed' ? 'text-green-500' :
                booking.status === 'cancelled' ? 'text-red-500' : 'text-yellow-500'
              }`}>
              Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </p>
          </div>
        )) : <p className="text-center text-gray-400 py-8">No previous bookings.</p>}
      </div>
    </div>
  );
};

export default MyBookings;