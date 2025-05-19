import axios from 'axios';


export const api = axios.create({
  baseURL: 'http://localhost:8081/',
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('jwtToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      console.error('❌ Access forbidden: You do not have the required permissions.');
      alert('❌ Access forbidden: Please check your permissions or log in again.');
    }
    return Promise.reject(error);
  }
);

export default api;