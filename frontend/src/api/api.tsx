import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001/api',
  timeout: 10000, // 10 seconds
});

export default api;
