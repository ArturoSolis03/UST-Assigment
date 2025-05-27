
import axios from 'axios';
 
const API_URL = 'http://localhost:4000/projects';

export const projectAPI = {
  create: async (project: any) => {
    const response = await axios.post(API_URL, project);
    return response.data;
  },
};
