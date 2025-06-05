
import axios from 'axios';
 
const instance = axios.create({
  baseURL: 'http://localhost:3000', 
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }else{
    console.warn('Token not exists');
  }
  return config;
});

instance.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
 
    if (status === 401 || status === 403) {
      console.warn('Token expired or unauthorized. Logging out...');
 
      
      localStorage.removeItem('accessToken');
 
      
      window.location.href = '/';
 
      
    }
 
    return Promise.reject(error);
  }
);
 
export default instance;