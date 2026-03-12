import {
  addProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
} from "@/services/api/productServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add product.");
    },
  });
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update product.");
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete product.");
    },
  });
};

export const useBulkDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Selected products deleted!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Bulk delete failed.");
    },
  });
};
