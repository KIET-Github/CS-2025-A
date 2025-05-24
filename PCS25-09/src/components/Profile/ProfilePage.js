import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { getAuthHeader } from '../../utils/auth';

const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];

const ProfilePage = () => {
  const { user, refreshUser } = useAuth();
  const [ownershipAgreement, setOwnershipAgreement] = useState(null);
  const [identityVerification, setIdentityVerification] = useState(null);
  const [identityDocument, setIdentityDocument] = useState(null);
  const [vehicleRegistration, setVehicleRegistration] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  if (!user) return <div className="text-white p-6">Loading...</div>;

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    if (file && !allowedTypes.includes(file.type)) {
      setMessage('Only PDF, JPG, and JPEG files are allowed.');
      setter(null);
      return;
    }
    setter(file);
    setMessage('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');
    const formData = new FormData();
    if (user.user_type === 'parking_owner') {
      if (ownershipAgreement) formData.append('ownership_agreement', ownershipAgreement);
      if (identityVerification) formData.append('identity_verification', identityVerification);
    } else {
      if (identityDocument) formData.append('identity_document', identityDocument);
      if (vehicleRegistration) formData.append('vehicle_registration', vehicleRegistration);
    }
    try {
      await axios.patch('/api/profile/', formData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Documents uploaded successfully!');
      if (typeof refreshUser === 'function') refreshUser();
    } catch (err) {
      setMessage('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  // Helper to get file name from URL
  const getFileName = (url) => url ? url.split('/').pop() : '';
  // Helper to get full file URL
  const getFileUrl = (url) => url && url.startsWith('http') ? url : `${process.env.REACT_APP_API_BASE_URL || ''}${url}`;
  // Helper to get file extension
  const getFileExt = (url) => url ? url.split('.').pop().toLowerCase() : '';

  // Preview logic for a document
  const renderPreview = (url, label) => {
    const ext = getFileExt(url);
    if (ext === 'jpg' || ext === 'jpeg') {
      return <img src={getFileUrl(url)} alt={label + ' Preview'} className="mt-2 max-h-40 rounded border" />;
    } else if (ext === 'pdf') {
      return <iframe src={getFileUrl(url)} title={label + ' PDF Preview'} className="mt-2 w-full max-w-xs h-40 border rounded" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-primaryDark text-white p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="bg-primaryBlue p-6 rounded-lg shadow-lg space-y-4 mb-8">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone_number || 'N/A'}</p>
        <p><strong>Type:</strong> {user.user_type.replace('_', ' ').toUpperCase()}</p>
      </div>
      <form onSubmit={handleUpload} className="bg-primaryBlue p-6 rounded-lg shadow-lg space-y-4">
        {user.user_type === 'parking_owner' ? (
          <>
            <div>
              <label className="block mb-2 font-semibold">Ownership Agreement</label>
              <input type="file" accept=".pdf,.jpg,.jpeg" onChange={handleFileChange(setOwnershipAgreement)} className="mb-2" />
              {user.ownership_agreement && (
                <div>
                  <a href={getFileUrl(user.ownership_agreement)} target="_blank" rel="noopener noreferrer" className="text-primaryGreen underline block">
                    View Uploaded: {getFileName(user.ownership_agreement)}
                  </a>
                  {renderPreview(user.ownership_agreement, 'Ownership Agreement')}
                </div>
              )}
            </div>
            <div>
              <label className="block mb-2 font-semibold">Identity Verification</label>
              <input type="file" accept=".pdf,.jpg,.jpeg" onChange={handleFileChange(setIdentityVerification)} className="mb-2" />
              {user.identity_verification && (
                <div>
                  <a href={getFileUrl(user.identity_verification)} target="_blank" rel="noopener noreferrer" className="text-primaryGreen underline block">
                    View Uploaded: {getFileName(user.identity_verification)}
                  </a>
                  {renderPreview(user.identity_verification, 'Identity Verification')}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block mb-2 font-semibold">Identity Document</label>
              <input type="file" accept=".pdf,.jpg,.jpeg" onChange={handleFileChange(setIdentityDocument)} className="mb-2" />
              {user.identity_document && (
                <div>
                  <a href={getFileUrl(user.identity_document)} target="_blank" rel="noopener noreferrer" className="text-primaryGreen underline block">
                    View Uploaded: {getFileName(user.identity_document)}
                  </a>
                  {renderPreview(user.identity_document, 'Identity Document')}
                </div>
              )}
            </div>
            <div>
              <label className="block mb-2 font-semibold">Vehicle Registration</label>
              <input type="file" accept=".pdf,.jpg,.jpeg" onChange={handleFileChange(setVehicleRegistration)} className="mb-2" />
              {user.vehicle_registration && (
                <div>
                  <a href={getFileUrl(user.vehicle_registration)} target="_blank" rel="noopener noreferrer" className="text-primaryGreen underline block">
                    View Uploaded: {getFileName(user.vehicle_registration)}
                  </a>
                  {renderPreview(user.vehicle_registration, 'Vehicle Registration')}
                </div>
              )}
            </div>
          </>
        )}
        <button
          type="submit"
          className="bg-primaryGreen text-black font-bold py-2 px-6 rounded hover:bg-teal-400 transition"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Documents'}
        </button>
        {message && <div className="mt-2 text-primaryGreen">{message}</div>}
      </form>
    </div>
  );
};

export default ProfilePage;
