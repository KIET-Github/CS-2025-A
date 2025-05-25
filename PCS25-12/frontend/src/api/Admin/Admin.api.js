import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

// Function to retrieve the auth token
const getAuthToken = () => localStorage.getItem('authToken');

// Configure axios instance for API requests
const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set the Authorization header for all requests
apiClient.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Admin login
export const adminLogin = async (email, password) => {
  try {
    const response = await apiClient.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch students
export const fetchStudentsFromAPI = async () => {
  try {
    const response = await apiClient.get('/api/admin/students');
    return response.data;
  } catch (error) {
    console.error("Error fetching student data:", error.message);
    throw error;
  }
};

// Fetch companies
export const fetchCompaniesFromAPI = async () => {
  try {
    const response = await apiClient.get('/api/admin/companies');
    return response.data;
  } catch (error) {
    console.error("Error fetching company data:", error.message);
    throw error;
  }
};

// Get company by ID
export const getCompanyById = async (companyId) => {
  try {
    const response = await apiClient.get(`/api/admin/companies/${companyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all HODs
export const getAllHods = async () => {
  try {
    const response = await apiClient.get('http://localhost:5000/api/getHODDetails');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Change admin password
export const changeAdminPassword = async ({ email, oldPassword, newPassword }) => {
  try {
    const response = await apiClient.post('/api/admin/change-password', { email, oldPassword, newPassword });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Ensure getHodData is exported
export const getHodData = async () => {
    try {
      const response = await apiClient.get('/api/admin/hods');
      return response.data;
    } catch (error) {
      throw error;
    }
  };
