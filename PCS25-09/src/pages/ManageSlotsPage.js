import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../utils/auth';
import SlotEditor from '../components/Parking/SlotEditor';
import DashboardCard from '../components/Shared/DashboardCard';
import FloatingActionButton from '../components/Shared/FloatingActionButton';

const ManageSlotsPage = () => {
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSpace, setNewSpace] = useState({
    name: '',
    location: '',
    image: null,
    price_per_hour: '0.00',
    available_from: '09:00',
    available_to: '18:00',
    max_duration: 24,
    is_active: true
  });
  const [editSpace, setEditSpace] = useState(null);

  const fetchSpaces = async () => {
    try {
      const res = await axios.get('/api/parking-owner/spaces', { headers: getAuthHeader() });
      setSpaces(res.data);
    } catch (error) {
      console.error('Error fetching spaces:', error);
      if (error.response?.status === 401) {
        alert('Please log in to view your parking spaces');
      } else if (error.response?.status === 403) {
        alert('Only parking owners can access this page');
      } else if (error.response?.data?.error) {
        alert('Error loading parking spaces: ' + error.response.data.error);
      } else {
        alert('Error loading parking spaces. Please try again later.');
      }
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewSpace({ ...newSpace, image: file });
  };

  const saveSpace = async () => {
    try {
      if (!newSpace.name || !newSpace.location || !newSpace.price_per_hour) {
        alert('Please fill in all required fields (Name, Location, Price per Hour)');
        return;
      }

      const formData = new FormData();
      formData.append('name', newSpace.name);
      formData.append('location', newSpace.location);
      formData.append('price_per_hour', parseFloat(newSpace.price_per_hour).toFixed(2));
      formData.append('available_from', newSpace.available_from);
      formData.append('available_to', newSpace.available_to);
      formData.append('max_duration', parseInt(newSpace.max_duration));
      formData.append('is_active', newSpace.is_active);
      if (newSpace.image) formData.append('image', newSpace.image);

      await axios.post('/api/parking-spaces/', formData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data',
        },
      });

      setNewSpace({
        name: '',
        location: '',
        image: null,
        price_per_hour: '0.00',
        available_from: '09:00',
        available_to: '18:00',
        max_duration: 24,
        is_active: true
      });
      setShowAddForm(false);
      fetchSpaces();
      alert('Parking space created successfully!');
    } catch (error) {
      console.error('Error saving space:', error);
      alert('Error saving parking space: ' + (error.response?.data?.message || error.message));
    }
  };

  const saveSlots = async () => {
    try {
      await axios.put(`/api/parking-spaces/${selectedSpace.id}/`, {
        ...selectedSpace,
        slots: selectedSpace.slots,
      }, { headers: getAuthHeader() });
      alert('Slots saved successfully!');
    } catch (error) {
      console.error('Error saving slots:', error);
      alert('Error saving slots: ' + (error.response?.data?.message || error.message));
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

  return (
    <div className="min-h-screen bg-primaryDark text-white p-6">
      <div className="mb-6 flex items-center">
        <h1 className="text-3xl font-bold">Manage Your Parking Spaces</h1>
      </div>

      {/* Parking Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {spaces.map(space => (
          <DashboardCard
            key={space.id}
            image={space.images && space.images[0] ? (space.images[0].image.startsWith('http') ? space.images[0].image : `${process.env.REACT_APP_API_BASE_URL || ''}${space.images[0].image}`) : ''}
            title={space.name}
            location={space.location}
            price={space.price_per_hour}
            availability={`${space.available_from} - ${space.available_to}`}
            role="parking_owner"
            onClick={() => setSelectedSpace(space)}
            cardWidth="max-w-md"
          />
        ))}
      </div>

      {/* Floating Add Button */}
      <FloatingActionButton text="Add New Space" onClick={() => setShowAddForm(true)} />

      {/* Add Space Popup Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-primaryDark rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Add New Space</h2>
            <input
              type="text"
              placeholder="Name *"
              className="w-full p-2 mb-2 text-black rounded"
              value={newSpace.name}
              onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location *"
              className="w-full p-2 mb-2 text-black rounded"
              value={newSpace.location}
              onChange={(e) => setNewSpace({ ...newSpace, location: e.target.value })}
            />
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Price per hour *"
              className="w-full p-2 mb-2 text-black rounded"
              value={newSpace.price_per_hour}
              onChange={(e) => setNewSpace({ ...newSpace, price_per_hour: e.target.value })}
            />
            <div className="flex gap-4 mb-2">
              <div className="flex-1">
                <label className="block text-sm mb-1">Available From</label>
                <input
                  type="time"
                  className="w-full p-2 text-black rounded"
                  value={newSpace.available_from}
                  onChange={(e) => setNewSpace({ ...newSpace, available_from: e.target.value })}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-1">Available To</label>
                <input
                  type="time"
                  className="w-full p-2 text-black rounded"
                  value={newSpace.available_to}
                  onChange={(e) => setNewSpace({ ...newSpace, available_to: e.target.value })}
                />
              </div>
            </div>
            <input
              type="number"
              min="1"
              placeholder="Max Duration (hours)"
              className="w-full p-2 mb-2 text-black rounded"
              value={newSpace.max_duration}
              onChange={(e) => setNewSpace({ ...newSpace, max_duration: Math.max(1, parseInt(e.target.value) || 24) })}
            />
            <div className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={newSpace.is_active}
                  onChange={(e) => setNewSpace({ ...newSpace, is_active: e.target.checked })}
                />
                Space is active and available for booking
              </label>
            </div>
            <input
              type="file"
              accept="image/*"
              className="mb-4"
              onChange={handleImageUpload}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 px-4 py-2 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={saveSpace}
                className="bg-primaryGreen px-4 py-2 text-black rounded hover:bg-teal-400"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slot Editor & Edit Details Popup */}
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
    </div>
  );
};

export default ManageSlotsPage;