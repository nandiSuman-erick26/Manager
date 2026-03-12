"use client";

import { create } from "zustand";

type FilterStatus = "all" | "pending" | "completed";

interface TaskStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: FilterStatus;
  setStatusFilter: (filter: FilterStatus) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  statusFilter: "all",
  setStatusFilter: (filter) => set({ statusFilter: filter }),
}));
