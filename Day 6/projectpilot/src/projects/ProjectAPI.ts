
import axios from 'axios';
import type { Project } from '../components/Projects';
 
const API_URL = 'http://localhost:3000/projects';

const projectAPI = {

  find: async (id: string): Promise<Project> => {
  const response = await axios.get(`${API_URL}/${id}`);
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
 
  create: async (projectData: any) => {
    const response = await axios.post(API_URL, projectData);
    return response.data;
  },
 
  update: async (id: string, updatedData: any) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  },
 
  delete: async (id: string | undefined) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};

export {projectAPI}
 