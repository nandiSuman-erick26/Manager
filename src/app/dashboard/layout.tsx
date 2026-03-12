import Sidebar from "@/components/layouts/Sidebar";
import Topbar from "@/components/layouts/Topbar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-hidden transition-colors">
      <Sidebar />

      <main className="flex flex-col flex-1 min-w-0 h-full">
        <Topbar />
        <div className="flex-1 p-8 overflow-y-auto ">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
