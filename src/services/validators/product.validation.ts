import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  category: z.string().min(2, "Please select a category"),
  price: z.number().min(0.01, "Price must be at least 0.01"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  description: z.string().optional(),
});

export type ProductFormType = z.infer<typeof ProductSchema>;
