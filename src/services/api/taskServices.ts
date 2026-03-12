import { supabaseClient } from "@/lib/supabase-client";

export const fetchTasks = async () => {
  const { data: tasks, error } = await supabaseClient.from("tasks").select("*");
  if (error) throw error;
  return tasks;
};

export const addTask = async (task: any) => {
  const { error } = await supabaseClient.from("tasks").insert({
    name: task?.name,
    description: task?.description,
    isCompleted: false,
    isImportant: task?.isImportant || false,
    date: task?.date ? task.date.toISOString() : null,
    start: task?.startTime,
    end: task?.endTime,
  });
  if (error) throw error;
};

export const updateTask = async ({
  id,
  task,
}: {
  id: string | number;
  task: any;
}) => {
  const { error } = await supabaseClient
    .from("tasks")
    .update({
      name: task?.name,
      description: task?.description,
      isImportant: task?.isImportant,
      date: task?.date ? new Date(task.date).toISOString() : null,
      start: task?.startTime,
      end: task?.endTime,
    })
    .eq("id", id);
  if (error) throw error;
};

export const deleteTask = async (id: string | number) => {
  const { error } = await supabaseClient.from("tasks").delete().eq("id", id);
  if (error) throw error;
};

export const deleteTasks = async (ids: (string | number)[]) => {
  const { error } = await supabaseClient.from("tasks").delete().in("id", ids);
  if (error) throw error;
};

export const updateTaskStatus = async ({
  id,
  isCompleted,
}: {
  id: string | number;
  isCompleted: boolean;
}) => {
  const { error } = await supabaseClient
    .from("tasks")
    .update({ isCompleted })
    .eq("id", id);
  if (error) throw error;
};

export const updateTasksStatus = async ({
  ids,
  isCompleted,
}: {
  ids: (string | number)[];
  isCompleted: boolean;
}) => {
  const { error } = await supabaseClient
    .from("tasks")
    .update({ isCompleted })
    .in("id", ids);
  if (error) throw error;
};
