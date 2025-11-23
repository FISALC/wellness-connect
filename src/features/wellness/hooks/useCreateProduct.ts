import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../admin/api/products.api";
import type { ProductCreateDto } from "../admin/types/product";

export function useCreateProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (dto: ProductCreateDto) => createProduct(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wellness", "products"] });
    },
  });
}
