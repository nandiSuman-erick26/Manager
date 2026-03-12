"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ProductSchema,
  ProductFormType,
} from "@/services/validators/product.validation";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "@/hooks/reactQuary/useProductMutation";

interface ProductFormProps {
  product?: any;
  onClose?: () => void;
}

const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const isEditMode = !!product;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product?.name || "",
      category: product?.category || "",
      price: product?.price ? Number(product.price) : 0,
      stock: product?.stock ? Number(product.stock) : 0,
      description: product?.description || "",
    },
  });

  const { mutate: addProduct, isPending: isAdding } = useAddProductMutation();
  const { mutate: editProduct, isPending: isEditing } =
    useUpdateProductMutation();

  const onSubmit = (data: ProductFormType) => {
    if (isEditMode) {
      editProduct(
        { id: product.id, product: data },
        { onSuccess: () => onClose?.() },
      );
    } else {
      addProduct(data, { onSuccess: () => onClose?.() });
    }
  };

  return (
    <Card className="w-full max-w-md p-5 sm:p-8 space-y-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-[2rem]">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="text-sm text-zinc-500">
          {isEditMode
            ? "Update your product details"
            : "Enter product information below"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Name
          </Label>
          <Input
            {...register("name")}
            placeholder="iPhone 15 Pro..."
            className="rounded-xl h-11"
          />
          {errors.name && (
            <p className="text-red-500 text-[10px] font-bold">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Category
          </Label>
          <select
            {...register("category")}
            className="w-full h-11 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:ring-2 focus:ring-brand outline-none"
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Health">Health</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-[10px] font-bold">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Price ($)
            </Label>
            <Input
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className="rounded-xl h-11"
            />
            {errors.price && (
              <p className="text-red-500 text-[10px] font-bold">
                {errors.price.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Stock (Units)
            </Label>
            <Input
              type="number"
              {...register("stock", { valueAsNumber: true })}
              className="rounded-xl h-11"
            />
            {errors.stock && (
              <p className="text-red-500 text-[10px] font-bold">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Description
          </Label>
          <Textarea
            {...register("description")}
            placeholder="Brief details about the product..."
            className="rounded-xl resize-none h-24"
          />
        </div>

        <Button
          type="submit"
          disabled={isAdding || isEditing}
          className="w-full h-12 bg-brand text-white font-bold rounded-xl shadow-lg shadow-brand/20 active:scale-[0.98] transition-all"
        >
          {isAdding || isEditing
            ? "Saving..."
            : isEditMode
              ? "Update Product"
              : "Create Product"}
        </Button>
      </form>
    </Card>
  );
};

export default ProductForm;
