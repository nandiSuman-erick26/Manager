import { fetchTasks } from "@/services/api/taskServices"
import { useQuery } from "@tanstack/react-query"

export const useTaskQuery = ()=>{
  return useQuery({
    queryKey:["tasks"],
    queryFn: fetchTasks
  })
}