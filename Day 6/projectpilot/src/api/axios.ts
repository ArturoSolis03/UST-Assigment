
import axios from 'axios';
 
const instance = axios.create({
  baseURL: 'http://localhost:3000', 
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Token sent', config.headers.Authorization);
  }else{
    console.warn('Token not exists');
  }
  return config;
});
 
export default instance;