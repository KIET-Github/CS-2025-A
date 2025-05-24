import React, { useState } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = { width: '100%', height: '300px' };
const defaultCenter = { lat: 28.6139, lng: 77.2090 }; // Example: New Delhi

const AddParkingSpace = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price_per_hour: '',
    available_from: '',
    available_to: '',
    max_duration: '',
    latitude: '',
    longitude: '',
  });
  const [error, setError] = useState('');
  const [marker, setMarker] = useState(null);
  const navigate = useNavigate();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyA9wQwQwQwQwQwQwQwQwQwQwQwQwQwQwQ',
    libraries: ['places'],
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarker({ lat, lng });
    setFormData({ ...formData, latitude: lat, longitude: lng });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/parking-spaces/', formData, { headers: getAuthHeader() });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to add parking space.');
    }
  };

  return (
    <div className="min-h-screen bg-primaryDark text-white p-6 flex justify-center items-center">
      <div className="bg-primaryBlue p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Parking Space</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange}
            className="w-full p-3 rounded bg-bgDark text-white" required />
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange}
            className="w-full p-3 rounded bg-bgDark text-white" required />
          <input type="number" name="price_per_hour" placeholder="Price per Hour" value={formData.price_per_hour} onChange={handleChange}
            className="w-full p-3 rounded bg-bgDark text-white" required />
          <input type="time" name="available_from" value={formData.available_from} onChange={handleChange}
            className="w-full p-3 rounded bg-bgDark text-white" required />
          <input type="time" name="available_to" value={formData.available_to} onChange={handleChange}
            className="w-full p-3 rounded bg-bgDark text-white" required />
          <input type="number" name="max_duration" placeholder="Max Duration (hrs)" value={formData.max_duration} onChange={handleChange}
            className="w-full p-3 rounded bg-bgDark text-white" required />
          <div>
            <label className="block mb-2 font-semibold">Set Location on Map</label>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={marker || defaultCenter}
                onClick={handleMapClick}
              >
                {marker && <Marker position={marker} />}
              </GoogleMap>
            ) : (
              <div>Loading map...</div>
            )}
            {marker && (
              <div className="mt-2 text-sm text-primaryGreen">
                Latitude: {marker.lat.toFixed(6)}, Longitude: {marker.lng.toFixed(6)}
              </div>
            )}
          </div>
          <button type="submit"
            className="w-full bg-primaryGreen text-primaryDark font-bold py-3 rounded hover:bg-teal-400 transition">
            Add Space
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddParkingSpace;
