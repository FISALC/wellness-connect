import { api } from "@/lib/api";
import type { CreateProductDto, ApiResult, ProductCreateDto } from "../types/product";

const BASE = "/api/v1";

// Public
export async function getProducts() {
  const res = await api.get<ProductCreateDto[]>(`${BASE}/public/wellness/products`);
  return res.data;
}

export async function getProduct(id: string) {
  const res = await api.get<ProductCreateDto>(`${BASE}/public/wellness/products/${id}`);
  return { success: true, data: res.data } as ApiResult<ProductCreateDto>;
}

// Admin
export async function createProduct(dto: CreateProductDto) {
  const res = await api.post<{ id: string }>(`${BASE}/admin/wellness/products`, dto);
  return { success: true, data: res.data } as ApiResult<{ id: string }>;
}

export async function updateProduct(id: string, dto: CreateProductDto) {
  await api.put(`${BASE}/admin/wellness/products/${id}`, dto);
  return { success: true } as ApiResult;
}

export async function deleteProduct(id: string) {
  await api.delete(`${BASE}/admin/wellness/products/${id}`);
  return { success: true } as ApiResult;
}
