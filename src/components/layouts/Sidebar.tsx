"use client";
import { cn } from "@/lib/utils";
import {
  Layout,
  LayoutDashboard,
  ShieldAlert,
  FileText,
  Crosshair,
  TriangleAlert,
  Users,
  MapPin,
  ScrollText,
  Settings,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const menu = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  // { name: "SOS Monitor", href: "/admin/sos", icon: ShieldAlert },
  { name: "Task list", href: "/dashboard/list", icon: FileText },
  { name: "Products", href: "/dashboard/products", icon: ShoppingBag },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];
const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-zinc-950 dark:bg-black flex flex-col shrink-0 border-r border-white/5 transition-colors">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex flex-row gap-3 items-center">
            <span className="text-white font-black text-xs tracking-[0.2em] uppercase leading-none mb-1">
              <Layout className="h-4 w-4 text-brand" />
            </span>
            <span className="text-white font-black text-xs tracking-[0.2em] uppercase leading-none mb-1">
              Manager
            </span>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto no-scrollbar">
        {menu.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
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
     <div className="border-t border-white/5 p-2">
        <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest text-center">
          Task-manager &copy; 2026
        </p>
        <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest text-center">
          Developed by <span className="text-red-500">SUMAN NANDI</span>
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
