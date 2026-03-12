"use client";
import React from "react";
import { useTaskQuery } from "@/hooks/reactQuary/useTaskQuery";
import { useProductQuery } from "@/hooks/reactQuary/useProductQuery";
import { Spinner } from "@/components/ui/spinner";
import {
  CheckCircle2,
  ListTodo,
  Clock,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  LayoutDashboard,
} from "lucide-react";

const Dashboard = () => {
  const { data: tasks, isLoading: tasksLoading } = useTaskQuery();
  const { data: products, isLoading: productsLoading } = useProductQuery();

  const taskStats = {
    total: tasks?.length || 0,
    completed: tasks?.filter((t: any) => t.isCompleted).length || 0,
    pending: tasks?.filter((t: any) => !t.isCompleted).length || 0,
  };

  const productStats = {
    total: products?.length || 0,
    totalValue:
      products?.reduce(
        (sum: number, p: any) => sum + Number(p.price) * (p.stock || 0),
        0,
      ) || 0,
    lowStock:
      products?.filter((p: any) => (p.stock || 0) < 10 && (p.stock || 0) > 0)
        .length || 0,
  };

  const isLoading = tasksLoading || productsLoading;

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-10">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <LayoutDashboard size={180} className="text-brand" />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            Welcome back! 👋
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-3 text-lg font-medium max-w-2xl leading-relaxed">
            You're managing{" "}
            <span className="text-brand font-bold">
              {taskStats.pending} tasks
            </span>{" "}
            and
            <span className="text-brand font-bold">
              {" "}
              {productStats.total} products
            </span>{" "}
            today.
            {productStats.lowStock > 0 && (
              <span className="text-red-500 font-bold">
                {" "}
                Heads up: {productStats.lowStock} items are low on stock!
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 pl-2">
          Task Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Tasks */}
          <div className="bg-brand-light dark:bg-brand/10 p-8 rounded-[2rem] border border-brand/20 shadow-sm hover:shadow-md transition-all">
            <div className="bg-brand/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-brand">
              <ListTodo size={24} />
            </div>
            <h3 className="text-zinc-600 dark:text-zinc-400 font-bold mb-1 uppercase tracking-wider text-[10px]">
              Total Tasks
            </h3>
            {tasksLoading ? (
              <Spinner className="mt-2 h-4 w-4" />
            ) : (
              <p className="text-4xl font-black text-zinc-900 dark:text-white">
                {taskStats.total}
              </p>
            )}
          </div>

          {/* Completed */}
          <div className="bg-green-50 dark:bg-green-500/10 p-8 rounded-[2rem] border border-green-200 dark:border-green-500/20 shadow-sm hover:shadow-md transition-all">
            <div className="bg-green-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-green-800 dark:text-green-400 font-bold mb-1 uppercase tracking-wider text-[10px]">
              Completed
            </h3>
            {tasksLoading ? (
              <Spinner className="mt-2 h-4 w-4" />
            ) : (
              <p className="text-4xl font-black text-green-900 dark:text-green-300">
                {taskStats.completed}
              </p>
            )}
          </div>

          {/* Pending */}
          <div className="bg-amber-50 dark:bg-amber-500/10 p-8 rounded-[2rem] border border-amber-200 dark:border-amber-500/20 shadow-sm hover:shadow-md transition-all">
            <div className="bg-amber-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-amber-600 dark:text-amber-400">
              <Clock size={24} />
            </div>
            <h3 className="text-amber-800 dark:text-amber-400 font-bold mb-1 uppercase tracking-wider text-[10px]">
              Pending
            </h3>
            {tasksLoading ? (
              <Spinner className="mt-2 h-4 w-4" />
            ) : (
              <p className="text-4xl font-black text-amber-900 dark:text-amber-300">
                {taskStats.pending}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 pl-2">
          Product Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Products */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
            <div className="bg-zinc-200 dark:bg-zinc-700 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-zinc-600 dark:text-zinc-300">
              <ShoppingBag size={24} />
            </div>
            <h3 className="text-zinc-600 dark:text-zinc-400 font-bold mb-1 uppercase tracking-wider text-[10px]">
              Inventory Items
            </h3>
            {productsLoading ? (
              <Spinner className="mt-2 h-4 w-4" />
            ) : (
              <p className="text-4xl font-black text-zinc-900 dark:text-white">
                {productStats.total}
              </p>
            )}
          </div>

          {/* Total Value */}
          <div className="bg-indigo-50 dark:bg-indigo-500/10 p-8 rounded-[2rem] border border-indigo-200 dark:border-indigo-500/20 shadow-sm hover:shadow-md transition-all">
            <div className="bg-indigo-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
              <DollarSign size={24} />
            </div>
            <h3 className="text-indigo-800 dark:text-indigo-400 font-bold mb-1 uppercase tracking-wider text-[10px]">
              Total Stock Value
            </h3>
            {productsLoading ? (
              <Spinner className="mt-2 h-4 w-4" />
            ) : (
              <p className="text-4xl font-black text-indigo-900 dark:text-indigo-300">
                ₹{productStats.totalValue.toLocaleString()}
              </p>
            )}
          </div>

          {/* Low Stock */}
          <div className="bg-red-50 dark:bg-red-500/10 p-8 rounded-[2rem] border border-red-200 dark:border-red-500/20 shadow-sm hover:shadow-md transition-all">
            <div className="bg-red-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-red-800 dark:text-red-400 font-bold mb-1 uppercase tracking-wider text-[10px]">
              Low Stock Alert
            </h3>
            {productsLoading ? (
              <Spinner className="mt-2 h-4 w-4" />
            ) : (
              <p
                className={`text-4xl font-black ${productStats.lowStock > 0 ? "text-red-600 animate-pulse" : "text-red-900 dark:text-red-300"}`}
              >
                {productStats.lowStock}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
