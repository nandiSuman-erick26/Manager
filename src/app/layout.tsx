import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/hooks/providers/QueryProvider";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manager - Task & Inventory",
  description:
    "A premium Task & Inventory Management app. Track your tasks, manage your product inventory, monitor stock levels, and export data — all in one sleek dashboard.",
  keywords: [
    "task manager",
    "inventory manager",
    "product management",
    "next.js app",
    "react dashboard",
  ],
  authors: [{ name: "Suman Nandi" }],
  openGraph: {
    title: "Manager — Task & Inventory",
    description:
      "Track tasks, manage inventory, and monitor stock levels. Built with Next.js 16, React 19, Supabase, and TailwindCSS.",
    url: "https://task-manager-phi-wheat.vercel.app",
    siteName: "Task & Inventory Manager",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Task & Inventory Manager — Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manager — Task & Inventory",
    description:
      "Track tasks, manage inventory, and monitor stock levels in one premium dashboard.",
    images: ["/og-image.png"],
  },
};

import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ColorProvider } from "@/components/providers/color-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", figtree.variable)}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <ColorProvider>
            <ReactQueryProvider>
              {children}
              <Toaster richColors position="top-right" />
            </ReactQueryProvider>
          </ColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
