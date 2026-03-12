"use client";
import TaskCard from "@/components/dynamic-comps/TaskCard";
import TaskForm from "@/components/dynamic-comps/TaskForm";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FileText, PlusCircle, Search } from "lucide-react";
import React from "react";
import { useTaskQuery } from "@/hooks/reactQuary/useTaskQuery";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";

import { useTaskStore } from "@/hooks/useTaskStore";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const TaskList = () => {
  const { data: tasks, isLoading, error } = useTaskQuery();
  const { searchQuery, setSearchQuery, statusFilter, setStatusFilter } =
    useTaskStore();

  const filteredTasks = React.useMemo(() => {
    if (!tasks) return [];
    return (tasks as any[]).filter((task) => {
      const matchesSearch = task.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        statusFilter === "all"
          ? true
          : statusFilter === "pending"
            ? !task.isCompleted
            : task.isCompleted;
      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchQuery, statusFilter]);

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-zinc-900 p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors gap-4 sm:gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-brand text-white p-3 sm:p-4 rounded-2xl sm:rounded-[1.5rem] shadow-lg shadow-brand/30">
            <FileText size={24} className="sm:hidden" />
            <FileText size={32} className="hidden sm:block" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              Task List
            </h1>
            <p className="text-zinc-500 font-medium text-xs sm:text-sm">
              Manage and track your primary objectives.
            </p>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 bg-brand text-white font-black rounded-2xl shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-3 cursor-pointer">
              Add Task
              <PlusCircle size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-md">
            <DialogTitle className="sr-only">Add New Task</DialogTitle>
            <DialogDescription className="sr-only">
              Fill out the form below to create a new task.
            </DialogDescription>
            <TaskForm onClose={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            size={18}
          />
          <Input
            placeholder="Search tasks here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 sm:h-14 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm focus:ring-brand focus:border-brand"
          />
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 bg-zinc-100 dark:bg-zinc-800 p-1 sm:p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-x-auto no-scrollbar">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStatusFilter("all")}
            className={`h-9 sm:h-11 px-4 sm:px-6 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              statusFilter === "all"
                ? "bg-brand text-white shadow-md shadow-brand/20"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStatusFilter("pending")}
            className={`h-9 sm:h-11 px-4 sm:px-6 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              statusFilter === "pending"
                ? "bg-brand text-white shadow-md shadow-brand/20"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            Pending
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStatusFilter("completed")}
            className={`h-9 sm:h-11 px-4 sm:px-6 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              statusFilter === "completed"
                ? "bg-brand text-white shadow-md shadow-brand/20"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            Completed
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner className="text-brand h-10 w-10" />
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-200 dark:border-red-800">
          <p className="font-semibold">
            Error loading tasks. Please try again later.
          </p>
        </div>
      ) : (
        <TaskCard tasks={filteredTasks} />
      )}
    </div>
  );
};

export default TaskList;
