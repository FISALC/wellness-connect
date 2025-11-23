import { useEffect, useMemo, useState } from "react";

/** ---------------- UI type used by ProductsPage ---------------- */
export type Product = {
  id: string;
  name: string;
  category: number;       // enum number from API
  isNew: boolean;
  imageUrl?: string;
  createdAt?: string;     // ISO string (optional)
};

/** ---------------- Server DTO shape (adjust if yours differs) --- */
type ProductDto = {
  id: string;
  name: string;
  category: number;       // API enum (0..n)
  description?: string;
  imageUrl?: string;
  isNew?: boolean;
  createdAt?: string;     // e.g., "2025-11-12T09:10:11Z"
};

/** --------------- Config --------------------------------------- */
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ""; // e.g., http://localhost:5099
// 🔧 If your list endpoint differs, change ONLY this path:
const LIST_ENDPOINT = "/api/v1/public/wellness/products"; // GET should return ProductDto[]

/** --------------- Small fetcher -------------------------------- */
async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem("access_token"); // if you use JWT; remove if not
  const res = await fetch(url, {
    // credentials: "include", // keep if you use cookies; remove otherwise
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  const ct = res.headers.get("content-type") ?? "";
  return ct.includes("application/json")
    ? ((await res.json()) as T)
    : (undefined as T);
}

/** --------------- Mapper: Server -> UI ------------------------- */
function mapProduct(dto: ProductDto): Product {
  return {
    id: dto.id,
    name: dto.name,
    category: Number(dto.category),            // ensure number
    isNew: Boolean(dto.isNew),
    imageUrl: dto.imageUrl || undefined,
    createdAt: dto.createdAt || undefined,
  };
}

/** --------------- Hook ----------------------------------------- */
export function useProducts() {
  const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState<Error | null>(null);
  const [version, setVersion] = useState(0); // for manual refetch

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    fetchJson<ProductDto[]>(`${API_BASE}${LIST_ENDPOINT}`, {
      method: "GET",
      signal: ac.signal,
    })
      .then((list) => setData((list ?? []).map(mapProduct)))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err as Error);
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]); // re-run when refetch() bumps version

  const refetch = () => setVersion((v) => v + 1);

  // handy derived values if you need them
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
