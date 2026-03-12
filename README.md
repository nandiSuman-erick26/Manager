# 🚀 Premium Task & Inventory Manager

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

A state-of-the-art Task and Inventory Management system built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. This application features a premium dark/light mode interface, robust data validation, and seamless cloud integration.

---

## ✨ Key Features

- **💎 Premium Dashboard**: High-fidelity overview of tasks and inventory with real-time statistics and low-stock alerts.
- **📦 Inventory Management**: Full CRUD operations for products with dynamic filtering, sorting, and pagination.
- **✅ Task Tracking**: Efficient task management with completion status tracking.
- **📄 Data Export**: One-click CSV export for inventory data.
- **🔐 Secure Auth**: Built-in authentication powered by **Supabase SSR**.
- **🔍 Advanced Search**: Instant filtering and global search capabilities.
- **⚡ Performance First**: Optimistic updates and server-side logic using **TanStack Query**.
- **🛠 Modern Forms**: Type-safe forms with **React Hook Form** and **Zod** validation.

---

## 🛠 Tech Stack

| Category             | Technologies                                               |
| -------------------- | ---------------------------------------------------------- |
| **Framework**        | Next.js 16 (App Router), React 19                          |
| **Styling**          | Tailwind CSS 4, Shadcn UI, Lucide React, Hugeicons         |
| **State Management** | Zustand, TanStack React Query (v5)                         |
| **Backend/Auth**     | Supabase (PostgreSQL), Supabase SSR                        |
| **Forms**            | React Hook Form, Zod Validators                            |
| **Utilities**        | Axios, Date-fns, Sonner (Toasts), Class-variance-authority |

---

## 📂 Project Structure

```text
task-manager/
├── public/                # Static assets
│   ├── next.svg
│   └── vercel.svg
├── src/
│   ├── app/               # App Router Pages
│   │   ├── dashboard/     # /dashboard route
│   │   │   ├── list/      # /dashboard/list
│   │   │   │   └── page.tsx
│   │   │   ├── products/  # /dashboard/products
│   │   │   │   └── page.tsx
│   │   │   ├── settings/  # /dashboard/settings
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx # Dashboard sidebar/nav
│   │   │   └── page.tsx   # Dashboard Home
│   │   ├── layout.tsx     # Root Layout
│   │   ├── page.tsx       # Landing Page
│   │   └── globals.css    # Tailwind CSS Variables
│   ├── components/        # Smart Components
│   │   ├── dynamic-comps/ # Business Logic UI
│   │   │   ├── ProductTable.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   └── TaskList.tsx
│   │   ├── layouts/       # Structural Parts
│   │   │   ├── Sidebar.tsx
│   │   │   └── Navbar.tsx
│   │   ├── providers/     # Wrapper Providers
│   │   │   ├── QueryProvider.tsx
│   │   │   └── ThemeProvider.tsx
│   │   └── ui/            # Atomic Radix/Shadcn Components
│   │       ├── button.tsx
│   │       ├── table.tsx
│   │       └── ... (15+ items)
│   ├── hooks/             # Custom Logic
│   │   └── reactQuary/    # Data Fetching Hooks
│   │       ├── useProductQuery.ts
│   │       └── useTaskQuery.ts
│   ├── lib/               # Shared Utilities
│   │   ├── export-utils.ts# CSV Generator
│   │   ├── supabase.ts    # Client Setup
│   │   └── utils.ts       # Tailwind Merger
│   └── services/          # External Integrations
│       ├── api/           # Fetching Methods
│       └── validators/    # Zod Schemas
│           ├── product.validation.ts
│           └── task.validation.ts
├── components.json        # Shadcn Config
├── next.config.ts         # NextJS Config
├── package.json           # Scripts & Deps
└── tsconfig.json          # TS Config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm/yarn/pnpm**
- **Supabase Account**: For database and authentication

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   Create a `.env.local` file in the root directory and add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🎨 Design Philosophy

This project prioritizes a **Premium User Experience** by using:

- **Glassmorphism**: Subtle backgrounds and borders for a modern feel.
- **Dynamic Feedback**: Real-time validation and loading states with customized spinners.
- **Accessibility**: Semantic HTML and Radix UI primitives for full keyboard support.
- **Micro-animations**: Smooth transitions using Tailwind's latest animation utilities.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Developed by <u>Suman Nandi</u> for WebSkitters Academy
</p>
