import React, { useEffect, useState } from 'react';
import DashboardCard from '../Shared/DashboardCard';
import FloatingActionButton from '../Shared/FloatingActionButton';
import axios from 'axios';
import { getAuthHeader } from '../../utils/auth';
import SlotEditor from '../Parking/SlotEditor';

const ParkingOwnerDashboard = () => {
  const [spaces, setSpaces] = useState([]);
  const [todayBookings, setTodayBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [totalEmptySlots, setTotalEmptySlots] = useState(0);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [editSpace, setEditSpace] = useState(null);

  useEffect(() => {
    fetchSpaces();
    fetchTodayBookings();
    fetchUpcomingBookings();
  }, []);

  const fetchSpaces = async () => {
    try {
      const res = await axios.get('/api/parking-owner/spaces', { headers: getAuthHeader() });
      setSpaces(res.data);
      // Calculate total empty slots
      let empty = 0;
      res.data.forEach(space => {
        if (space.slots) {
          empty += space.slots.filter(slot => slot.status === 'available').length;
        }
      });
      setTotalEmptySlots(empty);
    } catch (error) {
      setSpaces([]);
      setTotalEmptySlots(0);
    }
  };

  const fetchTodayBookings = async () => {
    try {
      const res = await axios.get('/api/bookings/today/', { headers: getAuthHeader() });
      setTodayBookings(res.data);
    } catch (error) {
      setTodayBookings([]);
    }
  };

  const fetchUpcomingBookings = async () => {
    try {
      const now = new Date().toISOString();
      const res = await axios.get(`/api/bookings/?status=confirmed&start_time__gt=${now}`, { headers: getAuthHeader() });
      setUpcomingBookings(res.data);
    } catch (error) {
      setUpcomingBookings([]);
    }
  };

  const saveSlots = async () => {
    try {
      await axios.put(`/api/parking-spaces/${selectedSpace.id}/`, {
        ...selectedSpace,
        slots: selectedSpace.slots,
      }, { headers: getAuthHeader() });
      alert('Slots saved successfully!');
      fetchSpaces();
    } catch (error) {
      console.error('Error saving slots:', error);
      alert('Error saving slots: ' + (error.response?.data?.message || error.message));
    }
  };

  const saveEditedSpace = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editSpace.name);
      formData.append('location', editSpace.location);
      formData.append('price_per_hour', parseFloat(editSpace.price_per_hour).toFixed(2));
      formData.append('available_from', editSpace.available_from);
      formData.append('available_to', editSpace.available_to);
      formData.append('max_duration', parseInt(editSpace.max_duration));
      formData.append('is_active', editSpace.is_active);
      if (editSpace.image && typeof editSpace.image !== 'string') {
        formData.append('image', editSpace.image);
      }
      await axios.put(`/api/parking-spaces/${editSpace.id}/`, formData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data',
        },
      });
      setSelectedSpace(null);
      setEditSpace(null);
      fetchSpaces();
      alert('Parking space updated successfully!');
    } catch (error) {
      console.error('Error updating space:', error);
      alert('Error updating parking space: ' + (error.response?.data?.message || error.message));
    }
  };

  const deleteSpace = async () => {
    if (!window.confirm('Are you sure you want to delete this parking space? This action cannot be undone.')) return;
    try {
      await axios.delete(`/api/parking-spaces/${selectedSpace.id}/`, { headers: getAuthHeader() });
      setSelectedSpace(null);
      fetchSpaces();
      alert('Parking space deleted.');
    } catch (error) {
      console.error('Error deleting space:', error);
      alert('Error deleting parking space: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-primaryDark text-white p-6 pb-24">
      <h1 className="text-3xl font-bold mb-2">Parking Owner Dashboard</h1>
      <div className="mb-6 flex flex-wrap gap-6 items-center">
        <div className="bg-primaryBlue rounded-xl px-6 py-4 text-lg font-semibold">Total Empty Slots: {totalEmptySlots}</div>
        <div className="bg-primaryBlue rounded-xl px-6 py-4 text-lg font-semibold">Total Spaces: {spaces.length}</div>
      </div>

      {/* My Spaces */}
      <h2 className="text-2xl font-bold mb-4 mt-8">My Spaces</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {spaces.map(space => {
          // Slot summary by type and status
          const slots = space.slots || [];
          const twoWheeler = slots.filter(s => s.slot_type === 'two_wheeler');
          const fourWheeler = slots.filter(s => s.slot_type === 'four_wheeler');
          const available = slots.filter(s => s.status === 'available').length;
          const occupied = slots.filter(s => s.status === 'occupied').length;
          const outOfOrder = slots.filter(s => s.status === 'out_of_order').length;
          return (
            <DashboardCard
              key={space.id}
              image={space.images && space.images[0] ? (space.images[0].image.startsWith('http') ? space.images[0].image : `${process.env.REACT_APP_API_BASE_URL || ''}${space.images[0].image}`) : ''}
              title={space.name}
              location={space.location}
              price={space.price_per_hour}
              availability={`${space.available_from} - ${space.available_to}`}
              role="parking_owner"
              onClick={() => { setSelectedSpace(space); setEditSpace(null); }}
              cardWidth="max-w-md"
            >
              <div className="mt-2 text-xs text-primaryGreen font-semibold">
                2W: {twoWheeler.length} | 4W: {fourWheeler.length} | Avail: {available} | Occ: {occupied} | Out: {outOfOrder}
              </div>
            </DashboardCard>
          );
        })}
      </div>

      {/* Edit Space Popup */}
      {selectedSpace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-primaryDark rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Edit Parking Space: {selectedSpace.name}</h2>
              <button
                onClick={() => { setSelectedSpace(null); setEditSpace(null); }}
                className="text-white hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            {/* Editable fields for space details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                className="p-2 rounded text-black"
                value={editSpace ? editSpace.name : selectedSpace.name}
                onChange={e => setEditSpace({ ...(editSpace || selectedSpace), name: e.target.value })}
                placeholder="Name"
              />
              <input
                type="text"
                className="p-2 rounded text-black"
                value={editSpace ? editSpace.location : selectedSpace.location}
                onChange={e => setEditSpace({ ...(editSpace || selectedSpace), location: e.target.value })}
                placeholder="Location"
              />
              <input
                type="number"
                className="p-2 rounded text-black"
                value={editSpace ? editSpace.price_per_hour : selectedSpace.price_per_hour}
                onChange={e => setEditSpace({ ...(editSpace || selectedSpace), price_per_hour: e.target.value })}
                placeholder="Price per hour"
              />
              <input
                type="number"
                className="p-2 rounded text-black"
                value={editSpace ? editSpace.max_duration : selectedSpace.max_duration}
                onChange={e => setEditSpace({ ...(editSpace || selectedSpace), max_duration: e.target.value })}
                placeholder="Max Duration (hours)"
              />
              <input
                type="time"
                className="p-2 rounded text-black"
                value={editSpace ? editSpace.available_from : selectedSpace.available_from}
                onChange={e => setEditSpace({ ...(editSpace || selectedSpace), available_from: e.target.value })}
                placeholder="Available From"
              />
              <input
                type="time"
                className="p-2 rounded text-black"
                value={editSpace ? editSpace.available_to : selectedSpace.available_to}
                onChange={e => setEditSpace({ ...(editSpace || selectedSpace), available_to: e.target.value })}
                placeholder="Available To"
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={editSpace ? editSpace.is_active : selectedSpace.is_active}
                  onChange={e => setEditSpace({ ...(editSpace || selectedSpace), is_active: e.target.checked })}
                />
                <span>Active</span>
              </div>
              <input
                type="file"
                accept="image/*"
                className="p-2"
                onChange={e => setEditSpace({ ...(editSpace || selectedSpace), image: e.target.files[0] })}
              />
            </div>
            {/* Slot Editor */}
            <SlotEditor
              slots={selectedSpace.slots || []}
              onStatusChange={(i, value) => {
                const updated = [...selectedSpace.slots];
                updated[i].status = value;
                setSelectedSpace({ ...selectedSpace, slots: updated });
              }}
              onTypeChange={(i, value) => {
                const updated = [...selectedSpace.slots];
                updated[i].slot_type = value;
                setSelectedSpace({ ...selectedSpace, slots: updated });
              }}
              onDelete={(i) => {
                const updated = [...selectedSpace.slots];
                updated.splice(i, 1);
                setSelectedSpace({ ...selectedSpace, slots: updated });
              }}
              onAdd={(type, qty) => {
                const updated = [...(selectedSpace.slots || [])];
                for (let j = 0; j < qty; j++) {
                  updated.push({
                    slot_type: type,
                    status: 'available',
                  });
                }
                setSelectedSpace({ ...selectedSpace, slots: updated });
              }}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => { setSelectedSpace(null); setEditSpace(null); }}
                className="bg-gray-500 px-4 py-2 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={saveSlots}
                className="bg-primaryGreen px-4 py-2 text-black rounded hover:bg-teal-400"
              >
                Save Slots
              </button>
              <button
                onClick={saveEditedSpace}
                className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-600"
              >
                Save Details
              </button>
              <button
                onClick={deleteSpace}
                className="bg-red-600 px-4 py-2 text-white rounded hover:bg-red-800"
              >
                Delete Space
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bookings for Today */}
      <h2 className="text-2xl font-bold mb-4 mt-8">Bookings for Today</h2>
      <div className="bg-primaryBlue rounded-xl p-4 mb-10">
        {todayBookings.length === 0 ? (
          <div className="text-textLight">No bookings for today.</div>
        ) : (
          <ul>
            {todayBookings.map(booking => (
              <li key={booking.id} className="mb-2">
                <span className="font-semibold">{booking.parking_space?.name}</span> - {booking.user?.username} ({booking.start_time} to {booking.end_time})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Upcoming Bookings */}
      <h2 className="text-2xl font-bold mb-4 mt-8">Upcoming Bookings</h2>
      <div className="bg-primaryBlue rounded-xl p-4 mb-10">
        {upcomingBookings.length === 0 ? (
          <div className="text-textLight">No upcoming bookings.</div>
        ) : (
          <ul>
            {upcomingBookings.map(booking => (
              <li key={booking.id} className="mb-2">
                <span className="font-semibold">{booking.parking_space?.name}</span> - {booking.user?.username} ({booking.start_time} to {booking.end_time})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Floating Add Button */}
      <FloatingActionButton text="Add New Space" link="/manage-spaces" />
    </div>
  );
};

export default ParkingOwnerDashboard;
