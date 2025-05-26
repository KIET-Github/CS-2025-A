import axios from 'axios';

// Base URL for API requests
const baseURL = process.env.REACT_APP_BASE_URL;

// Function to get the authentication token from local storage
const getAuthToken = () => localStorage.getItem('authToken');

// Function to get the studentId from local storage
const getStudentId = () => localStorage.getItem('studentId');


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

// Student login function
export const studentLogin = async (email, password) => {
  try {
    const response = await apiClient.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Change student password
export const changeStudentPassword = async ({ email, oldPassword, newPassword }) => {
  try {
    const response = await apiClient.post('/api/student/change-password', { email, oldPassword, newPassword });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Fetch applied companies
export const fetchAppliedCompanies = async () => {
  try {
    const response = await apiClient.get('/student/applied');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Fetch student education details
export const fetchStudentEducation = async () => {
  try {
    const studentId = getStudentId(); // Retrieve studentId from local storage
    if (!studentId) {
      throw new Error("Student ID not found");
    }

    const response = await apiClient.get(`/api/education/${studentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// Student.api.js

export async function updateEducationDetails(educationId, updatedData) {
  const token = localStorage.getItem("token"); // Assuming you have JWT token for authentication stored in localStorage
  const apiUrl = `http://localhost:5000/api/education/${educationId}`; // Replace with your actual API URL

  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // If authorization is required
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update education details:", error);
    throw error; // Re-throw the error so it can be handled in the calling function
  }
}


// Fetch upcoming companies
export const fetchUpcomingCompanies = async () => {
  try {
    const response = await apiClient.get('/student/upcoming-companies');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// Add new education details
export const addEducationDetails = async (newData) => {
  try {
    const studentId = getStudentId(); // Get student ID from local storage
    if (!studentId) {
      throw new Error("Student ID not found");
    }

    const response = await apiClient.post(`http://localhost:5000/api/education-details/${studentId}`, newData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
