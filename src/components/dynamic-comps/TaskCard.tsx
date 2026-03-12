import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import {
  Check,
  Trash2,
  Calendar,
  Clock,
  RotateCcw,
  CheckCircle2,
  Edit2,
  Star,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import TaskForm from "./TaskForm";

interface Task {
  id: string | number;
  name: string;
  description: string;
  date?: string;
  start?: string;
  end?: string;
  isCompleted: boolean;
  isImportant: boolean;
}

import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useBulkDeleteMutation,
  useBulkUpdateMutation,
} from "@/hooks/reactQuary/useTaskMutation";

const TaskCard = ({ tasks }: { tasks: Task[] | undefined }) => {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTaskMutation();
  const { mutate: updateTask } = useUpdateTaskMutation();
  const { mutate: bulkDelete, isPending: isBulkDeleting } =
    useBulkDeleteMutation();
  const { mutate: bulkUpdate, isPending: isBulkUpdating } =
    useBulkUpdateMutation();

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
        <div className="flex justify-center mb-4">
          <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-full">
            <Check size={32} className="text-zinc-400" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
          All clear!
        </h3>
        <p className="text-zinc-500 max-w-xs mx-auto text-sm mt-1">
          No tasks found. Add your first task and stay productive!
        </p>
      </div>
    );
  }

  const toggleSelect = (id: string | number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (!tasks) return;
    setSelectedIds(tasks.map((t) => t.id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const handleBulkComplete = () => {
    bulkUpdate(
      { ids: selectedIds, isCompleted: true },
      {
        onSuccess: () => setSelectedIds([]),
      },
    );
  };

  const handleBulkDelete = () => {
    bulkDelete(selectedIds, {
      onSuccess: () => setSelectedIds([]),
    });
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      {/* Edit Dialog */}
      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-md">
          <DialogTitle className="sr-only">Edit Task</DialogTitle>
          <DialogDescription className="sr-only">
            Update the details of your task here.
          </DialogDescription>
          {editingTask && (
            <TaskForm task={editingTask} onClose={() => setEditingTask(null)} />
          )}
        </DialogContent>
      </Dialog>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-50 dark:bg-zinc-900 p-4 sm:p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-colors">
        <h2 className="text-[10px] sm:text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest pl-1 sm:pl-2">
          {selectedIds.length > 0
            ? `${selectedIds.length} Selected`
            : "Your Tasks"}
        </h2>

        {selectedIds.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {selectedIds.length < tasks.length ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSelectAll}
                  className="flex-1 sm:flex-none h-9 text-xs font-bold text-brand hover:bg-brand/10 transition-colors rounded-xl"
                >
                  Select All
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDeselectAll}
                  className="flex-1 sm:flex-none h-9 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-xl"
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1" />
                  De-select
                </Button>
              )}

              <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700 mx-1 hidden sm:block" />

              <Button
                size="sm"
                onClick={handleBulkComplete}
                disabled={isBulkUpdating}
                className="flex-1 sm:flex-none h-9 text-[10px] font-black bg-brand hover:opacity-90 text-white gap-2 shadow-md shadow-brand/20 rounded-xl"
              >
                <CheckCircle2 size={12} />
                <span className="hidden xs:inline">Complete</span>
                <span className="xs:hidden">Done</span>
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={handleBulkDelete}
                disabled={isBulkDeleting}
                className="flex-1 sm:flex-none h-9 text-[10px] font-black gap-2 shadow-md shadow-red-500/10 rounded-xl"
              >
                <Trash2 size={12} />
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {tasks.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-[1.25rem] shadow-sm transition-all gap-4 group ${
              selectedIds.includes(item.id)
                ? "border-brand bg-brand/5 dark:bg-brand/10 ring-1 ring-brand/20"
                : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-brand/40"
            }`}
          >
            <div className="flex items-center gap-4 flex-1">
              <Checkbox
                checked={selectedIds.includes(item.id)}
                onCheckedChange={() => toggleSelect(item.id)}
                className="data-[state=checked]:bg-brand data-[state=checked]:border-brand h-5 w-5 rounded-lg"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className={
                      item.isCompleted
                        ? "line-through text-zinc-400 dark:text-zinc-500 font-bold"
                        : "font-bold text-zinc-900 dark:text-white"
                    }
                  >
                    {item.name}
                  </span>
                  {item.isImportant && (
                    <Star
                      size={14}
                      className="text-amber-500 fill-amber-500 animate-pulse"
                    />
                  )}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 max-w-sm">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 xs:gap-3 text-[9px] xs:text-[10px] font-bold">
              {item.date && (
                <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-1 rounded-lg">
                  <Calendar size={10} />
                  {new Date(item.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              )}
              {(item.start || item.end) && (
                <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-1 rounded-lg">
                  <Clock size={10} />
                  {item.start}{item.end && ` - ${item.end}`}
                </div>
              )}
              <div
                className={`px-2 py-1 rounded-lg border flex items-center gap-1.5 ${
                  item.isCompleted
                    ? "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400"
                    : "bg-brand/5 border-brand/20 text-brand"
                }`}
              >
                <div
                  className={`h-1.5 w-1.5 rounded-full ${
                    item.isCompleted ? "bg-green-500" : "bg-brand"
                  }`}
                />
                <span className="hidden xs:inline">{item.isCompleted ? "Completed" : "Pending"}</span>
                <span className="xs:hidden">{item.isCompleted ? "Done" : "Wait"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setEditingTask(item)}
                className="h-9 w-9 text-zinc-400 hover:text-brand hover:bg-brand/10 transition-all rounded-xl"
              >
                <Edit2 size={16} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  updateTask({ id: item.id, isCompleted: !item.isCompleted })
                }
                className={`h-9 w-9 transition-all rounded-xl ${item.isCompleted ? "bg-green-600 text-white hover:bg-green-700 shadow-md" : "text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10 border border-green-100 dark:border-green-500/20"}`}
              >
                <Check size={18} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                disabled={isDeleting}
                onClick={() => deleteTask(item.id)}
                className="h-9 w-9 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all rounded-xl"
              >
                <Trash2 size={17} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
