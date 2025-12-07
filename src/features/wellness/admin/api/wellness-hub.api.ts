import { api } from "@/lib/api";
import { Article, CreateArticleDto } from "../types/wellness-hub";

const BASE = "/api/v1";

export async function getArticles(): Promise<Article[]> {
    const res = await api.get<Article[]>(`${BASE}/public/wellness-hub/articles`);
    return res.data;
}

export async function createArticle(dto: CreateArticleDto): Promise<Article> {
    const res = await api.post<Article>(`${BASE}/admin/wellness-hub/articles`, dto);
    return res.data;
}

export async function updateArticle(id: string, dto: Partial<CreateArticleDto>): Promise<void> {
    await api.put(`${BASE}/admin/wellness-hub/articles/${id}`, dto);
}

export async function deleteArticle(id: string): Promise<void> {
    await api.delete(`${BASE}/admin/wellness-hub/articles/${id}`);
}
