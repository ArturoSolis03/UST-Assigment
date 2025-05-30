

 
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
  let queryInfo = useQuery({
    queryKey: ['projects', page],
    queryFn: () => projectAPI.get(page + 1),
    placeholderData: (previousData) => previousData ?? [],
  });
  console.log(queryInfo);
  return { ...queryInfo, page, setPage };
}
 export function useSaveProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: Project) => projectAPI.put(project),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}