import axios from 'axios';

// Base URL for API requests
const baseURL = process.env.REACT_APP_BASE_URL;

// Function to get the authentication token from local storage
const getAuthToken = () => localStorage.getItem('authToken');

// Create an Axios instance for API calls
const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the auth token in all requests
apiClient.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// Login function for companies
export const companyLogin = async (email, password) => {
  try {
    const response = await apiClient.post('/api/login/company', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Change company password
export const changeCompanyPassword = async ({ email, oldPassword, newPassword }) => {
  try {
    const response = await apiClient.post('/api/company/change-password', { email, oldPassword, newPassword });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Add a job role
export const addJobRole = async (formData) => {
  try {
    const response = await apiClient.post('/api/company/add-job-role', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get job applications
export const getApplications = async () => {
  try {
    const response = await apiClient.get('/api/company/applications');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get dashboard details
export const getDashboardDetails = async () => {
  try {
    const response = await apiClient.get('/api/companies/dashboard');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Fetch job listings
export const fetchJobListings = async () => {
  try {
    const response = await fetch(`${baseURL}/jobs`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch job listings');
    }

    return response.json();
  } catch (error) {
    throw error.message || error;
  }
};
