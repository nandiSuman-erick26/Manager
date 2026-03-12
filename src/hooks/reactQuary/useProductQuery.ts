import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/api/productServices";

export const useProductQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};
