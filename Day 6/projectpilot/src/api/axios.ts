import axios from 'axios';
 
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, 
});
 

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
 

let isRefreshing = false;
let failedQueue: any[] = [];
 
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};
 

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
 
    
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
 
      if (isRefreshing) {
        
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(instance(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }
 
      isRefreshing = true;
 
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const userId = localStorage.getItem('userId');
 
        const res = await axios.post('http://localhost:3000/auth/refresh', {
          userId,
          refreshToken,
        });
 
        const { accessToken, refreshToken: newRefreshToken } = res.data;
 
        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
 
        processQueue(null, accessToken);
 
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        window.location.href = '/';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
 
    return Promise.reject(error);
  }
);
 
export default instance;