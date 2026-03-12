import { supabaseClient } from "@/lib/supabase-client";

export const fetchProducts = async () => {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const addProduct = async (product: any) => {
  const { error } = await supabaseClient.from("products").insert({
    name: product.name,
    category: product.category,
    price: product.price,
    stock: product.stock,
    description: product.description,
  });

  if (error) throw error;
};

export const updateProduct = async ({
  id,
  product,
}: {
  id: string | number;
  product: any;
}) => {
  const { error } = await supabaseClient
    .from("products")
    .update({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description,
    })
    .eq("id", id);

  if (error) throw error;
};

export const deleteProduct = async (id: string | number) => {
  const { error } = await supabaseClient.from("products").delete().eq("id", id);
  if (error) throw error;
};

export const bulkDeleteProducts = async (ids: (string | number)[]) => {
  const { error } = await supabaseClient
    .from("products")
    .delete()
    .in("id", ids);
  if (error) throw error;
};
