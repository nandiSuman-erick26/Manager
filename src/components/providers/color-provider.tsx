"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ColorTheme = "amber" | "blue" | "green" | "purple" | "rose" | "zinc";

interface ColorContextType {
  color: ColorTheme;
  setColor: (color: ColorTheme) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [color, setColor] = useState<ColorTheme>("amber");

  useEffect(() => {
    const savedColor = localStorage.getItem("task-manager-color") as ColorTheme;
    if (savedColor) {
      setColor(savedColor);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("task-manager-color", color);

    // Define color mappings (Tailwind colors in HEX or HSL)
    const colorMap: Record<ColorTheme, string> = {
      amber: "#d97706",
      blue: "#2563eb",
      green: "#16a34a",
      purple: "#9333ea",
      rose: "#e11d48",
      zinc: "#52525b",
    };

    const lightColorMap: Record<ColorTheme, string> = {
      amber: "#fffbeb",
      blue: "#eff6ff",
      green: "#f0fdf4",
      purple: "#faf5ff",
      rose: "#fff1f2",
      zinc: "#f8fafc",
    };

    const root = document.documentElement;
    root.style.setProperty("--brand-primary", colorMap[color]);
    root.style.setProperty("--brand-light", lightColorMap[color]);
    root.style.setProperty("--brand-foreground", "#ffffff");
  }, [color]);

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) throw new Error("useColor must be used within a ColorProvider");
  return context;
};
