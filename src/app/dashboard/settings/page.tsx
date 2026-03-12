"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useColor } from "@/components/providers/color-provider";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor, Check } from "lucide-react";

const colors = [
  { name: "amber", hex: "#d97706" },
  { name: "blue", hex: "#2563eb" },
  { name: "green", hex: "#16a34a" },
  { name: "purple", hex: "#9333ea" },
  { name: "rose", hex: "#e11d48" },
  { name: "zinc", hex: "#52525b" },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { color, setColor } = useColor();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="px-1 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
          Settings
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1">
          Manage your application appearance and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Appearance Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-800 dark:text-white">
            <Sun className="h-5 w-5 text-brand" />
            Appearance
          </h2>
          <Card className="p-6 space-y-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Theme Mode
              </Label>
              <div className="flex gap-2 p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme("light")}
                  className={`flex-1 gap-2 rounded-xl transition-all text-xs sm:text-sm h-9 sm:h-10 ${theme === "light" ? "bg-white dark:bg-zinc-700 shadow-md text-zinc-900 dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600" : "text-zinc-500 hover:text-zinc-700"}`}
                >
                  <Sun className="h-4 w-4" />
                  Light
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className={`flex-1 gap-2 rounded-xl transition-all text-xs sm:text-sm h-9 sm:h-10 ${theme === "dark" ? "bg-white dark:bg-zinc-700 shadow-md text-zinc-900 dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600" : "text-zinc-500 hover:text-zinc-700"}`}
                >
                  <Moon className="h-4 w-4" />
                  Dark
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme("system")}
                  className={`flex-1 gap-2 rounded-xl transition-all text-xs sm:text-sm h-9 sm:h-10 ${theme === "system" ? "bg-white dark:bg-zinc-700 shadow-md text-zinc-900 dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600" : "text-zinc-500 hover:text-zinc-700"}`}
                >
                  <Monitor className="h-4 w-4" />
                  System
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Accent Color
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name as any)}
                    style={{ backgroundColor: c.hex }}
                    className={`h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${color === c.name ? "ring-4 ring-brand/30 scale-105" : "hover:scale-105 opacity-80 hover:opacity-100"}`}
                  >
                    {color === c.name && (
                      <Check className="h-6 w-6 text-white" />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Choose a color to customize your dashboard's look.
              </p>
            </div>
          </Card>
        </section>

        {/* Info Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-800 dark:text-white">
            <CheckCircle2Icon className="h-5 w-5 text-brand" />
            Quick Overview
          </h2>
          <Card className="p-6 space-y-4 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-4 p-4 bg-brand-light dark:bg-brand/10 border border-brand/20 rounded-2xl">
              <div className="h-12 w-12 rounded-xl bg-brand flex items-center justify-center text-white shadow-lg transition-colors">
                <CheckCircle2Icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white">
                  Active Theme
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 capitalize">
                  {color} & {theme}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Storage Used
                </span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  12%
                </span>
              </div>
              <div className="h-2.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand transition-all duration-500"
                  style={{ width: "12%" }}
                />
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

function CheckCircle2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
