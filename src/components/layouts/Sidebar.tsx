"use client";
import { cn } from "@/lib/utils";
import {
  Layout,
  LayoutDashboard,
  FileText,
  Settings,
  ShoppingBag,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Task list", href: "/dashboard/list", icon: FileText },
  { name: "Products", href: "/dashboard/products", icon: ShoppingBag },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 dark:bg-black flex flex-col shrink-0 border-r border-white/5 transition-transform duration-300 ease-in-out",
          "md:relative md:translate-x-0 md:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
          <div className="flex flex-row gap-3 items-center">
            <Layout className="h-4 w-4 text-brand" />
            <span className="text-white font-black text-xs tracking-[0.2em] uppercase leading-none">
              Manager
            </span>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="md:hidden text-zinc-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto no-scrollbar">
          {menu.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group",
                  active
                    ? "bg-white/10 text-white"
                    : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    active
                      ? "text-brand"
                      : "text-zinc-600 group-hover:text-zinc-400",
                  )}
                />
                {item.name}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/5 p-2">
          <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest text-center">
            Task-manager &copy; 2026
          </p>
          <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest text-center">
            Developed by <span className="text-red-500">SUMAN NANDI</span>
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
