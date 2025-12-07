import { api } from "@/lib/api";
import { Category, CreateCategoryDto } from "../types/categories";

const BASE = "/api/v1";

export async function getCategories(): Promise<Category[]> {
    const res = await api.get<Category[]>(`${BASE}/public/wellness/categories`);
    return res.data;
}

export async function createCategory(dto: CreateCategoryDto): Promise<Category> {
    const res = await api.post<Category>(`${BASE}/admin/wellness/categories`, dto);
    return res.data;
}

export async function deleteCategory(id: string): Promise<void> {
    await api.delete(`${BASE}/admin/wellness/categories/${id}`);
}
