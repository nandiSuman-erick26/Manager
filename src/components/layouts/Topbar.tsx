"use client";
import React from "react";
import { Button } from "../ui/button";
import { Bell, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

interface TopbarProps {
  onMenuToggle: () => void;
}

const Topbar = ({ onMenuToggle }: TopbarProps) => {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/dashboard/list") return "TASK MANAGER";
    if (pathname === "/dashboard/products") return "PRODUCT MANAGER";
    if (pathname === "/dashboard/settings") return "SETTINGS";
    return "DASHBOARD";
  };

  return (
    <div className="flex justify-between items-center p-2 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="flex items-center gap-1">
        {/* Hamburger — mobile only */}
        <Button
          className="md:hidden rounded-full h-8 w-8 px-2 py-2 bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          onClick={onMenuToggle}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <h1 className="font-black text-xs tracking-[0.2em] uppercase px-2 md:px-4 text-brand">
          {getTitle()}
        </h1>
      </div>

      <div className="flex gap-2 items-center">
        <Button className="rounded-full h-8 w-8 px-2 py-2 bg-transparent relative text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
          <Bell className="h-4 w-4" />
          <span className="w-2 h-2 bg-red-600 absolute rounded-full top-1 right-1"></span>
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
