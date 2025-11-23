import { post } from "./client";
import type { CreateProductDto, ApiResult } from "../types/product";

export async function createProduct(dto: CreateProductDto) {
  // Your Swagger shows: /api/v1/admin/wellness/CreateProducts
  return post<CreateProductDto, ApiResult<{ id: string }>>(
    "/api/v1/admin/wellness/CreateProducts",
    dto
  );
}
