import { useState } from 'react';
import { projectAPI } from './ProjectAPI';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Project } from '../components/Projects';
 
export function useProjects() {
  const [page, setPage] = useState(0);
 
  const queryInfo = useQuery({
    queryKey: ['projects', page],
    queryFn: () => projectAPI.get(),
    placeholderData: [],
  });
 
  return { ...queryInfo, page, setPage };
}
 
export function useSaveProject() {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: (project: Project) => projectAPI.update(project.id, project),
    onSuccess: () => {
      // Correct usage: max 2 arguments
      queryClient.invalidateQueries({queryKey: ['projects']});
    },
  });
}
 
export function useDeleteProject() {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: (id: string) => projectAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['projects']});
    },
  });
}