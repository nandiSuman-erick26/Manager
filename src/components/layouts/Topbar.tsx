"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";

import { useTaskStore } from "@/hooks/useTaskStore";
import { usePathname } from "next/navigation";

const Topbar = () => {
  const { searchQuery, setSearchQuery } = useTaskStore();
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/dashboard/list") return "TASK MANAGER";
    if (pathname === "/dashboard/products") return "PRODUCT MANAGER";
    if (pathname === "/dashboard/settings") return "SETTINGS";
    return "DASHBOARD";
  };

  return (
    <div className="flex justify-between items-center p-2 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <h1 className="font-black text-xs tracking-[0.2em] uppercase px-4 text-brand">
        {getTitle()}
      </h1>
      <div className="flex gap-2 items-center">
        {/* <Button className="rounded-full h-8 w-8 px-2 py-2 bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
          <MenuSquare className="h-4 w-4" />
        </Button>
        <Button className="rounded-full h-8 w-8 px-2 py-2 bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
          <UserCircle className="h-4 w-4" />
        </Button> */}
        <Button className="rounded-full h-8 w-8 px-2 py-2 bg-transparent relative text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
          <Bell className="h-4 w-4 " />
          <span className="w-2 h-2 bg-red-600 absolute rounded-full top-1 right-1"></span>
        </Button>

        {/* <Button className="bg-brand border-brand text-white hover:opacity-90 cursor-pointer rounded-bl-none h-8 px-3 text-[10px] font-bold shadow-sm">
          <Download className="h-3 w-3 mr-1" />
          Export
        </Button> */}
      </div>
    </div>
  );
};

export default Topbar;
