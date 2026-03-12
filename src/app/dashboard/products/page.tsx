"use client";

import React, { useState } from "react";
import { useProductQuery } from "@/hooks/reactQuary/useProductQuery";
import ProductTable from "@/components/dynamic-comps/ProductTable";
import ProductForm from "@/components/dynamic-comps/ProductForm";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  ShoppingBag,
  Search,
  Filter,
  Download,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { exportToCSV } from "@/lib/export-utils";
import { useTaskStore } from "@/hooks/useTaskStore";

export default function ProductsPage() {
  const { data: products, isLoading } = useProductQuery();
  const [isOpen, setIsOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useTaskStore();

  // States for Filtering and Sorting
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredAndSortedProducts = React.useMemo(() => {
    if (!products) return [];

    // 1. Filter
    let result = (products as any[]).filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    // 2. Sort
    result.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      // Handle numeric sorting for price and stock
      if (sortBy === "price" || sortBy === "stock") {
        valA = Number(valA);
        valB = Number(valB);
      } else {
        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();
      }

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [products, searchQuery, categoryFilter, sortBy, sortDirection]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Reset to page 1 on search/filter change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, sortBy]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 sm:p-8 bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm gap-4 sm:gap-6 transition-all duration-500">
        <div className="flex items-center gap-4">
          <div className="bg-brand text-white p-3 sm:p-4 rounded-2xl sm:rounded-[1.5rem] shadow-lg shadow-brand/30">
            <ShoppingBag size={24} className="sm:hidden" />
            <ShoppingBag size={32} className="hidden sm:block" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              Products
            </h1>
            <p className="text-zinc-500 font-medium text-xs sm:text-sm">
              Manage your inventory and stock levels.
            </p>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 bg-brand text-white font-black rounded-2xl shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-3 cursor-pointer">
              Add Product
              <PlusCircle size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-md">
            <DialogTitle className="sr-only">Add New Product</DialogTitle>
            <DialogDescription className="sr-only">
              Create a new product entry
            </DialogDescription>
            <ProductForm onClose={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-3">
        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            size={18}
          />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 sm:h-14 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm focus:ring-brand focus:border-brand"
          />
        </div>

        {/* Selects + Export */}
        <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-12 sm:h-14 sm:flex-1 px-3 sm:px-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-400 outline-none focus:border-brand transition-all cursor-pointer appearance-none text-center"
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Health">Health</option>
          </select>

          <select
            value={`${sortBy}-${sortDirection}`}
            onChange={(e) => {
              const [field, dir] = e.target.value.split("-");
              setSortBy(field);
              setSortDirection(dir);
            }}
            className="h-12 sm:h-14 sm:flex-1 px-3 sm:px-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-400 outline-none focus:border-brand transition-all cursor-pointer appearance-none text-center"
          >
            <option value="name-asc">A → Z</option>
            <option value="name-desc">Z → A</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="stock-asc">Stock ↑</option>
            <option value="stock-desc">Stock ↓</option>
          </select>

          <Button
            onClick={() =>
              exportToCSV(filteredAndSortedProducts, "product_inventory")
            }
            className="col-span-2 sm:col-span-1 h-12 sm:h-14 sm:px-8 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold gap-3 hover:opacity-90 transition-all cursor-pointer"
          >
            <Download size={18} />
            Export
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <ProductTable products={paginatedProducts} isLoading={isLoading} />

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl sm:rounded-[2rem] shadow-sm">
          <p className="text-zinc-500 text-xs sm:text-sm font-medium">
            <span className="text-zinc-900 dark:text-white font-bold">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>
            {" – "}
            <span className="text-zinc-900 dark:text-white font-bold">
              {Math.min(
                currentPage * itemsPerPage,
                filteredAndSortedProducts.length,
              )}
            </span>
            {" of "}
            <span className="text-zinc-900 dark:text-white font-bold">
              {filteredAndSortedProducts.length}
            </span>
            {" products"}
          </p>
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="h-9 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm border-zinc-200 dark:border-zinc-800 disabled:opacity-50 transition-all cursor-pointer"
            >
              Prev
            </Button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-xl text-xs sm:text-sm font-black transition-all ${
                    currentPage === i + 1
                      ? "bg-brand text-white shadow-lg shadow-brand/20"
                      : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="h-9 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm border-zinc-200 dark:border-zinc-800 disabled:opacity-50 transition-all cursor-pointer"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
