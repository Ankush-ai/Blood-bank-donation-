import axios from 'axios';

// Ensure the backend URL matches where the PHP files are served.
const API_URL = import.meta.env.VITE_API_URL || 'https://blood-bank-donation.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = (userData) => api.post('/register', userData);
export const loginUser = (credentials) => api.post('/login', credentials);
export const getAvailableSamples = () => api.get('/samples');
export const addBloodSample = (data) => api.post('/add-blood', data);
export const requestSample = (data) => api.post('/request-sample', data);
export const getHospitalRequests = (hospitalId) => api.get(`/requests?hospital_id=${hospitalId}`);

export default api;
