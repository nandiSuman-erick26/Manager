"use client";
import { Button } from "@/components/ui/button";
import { MoveRight, CheckSquare, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 font-sans overflow-hidden">
      {/* Ambient background blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-amber-400/20 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-violet-400/20 dark:bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main card */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl mx-auto space-y-8">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border border-amber-200 dark:border-amber-500/30">
          ✦ All-in-one Workspace
        </span>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-5xl sm:text-6xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
            Task &amp; Inventory
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-400">
              Manager
            </span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg leading-relaxed max-w-sm mx-auto">
            Manage your tasks and inventory from one beautiful, fast dashboard.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
            <CheckSquare size={15} className="text-amber-500" />
            Task Tracking
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
            <Package size={15} className="text-violet-500" />
            Inventory Control
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-row gap-4 items-center">
          <Button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-2.5 h-auto text-sm font-semibold cursor-pointer bg-amber-500 hover:bg-amber-600 text-white border-0 rounded-full shadow-md shadow-amber-200 dark:shadow-amber-900/30 transition-all"
          >
            Get Started <MoveRight size={16} />
          </Button>
          <Link
            href="/dashboard"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 hover:underline underline-offset-4 transition-colors"
          >
            Go to Dashboard{" "}
          </Link>
        </div>
      </div>

      {/* Footer note */}
      <div className="absolute bottom-6 flex flex-col items-center gap-1">
        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          Built with Next.js &amp; Supabase
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          Developed by{" "}
          <span className="font-semibold text-amber-500">Suman Nandi</span>
        </p>
      </div>
    </div>
  );
}
