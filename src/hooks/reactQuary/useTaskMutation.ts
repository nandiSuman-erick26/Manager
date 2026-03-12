import {
  addTask,
  deleteTask,
  updateTaskStatus,
  updateTask,
  deleteTasks,
  updateTasksStatus,
} from "@/services/api/taskServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task added successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add task.");
    },
  });
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete task.");
    },
  });
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update status.");
    },
  });
};

export const useEditTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to edit task.");
    },
  });
};

export const useBulkDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Selected tasks deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete selected tasks.");
    },
  });
};

export const useBulkUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTasksStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Selected tasks updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update selected tasks.");
    },
  });
};
