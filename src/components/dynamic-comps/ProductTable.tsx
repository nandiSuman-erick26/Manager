"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Package, Layers, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import { useDeleteProductMutation } from "@/hooks/reactQuary/useProductMutation";

const ProductTable = ({
  products,
  isLoading,
}: {
  products: any[];
  isLoading: boolean;
}) => {
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const { mutate: deleteProduct } = useDeleteProductMutation();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
        <p className="text-zinc-500 font-medium tracking-tight">
          Syncing inventory...
        </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem]">
        <div className="bg-zinc-100 dark:bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package size={32} className="text-zinc-400" />
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
          No products found
        </h3>
        <p className="text-zinc-500 max-w-xs mx-auto text-sm mt-1">
          Your inventory is currently empty. Start by adding your first product.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-sm">
      {/* Edit Dialog */}
      <Dialog
        open={!!editingProduct}
        onOpenChange={() => setEditingProduct(null)}
      >
        <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-md">
          <DialogTitle className="sr-only">Edit Product</DialogTitle>
          <DialogDescription className="sr-only">
            Update product inventory
          </DialogDescription>
          {editingProduct && (
            <ProductForm
              product={editingProduct}
              onClose={() => setEditingProduct(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader className="bg-zinc-50 dark:bg-zinc-800/50">
          <TableRow className="border-zinc-200 dark:border-zinc-800">
            <TableHead className="font-bold text-zinc-900 dark:text-white py-5 pl-8">
              Product
            </TableHead>
            <TableHead className="font-bold text-zinc-900 dark:text-white">
              Category
            </TableHead>
            <TableHead className="font-bold text-zinc-900 dark:text-white text-right px-6">
              Price
            </TableHead>
            <TableHead className="font-bold text-zinc-900 dark:text-white text-center">
              Stock
            </TableHead>
            <TableHead className="font-bold text-zinc-900 dark:text-white text-right pr-8">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              className="border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors"
            >
              <TableCell className="py-6 pl-8">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                    <Package size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-900 dark:text-white">
                      {product.name}
                    </span>
                    <span className="text-xs text-zinc-500 line-clamp-1 max-w-[200px]">
                      {product.description || "No description provided."}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-brand" />
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 capitalize">
                    {product.category}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right px-6">
                <span className="font-black text-zinc-900 dark:text-white leading-none">
                  ₹{Number(product.price).toLocaleString()}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <div
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${product.stock < 10 ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400" : "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"}`}
                >
                  {product.stock} units
                </div>
              </TableCell>
              <TableCell className="text-right pr-8">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl text-zinc-400 hover:text-brand hover:bg-brand/10 transition-all"
                    onClick={() => setEditingProduct(product)}
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                    onClick={() => {
                      if (confirm("Are you sure?")) deleteProduct(product.id);
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
