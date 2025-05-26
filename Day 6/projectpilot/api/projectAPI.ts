
import axios from 'axios';
 
export const projectAPI = {
  create: (project: any) => axios.post('http://localhost:4000/projects', project),
  list: () => axios.get('http://localhost:4000/projects'),
};