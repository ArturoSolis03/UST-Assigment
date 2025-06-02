
import axios from 'axios';
import type { Project } from '../components/Projects';
 
const API_URL = 'http://localhost:3000/projects';

const projectAPI = {

  find: async (id: string, config = {}): Promise<Project> => {
  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data; 
},

  get: async (): Promise<Project[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getAll: async (page = 1, limit = 10): Promise<Project[]> => {
  const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
  return response.data;
},

  getById: async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
 
  create: async (projectData: any, config = {}) => {
    const response = await axios.post(API_URL, projectData, config);
    return response.data;
  },
 
  update: async (id: string, updatedData: any, config = {}) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData, config);
    return response.data;
  },
 
  delete: async (id: string | undefined, config = {}) => {
    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data;
  }
};

export {projectAPI}
 