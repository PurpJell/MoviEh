import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BACKEND_URL === undefined ? 'http://localhost:8000/rest-api' : process.env.REACT_APP_BASE_URL,
});

export default api;