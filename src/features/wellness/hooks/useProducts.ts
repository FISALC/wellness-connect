import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../admin/api/products.api";
import type { ProductCreateDto } from "../admin/types/product";

/** ---------------- UI type used by ProductsPage ---------------- */
export type Product = {
  id: string;
  name: string;
  category: number;       // enum number
  isNew: boolean;
  imageUrl?: string;
  createdAt?: string;     // ISO string
  price?: number;
  rating?: number;
  discountPct?: number;
  tags?: string[];
  description?: string;
};

/** --------------- Mapper: DTO -> UI ------------------------- */
function mapProduct(dto: ProductCreateDto): Product {
  return {
    id: (dto as any).id || "0", // ID might come from backend response wrapper
    name: dto.name,
    category: Number(dto.category),
    isNew: Boolean(dto.isNew),
    imageUrl: dto.imageUrl || undefined,
    createdAt: (dto as any).createdAt || undefined,
    price: dto.price,
    rating: dto.rating,
    discountPct: dto.discountPct,
    tags: dto.tag ? [dto.tag] : [],
    description: dto.description,
  };
}

/** --------------- Hook ----------------------------------------- */
export function useProducts() {
  const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState<Error | null>(null);
  const [version, setVersion] = useState(0); // for manual refetch

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    getProducts()
      .then((list) => {
        if (mounted) setData(list.map(mapProduct));
      })
      .catch((err) => {
        if (mounted) setError(err as Error);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [version]);

  const refetch = () => setVersion((v) => v + 1);

  const count = useMemo(() => data?.length ?? 0, [data]);

  return {
    data: data ?? [],
    count,
    isLoading,
    isError: Boolean(isError),
    error: isError,
    refetch,
  };
}
